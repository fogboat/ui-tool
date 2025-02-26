import type { Preview } from "@storybook/react";
import "../src/autoArgs/blocks/index"
const preview: Preview = {
  parameters: {
    docs: {
      // codePanel: true,
      toc: {
        // contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: '目录',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },  
  },
};

export default preview;
