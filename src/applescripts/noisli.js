const safari = Application('Safari');

function getTab(url) {
  return safari.windows[0].tabs().filter(t => t.url().startsWith(url))[0];
}

const tab = getTab('https://www.noisli.com');

const script = `
  document.querySelector('[data-name="rain"]').click()
`;

safari.doJavaScript(
  script,
  { in: tab },
);
