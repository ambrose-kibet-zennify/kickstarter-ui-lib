import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@twilio-paste/core/box";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { InputField } from "../InputField/InputField";
import { TextareaField } from "../TextAreaField/TextAreaField";
import { SelectField } from "../SelectField/SelectField";
import { RadioField } from "../RadioField/RadioField";
import { SwitchField } from "../SwitchField/SwitchField";
import type {
  SelectOption,
  SelectOptionGroup,
} from "../SelectField/SelectField";
import type { RadioOption } from "../RadioField/RadioField";

// Grouped options — shows OptionGroup rendering
const COUNTRY_OPTIONS: Array<SelectOption | SelectOptionGroup> = [
  { value: "", label: "-- Select country --" },
  {
    label: "Americas",
    options: [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "mx", label: "Mexico" },
    ],
  },
  {
    label: "Europe",
    options: [
      { value: "uk", label: "United Kingdom" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
    ],
  },
];

// Flat options with one disabled — shows disabled option state
const DEPARTMENT_OPTIONS: SelectOption[] = [
  { value: "", label: "-- Select department --" },
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "product", label: "Product" },
  { value: "marketing", label: "Marketing", disabled: true },
];

// Horizontal radio — three short labels work well side-by-side
const CONTACT_OPTIONS: RadioOption[] = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "sms", label: "SMS" },
];

// Vertical radio with per-option help text
const PLAN_OPTIONS: RadioOption[] = [
  {
    value: "starter",
    label: "Starter",
    helpText: "Free forever, up to 3 projects.",
  },
  { value: "pro", label: "Pro", helpText: "$12/month, unlimited projects." },
  {
    value: "enterprise",
    label: "Enterprise",
    helpText: "Custom pricing for large teams.",
  },
];

const meta: Meta = {
  title: "Examples/Form",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj;

export const CreateAccount: Story = {
  name: "Create account",
  render: () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("not-an-email");
    const [country, setCountry] = useState("");
    const [department, setDepartment] = useState("");
    const [contactMethod, setContactMethod] = useState("email");
    const [plan, setPlan] = useState("starter");
    const [bio, setBio] = useState("");
    const [notifications, setNotifications] = useState(true);
    const [terms, setTerms] = useState(false);

    return (
      <Box
        as="form"
        maxWidth="size60"
        onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <Stack orientation="vertical" spacing="space70">
          {/* Normal required input */}
          <InputField
            id="ca-name"
            label="Full name"
            placeholder="Jane Doe"
            helpText="Enter your legal name."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Input in error state */}
          <InputField
            id="ca-email"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorText="Please enter a valid email address."
            required
          />

          {/* SelectField with grouped OptionGroups */}
          <SelectField
            id="ca-country"
            label="Country"
            value={country}
            options={COUNTRY_OPTIONS}
            onChange={(e) => setCountry(e.target.value)}
            helpText="Select your country of residence."
            required
          />

          {/* SelectField with flat options + one disabled */}
          <SelectField
            id="ca-department"
            label="Department"
            value={department}
            options={DEPARTMENT_OPTIONS}
            onChange={(e) => setDepartment(e.target.value)}
            labelOptional
          />

          {/* RadioField — horizontal orientation */}
          <RadioField
            name="ca-contact"
            label="Preferred contact method"
            options={CONTACT_OPTIONS}
            value={contactMethod}
            onChange={setContactMethod}
            orientation="horizontal"
            helpText="How would you like us to reach you?"
          />

          {/* RadioField — vertical with per-option help text */}
          <RadioField
            name="ca-plan"
            label="Subscription plan"
            options={PLAN_OPTIONS}
            value={plan}
            onChange={setPlan}
            required
          />

          {/* TextareaField — auto-grow */}
          <TextareaField
            id="ca-bio"
            label="Bio"
            placeholder="Tell us a little about yourself…"
            helpText="Max 300 characters."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            minRows={2}
            maxRows={6}
          />

          {/* SwitchField — normal with help text */}
          <SwitchField
            label="Email notifications"
            helpText="Receive weekly digests and account alerts."
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />

          {/* SwitchField — error clears when accepted */}
          <SwitchField
            label="I agree to the terms of service"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            errorText={
              !terms ? "You must accept the terms to continue." : undefined
            }
            required
          />

          <Box>
            <Button variant="primary" type="submit">
              Create account
            </Button>
          </Box>
        </Stack>
      </Box>
    );
  },
};
