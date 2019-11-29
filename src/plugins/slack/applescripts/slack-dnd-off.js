const safari = Application('Safari');

function getTab(url) {
  return safari.windows[0].tabs().filter(t => t.url().startsWith(url))[0];
}

const tab = getTab('https://app.slack.com');

const script = `
((input) => {
  input.innerHTML = '/dnd off'
  input.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 13}))
  input.innerHTML = '/status clear'
  input.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 13}))
})(document.querySelector('.ql-editor'))
`;

safari.doJavaScript(script, { in: tab });
