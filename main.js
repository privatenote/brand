window.PNOTE_BASE_URL = window.PNOTE_BASE_URL || '/';

const getBodyHtml = async () => {
  const baseUrl = window.PNOTE_BASE_URL;
  const res = await fetch(`${baseUrl}body.html`);
  return await res.text();
};

const injectBodyHtml = async () => {
  const body = document.querySelector('body');
  body.insertAdjacentHTML('afterbegin', await getBodyHtml());
}

window.onload = async () => {
  await injectBodyHtml();
};
