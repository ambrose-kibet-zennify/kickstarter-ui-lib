import type { Preview, Decorator } from '@storybook/react-vite';
import { Theme } from '@twilio-paste/core/theme';
import { Box } from '@twilio-paste/core/box';

const withPasteTheme: Decorator = (Story, context) => {
  const theme = (context.globals?.pasteTheme as string) ?? 'default';
  return (
    <Theme.Provider theme={theme}>
      <Box backgroundColor="colorBackgroundBody" padding="space80">
        <Story />
      </Box>
    </Theme.Provider>
  );
};

const preview: Preview = {
  globalTypes: {
    pasteTheme: {
      name: 'Theme',
      description: 'Paste design system theme',
      defaultValue: 'default',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'default',     title: 'Default'     },
          { value: 'twilio',      title: 'Twilio'      },
          { value: 'twilio-dark', title: 'Twilio Dark' },
          { value: 'dark',        title: 'Dark'        },
          { value: 'sendgrid',    title: 'SendGrid'    },
          { value: 'evergreen',   title: 'Evergreen'   },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [withPasteTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;