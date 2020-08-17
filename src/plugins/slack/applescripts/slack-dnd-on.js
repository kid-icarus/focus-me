const safari = Application('Safari');
const util = Library('focus-me-applescripts/util');
const config = util.getConfig();
const { time } = config;
const { statusMessage, statusEmoji } = config.plugins.slack;

function getTab(url) {
  return safari.windows[0].tabs().filter(t => t.url().startsWith(url))[0];
}

const tab = getTab('https://app.slack.com');

const script = `
((input) => {
  input.innerHTML = '/dnd ${time} minutes'
  input.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 13}))
  input.innerHTML = '/status ${statusEmoji} ${statusMessage}'
  input.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 13}))
})(document.querySelector('.ql-editor'))
`;

safari.doJavaScript(script, { in: tab });
