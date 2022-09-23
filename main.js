window.PNOTE_BASE_URL = window.PNOTE_BASE_URL || '/';

const getBodyHtml = async () => {
  const baseUrl = window.PNOTE_BASE_URL;
  const res = await fetch(`${baseUrl}body.html?t=${Date.now()}`);
  return await res.text();
};

const injectBodyHtml = async () => {
  const body = document.querySelector('body');
  body.insertAdjacentHTML('afterbegin', await getBodyHtml());
}

const injectStyleCss = () => {
  const baseUrl = window.PNOTE_BASE_URL;
  const head = document.querySelector('head');
  head.insertAdjacentHTML('beforeend', `<link href="${baseUrl}/style.css?t=${Date.now()}" rel="stylesheet">`);
}

window.onload = async () => {
  injectStyleCss();
  await injectBodyHtml();
};
