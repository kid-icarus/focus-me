const chrome = Application('Google Chrome');

function getTab(url) {
  const windows = chrome.windows;
  for (let i = 0; i < windows.length; i++) {
    const tabs = windows[i].tabs;
    for (let j = 0; j < tabs.length; j++) {
      const tab = tabs[j];
      const tabUrl = tab.url();
      if (tabUrl.startsWith(url)) {
        return tab;
      }
    }
  }
}

const tab = getTab('https://app.slack.com');

const javascript = `
((input) => {
  input.innerHTML = '/dnd off'
  input.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 13}))
  input.innerHTML = '/status clear'
  input.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 13}))
})(document.querySelector('.ql-editor'))
`;

tab.execute({
  javascript
});
