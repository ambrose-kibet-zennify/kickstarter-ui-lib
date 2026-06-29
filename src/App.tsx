import { Theme } from "@twilio-paste/core/theme";
import { Box } from "@twilio-paste/core/box";
import { InputField } from "./components/InputField/InputField";
import { TextareaField } from "./components/TextAreaField/TextAreaField";

function App() {
  return (
    <Theme.Provider theme="default">
      <Box
        padding="space80"
        maxWidth="size60"
        display="flex"
        flexDirection="column"
        rowGap="space70"
      >
        <InputField
          id="name"
          label="Full name"
          type="text"
          placeholder="Jane Doe"
          helpText="Enter your legal name."
        />
        <InputField
          id="age"
          label="Age"
          type="number"
          placeholder="0"
          required
        />
        <InputField
          id="email-error"
          label="Email"
          type="email"
          value="not-an-email"
          errorText="Enter a valid email address."
        />
        <InputField
          id="locked"
          label="Account ID"
          type="text"
          value="ACC-00123"
          helpText="Assigned at registration — cannot be changed."
          disabled
        />
        <TextareaField
          id="bio"
          label="Bio"
          placeholder="Tell us about yourself…"
          helpText="Max 300 characters."
          minRows={3}
          maxRows={6}
        />
        <TextareaField
          id="notes-error"
          label="Notes"
          errorText="This field is required."
          required
        />
      </Box>
    </Theme.Provider>
  );
}

export default App;
