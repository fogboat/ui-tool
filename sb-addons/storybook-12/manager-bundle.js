try{
(()=>{var h=__STORYBOOK_API__,{ActiveTabs:b,Consumer:y,ManagerContext:O,Provider:A,RequestResponseError:g,addons:s,combineParameters:f,controlOrMetaKey:E,controlOrMetaSymbol:M,eventMatchesShortcut:R,eventToShortcut:C,experimental_requestResponse:k,isMacLike:x,isShortcutTaken:I,keyToSymbol:P,merge:v,mockChannel:G,optionOrAltSymbol:K,shortcutMatchesShortcut:B,shortcutToHumanString:Y,types:q,useAddonState:D,useArgTypes:H,useArgs:L,useChannel:U,useGlobalTypes:$,useGlobals:N,useParameter:w,useSharedState:W,useStoryPrepared:j,useStorybookApi:z,useStorybookState:F}=__STORYBOOK_API__;var Z=__STORYBOOK_THEMING_CREATE__,{create:n,themes:ee}=__STORYBOOK_THEMING_CREATE__;var u=n({base:"light",brandTitle:"UI Tool",brandUrl:"/",brandTarget:"_self"});s.setConfig({theme:u});s.register("TitleAddon",l=>{let a="UI-Tool",i=()=>{let e;try{e=l.getCurrentStoryData()}catch{}document?.title&&(document.title=e!==null&&e.title?`${e.title.replace(/\//g," / ")} - ${e.name} \u22C5 ${a}`:a)};return new MutationObserver(()=>{document.title.endsWith("Storybook")&&i()}).observe(document.querySelector("title"),{childList:!0,subtree:!0,characterData:!0})});})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
