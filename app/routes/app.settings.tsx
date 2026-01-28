import { useCallback, useState } from "react";
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

export default function SettingsPage() {
  const [headline, setHeadline] = useState("Winter sale now live");
  const [message, setMessage] = useState(
    "Free shipping through Jan 31. Code: WAVE2026",
  );
  const [ctaLabel, setCtaLabel] = useState("Shop now");
  const [ctaUrl, setCtaUrl] = useState("/collections/new");
  const [scope, setScope] = useState("sitewide");
  const [placement, setPlacement] = useState("top");
  const [dismissible, setDismissible] = useState(true);
  const [startDate, setStartDate] = useState("2026-01-29");
  const [startTime, setStartTime] = useState("09:00");
  const [endDate, setEndDate] = useState("2026-02-02");
  const [endTime, setEndTime] = useState("23:59");
  const [backgroundColor, setBackgroundColor] = useState("#1f2937");
  const [textColor, setTextColor] = useState("#f9fafb");

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
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Alert content (draft)
              </Text>
              <FormLayout>
                <TextField
                  label="Headline"
                  value={headline}
                  onChange={setHeadline}
                  autoComplete="off"
                />
                <TextField
                  label="Message"
                  value={message}
                  onChange={setMessage}
                  autoComplete="off"
                  multiline={3}
                />
                <InlineStack gap="300">
                  <TextField
                    label="CTA label"
                    value={ctaLabel}
                    onChange={setCtaLabel}
                    autoComplete="off"
                  />
                  <TextField
                    label="CTA URL"
                    value={ctaUrl}
                    onChange={setCtaUrl}
                    autoComplete="off"
                  />
                </InlineStack>
                <InlineStack gap="300">
                  <Select
                    label="Scope"
                    options={scopeOptions}
                    value={scope}
                    onChange={setScope}
                  />
                  <Select
                    label="Placement"
                    options={placementOptions}
                    value={placement}
                    onChange={setPlacement}
                  />
                </InlineStack>
                <Checkbox
                  label="Allow customers to dismiss"
                  checked={dismissible}
                  onChange={handleDismissibleChange}
                />
                <InlineStack gap="300">
                  <TextField
                    label="Start date"
                    value={startDate}
                    onChange={setStartDate}
                    autoComplete="off"
                    type="date"
                  />
                  <TextField
                    label="Start time"
                    value={startTime}
                    onChange={setStartTime}
                    autoComplete="off"
                    type="time"
                  />
                </InlineStack>
                <InlineStack gap="300">
                  <TextField
                    label="End date"
                    value={endDate}
                    onChange={setEndDate}
                    autoComplete="off"
                    type="date"
                  />
                  <TextField
                    label="End time"
                    value={endTime}
                    onChange={setEndTime}
                    autoComplete="off"
                    type="time"
                  />
                </InlineStack>
                <InlineStack gap="300">
                  <TextField
                    label="Background color"
                    value={backgroundColor}
                    onChange={setBackgroundColor}
                    autoComplete="off"
                  />
                  <TextField
                    label="Text color"
                    value={textColor}
                    onChange={setTextColor}
                    autoComplete="off"
                  />
                </InlineStack>
              </FormLayout>
              <InlineStack gap="200">
                <Button variant="primary">Save draft</Button>
                <Button variant="plain">Schedule</Button>
              </InlineStack>
              <Text as="p" variant="bodySm" tone="subdued">
                This is a placeholder UI to map the form flow before wiring up
                storage and scheduling.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
