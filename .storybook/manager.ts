import { addons, } from '@storybook/manager-api';
import theme from './theme';
 
addons.setConfig({
  theme,
});

addons.register('TitleAddon', (api) => {
  const PAGE_TITLE = 'UI-Tool'

  const setTitle = () => {
    let storyData
    try {
      storyData = api.getCurrentStoryData()      
    } catch (e) {}
    if (document?.title) {
      document.title =
      storyData !== null && storyData.title
        ? `${storyData.title.replace(/\//g, ' / ')} - ${storyData.name} ⋅ ${PAGE_TITLE}`
        : PAGE_TITLE
    }
    
  }

  return new MutationObserver(() => {
    if (document.title.endsWith('Storybook')) {
      setTitle();
    }
  }).observe(document.querySelector('title')!, {
    childList: true,
    subtree: true,
    characterData: true,
  });
})