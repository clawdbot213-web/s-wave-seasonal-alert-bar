import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  InlineStack,
  List,
  Box,
  Badge,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

const THEME_EDITOR_URL = "shopify:admin/themes/current/editor?context=apps";

export default function Index() {
  return (
    <Page>
      <TitleBar title="Seasonal Alert Bar" />
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Quick start
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Announce promotions, shipping cutoffs, or holiday sales in a
                    clean, dismissible bar.
                  </Text>
                </BlockStack>
                <List type="number">
                  <List.Item>Open your theme editor.</List.Item>
                  <List.Item>
                    Add the <strong>Seasonal alert bar</strong> app block.
                  </List.Item>
                  <List.Item>
                    Customize the message, CTA, and schedule.
                  </List.Item>
                </List>
                <InlineStack gap="300">
                  <Button url={THEME_EDITOR_URL} target="_top" variant="primary">
                    Open theme editor
                  </Button>
                  <Button url="/app/settings">Draft an alert</Button>
                  <Button url="/app/additional" variant="plain">
                    Explore design presets
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  Status
                </Text>
                <InlineStack gap="200" align="start">
                  <Badge tone="success">App installed</Badge>
                  <Badge>Theme app extension</Badge>
                </InlineStack>
                <Text as="p" variant="bodySm">
                  The alert bar can be scheduled, dismissed, or pinned top/bottom.
                </Text>
                <Button url={THEME_EDITOR_URL} target="_top" fullWidth>
                  Add app block
                </Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Built-in controls
                </Text>
                <Text as="p" variant="bodyMd">
                  Highlight seasonal promotions with premium presets, icons, and
                  scheduled visibility.
                </Text>
                <InlineStack gap="200" wrap>
                  {[
                    "Theme presets",
                    "Top or bottom",
                    "CTA button",
                    "Icon + emoji",
                    "Schedule window",
                    "Dismiss controls",
                  ].map((label) => (
                    <Box
                      key={label}
                      padding="200"
                      borderWidth="025"
                      borderRadius="200"
                      borderColor="border"
                    >
                      <Text as="span" variant="bodySm">
                        {label}
                      </Text>
                    </Box>
                  ))}
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
