import {
  Badge,
  BlockStack,
  Box,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

const presets = [
  {
    name: "Holiday",
    description: "Bold seasonal banner for shipping cutoffs.",
  },
  {
    name: "Announcement",
    description: "Clean, neutral alert for store updates.",
  },
  {
    name: "Minimal",
    description: "Low-profile bar that blends with your header.",
  },
  {
    name: "Dark",
    description: "Strong contrast for high-visibility campaigns.",
  },
  {
    name: "Custom",
    description: "Use your own brand colors and CTA styling.",
  },
];

export default function AdditionalPage() {
  return (
    <Page>
      <TitleBar title="Design presets" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Theme presets
              </Text>
              <Text as="p" variant="bodyMd">
                Pair your alert bar with a seasonal emoji and a clear CTA.
              </Text>
              <BlockStack gap="300">
                {presets.map((preset) => (
                  <Box
                    key={preset.name}
                    padding="300"
                    borderWidth="025"
                    borderRadius="200"
                    borderColor="border"
                  >
                    <BlockStack gap="150">
                      <InlineStack gap="200" align="start">
                        <Badge tone="info">{preset.name}</Badge>
                        <Text as="span" variant="bodySm" tone="subdued">
                          {preset.description}
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </Box>
                ))}
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Pro tips
              </Text>
              <Text as="p" variant="bodySm">
                Schedule alerts for high-traffic hours and enable dismiss to keep
                repeat visitors happy.
              </Text>
              <Text as="p" variant="bodySm">
                Use the CTA button style for flash sales.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
