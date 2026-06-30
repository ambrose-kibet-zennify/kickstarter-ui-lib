import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof List>;

export const Unordered: Story = {
  args: {
    type: "ul",
    items: [
      { text: "Inbound voice" },
      { text: "Outbound voice" },
      { text: "SMS messaging" },
      { text: "WhatsApp messaging" },
    ],
  },
};

export const Ordered: Story = {
  args: {
    type: "ol",
    items: [
      { text: "Create a Twilio account" },
      { text: "Buy a phone number" },
      { text: "Configure your webhook" },
      { text: "Deploy your application" },
    ],
  },
};

export const Nested: Story = {
  args: {
    type: "ul",
    items: [
      { text: "Voice" },
      {
        text: "Messaging",
        subList: {
          type: "ol",
          items: [
            { text: "SMS" },
            { text: "MMS" },
            { text: "WhatsApp" },
          ],
        },
      },
      {
        text: "Email",
        subList: {
          type: "ol",
          items: [
            { text: "Transactional" },
            { text: "Marketing" },
          ],
        },
      },
    ],
  },
};

export const DeepNested: Story = {
  args: {
    type: "ul",
    items: [
      {
        text: "Channels",
        subList: {
          type: "ol",
          items: [
            {
              text: "Messaging",
              subList: {
                type: "ul",
                items: [
                  { text: "SMS" },
                  { text: "WhatsApp" },
                  { text: "Chat" },
                ],
              },
            },
            {
              text: "Voice",
              subList: {
                type: "ul",
                items: [
                  { text: "Inbound" },
                  { text: "Outbound" },
                ],
              },
            },
          ],
        },
      },
      { text: "Analytics" },
    ],
  },
};
