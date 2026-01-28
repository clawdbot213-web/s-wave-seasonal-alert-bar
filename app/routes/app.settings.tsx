import { useCallback, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import {
  BlockStack,
  Button,
  Card,
  Checkbox,
  FormLayout,
  InlineStack,
  Layout,
  Page,
  Select,
  TextField,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import prisma from "../db.server";
import { authenticate } from "../shopify.server";

const scopeOptions = [
  { label: "Sitewide", value: "sitewide" },
  { label: "Product pages", value: "product" },
  { label: "Collection pages", value: "collection" },
];

const placementOptions = [
  { label: "Top banner", value: "top" },
  { label: "Bottom banner", value: "bottom" },
  { label: "Inline announcement", value: "inline" },
];

const DEFAULT_ALERT = {
  headline: "Winter sale now live",
  message: "Free shipping through Jan 31. Code: WAVE2026",
  ctaLabel: "Shop now",
  ctaUrl: "/collections/new",
  scope: "sitewide",
  placement: "top",
  dismissible: true,
  startDate: "2026-01-29",
  startTime: "09:00",
  endDate: "2026-02-02",
  endTime: "23:59",
  backgroundColor: "#1f2937",
  textColor: "#f9fafb",
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const existingAlert = await prisma.alertBar.findFirst({
    where: { shop: session.shop, status: "draft" },
    orderBy: { updatedAt: "desc" },
  });

  if (!existingAlert) {
    return json({ alert: DEFAULT_ALERT });
  }

  const content = (existingAlert.content ?? {}) as Record<string, unknown>;
  const schedule = (existingAlert.schedule ?? {}) as Record<string, unknown>;
  const style = (existingAlert.style ?? {}) as Record<string, unknown>;
  const cta = (existingAlert.cta ?? {}) as Record<string, unknown>;

  return json({
    alert: {
      headline: content.headline ?? DEFAULT_ALERT.headline,
      message: content.message ?? DEFAULT_ALERT.message,
      ctaLabel: cta.label ?? DEFAULT_ALERT.ctaLabel,
      ctaUrl: cta.url ?? DEFAULT_ALERT.ctaUrl,
      scope: existingAlert.scope ?? DEFAULT_ALERT.scope,
      placement: content.placement ?? DEFAULT_ALERT.placement,
      dismissible:
        typeof content.dismissible === "boolean"
          ? content.dismissible
          : DEFAULT_ALERT.dismissible,
      startDate: schedule.startDate ?? DEFAULT_ALERT.startDate,
      startTime: schedule.startTime ?? DEFAULT_ALERT.startTime,
      endDate: schedule.endDate ?? DEFAULT_ALERT.endDate,
      endTime: schedule.endTime ?? DEFAULT_ALERT.endTime,
      backgroundColor: style.backgroundColor ?? DEFAULT_ALERT.backgroundColor,
      textColor: style.textColor ?? DEFAULT_ALERT.textColor,
    },
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();

  const payload = {
    headline: String(formData.get("headline") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    ctaLabel: String(formData.get("ctaLabel") || "").trim(),
    ctaUrl: String(formData.get("ctaUrl") || "").trim(),
    scope: String(formData.get("scope") || DEFAULT_ALERT.scope),
    placement: String(formData.get("placement") || DEFAULT_ALERT.placement),
    dismissible: formData.get("dismissible") === "true",
    startDate: String(formData.get("startDate") || ""),
    startTime: String(formData.get("startTime") || ""),
    endDate: String(formData.get("endDate") || ""),
    endTime: String(formData.get("endTime") || ""),
    backgroundColor: String(formData.get("backgroundColor") || ""),
    textColor: String(formData.get("textColor") || ""),
  };

  const existingAlert = await prisma.alertBar.findFirst({
    where: { shop: session.shop, status: "draft" },
    orderBy: { updatedAt: "desc" },
  });

  if (existingAlert) {
    await prisma.alertBar.update({
      where: { id: existingAlert.id },
      data: {
        name: payload.headline || "Draft alert",
        scope: payload.scope,
        content: {
          headline: payload.headline,
          message: payload.message,
          placement: payload.placement,
          dismissible: payload.dismissible,
        },
        schedule: {
          startDate: payload.startDate,
          startTime: payload.startTime,
          endDate: payload.endDate,
          endTime: payload.endTime,
        },
        style: {
          backgroundColor: payload.backgroundColor,
          textColor: payload.textColor,
        },
        cta: {
          label: payload.ctaLabel,
          url: payload.ctaUrl,
        },
      },
    });
  } else {
    await prisma.alertBar.create({
      data: {
        shop: session.shop,
        name: payload.headline || "Draft alert",
        scope: payload.scope,
        content: {
          headline: payload.headline,
          message: payload.message,
          placement: payload.placement,
          dismissible: payload.dismissible,
        },
        schedule: {
          startDate: payload.startDate,
          startTime: payload.startTime,
          endDate: payload.endDate,
          endTime: payload.endTime,
        },
        style: {
          backgroundColor: payload.backgroundColor,
          textColor: payload.textColor,
        },
        cta: {
          label: payload.ctaLabel,
          url: payload.ctaUrl,
        },
      },
    });
  }

  return json({ ok: true });
};

export default function SettingsPage() {
  const { alert } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [headline, setHeadline] = useState(alert.headline);
  const [message, setMessage] = useState(alert.message);
  const [ctaLabel, setCtaLabel] = useState(alert.ctaLabel);
  const [ctaUrl, setCtaUrl] = useState(alert.ctaUrl);
  const [scope, setScope] = useState(alert.scope);
  const [placement, setPlacement] = useState(alert.placement);
  const [dismissible, setDismissible] = useState(alert.dismissible);
  const [startDate, setStartDate] = useState(alert.startDate);
  const [startTime, setStartTime] = useState(alert.startTime);
  const [endDate, setEndDate] = useState(alert.endDate);
  const [endTime, setEndTime] = useState(alert.endTime);
  const [backgroundColor, setBackgroundColor] = useState(
    alert.backgroundColor,
  );
  const [textColor, setTextColor] = useState(alert.textColor);

  const handleDismissibleChange = useCallback(
    (checked: boolean) => setDismissible(checked),
    [],
  );

  return (
    <Page>
      <TitleBar title="Alert settings" />
      <Layout>
        <Layout.Section>
          <Card>
            <Form method="post">
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Alert content (draft)
                </Text>
                <FormLayout>
                  <TextField
                    label="Headline"
                    name="headline"
                    value={headline}
                    onChange={setHeadline}
                    autoComplete="off"
                  />
                  <TextField
                    label="Message"
                    name="message"
                    value={message}
                    onChange={setMessage}
                    autoComplete="off"
                    multiline={3}
                  />
                  <InlineStack gap="300">
                    <TextField
                      label="CTA label"
                      name="ctaLabel"
                      value={ctaLabel}
                      onChange={setCtaLabel}
                      autoComplete="off"
                    />
                    <TextField
                      label="CTA URL"
                      name="ctaUrl"
                      value={ctaUrl}
                      onChange={setCtaUrl}
                      autoComplete="off"
                    />
                  </InlineStack>
                  <InlineStack gap="300">
                    <Select
                      label="Scope"
                      name="scope"
                      options={scopeOptions}
                      value={scope}
                      onChange={setScope}
                    />
                    <Select
                      label="Placement"
                      name="placement"
                      options={placementOptions}
                      value={placement}
                      onChange={setPlacement}
                    />
                  </InlineStack>
                  <Checkbox
                    label="Allow customers to dismiss"
                    name="dismissible"
                    checked={dismissible}
                    value="true"
                    onChange={handleDismissibleChange}
                  />
                  <InlineStack gap="300">
                    <TextField
                      label="Start date"
                      name="startDate"
                      value={startDate}
                      onChange={setStartDate}
                      autoComplete="off"
                      type="date"
                    />
                    <TextField
                      label="Start time"
                      name="startTime"
                      value={startTime}
                      onChange={setStartTime}
                      autoComplete="off"
                      type="time"
                    />
                  </InlineStack>
                  <InlineStack gap="300">
                    <TextField
                      label="End date"
                      name="endDate"
                      value={endDate}
                      onChange={setEndDate}
                      autoComplete="off"
                      type="date"
                    />
                    <TextField
                      label="End time"
                      name="endTime"
                      value={endTime}
                      onChange={setEndTime}
                      autoComplete="off"
                      type="time"
                    />
                  </InlineStack>
                  <InlineStack gap="300">
                    <TextField
                      label="Background color"
                      name="backgroundColor"
                      value={backgroundColor}
                      onChange={setBackgroundColor}
                      autoComplete="off"
                    />
                    <TextField
                      label="Text color"
                      name="textColor"
                      value={textColor}
                      onChange={setTextColor}
                      autoComplete="off"
                    />
                  </InlineStack>
                </FormLayout>
                <InlineStack gap="200" align="center">
                  <Button submit variant="primary">
                    Save draft
                  </Button>
                  <Button variant="plain" disabled>
                    Schedule
                  </Button>
                  {actionData?.ok ? (
                    <Text as="p" variant="bodySm" tone="success">
                      Draft saved.
                    </Text>
                  ) : null}
                </InlineStack>
                <Text as="p" variant="bodySm" tone="subdued">
                  Drafts are stored per shop. Scheduling will be wired next.
                </Text>
              </BlockStack>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
