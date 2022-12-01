window.PNOTE_BASE_URL = window.PNOTE_BASE_URL || '/';

function handleHamburgerClick(e) {
  e.preventDefault();
  const menu = document.querySelector('.mobile-menu');
  menu.style.display = 'block';
}

function handleCloseClick(e) {
  e.preventDefault();
  const menu = document.querySelector('.mobile-menu');
  menu.style.display = 'none';
}

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

const channelScriptInit = async () => {
  var w = window;
  if (w.ChannelIOWrapper) {
    return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
  }
  if (w.ChannelIOInitialized) {
    return;
  }
  w.ChannelIOInitialized = true;
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = 'https://pnote-channel-io-script.s3.ap-northeast-2.amazonaws.com/channel-io-script-min.js';
  s.setAttribute('channel-btn-img', 'https://pnote.s3.ap-northeast-2.amazonaws.com/channel-images/channel-button.png')
  s.setAttribute('channel-btn-img-m', 'https://pnote.s3.ap-northeast-2.amazonaws.com/channel-images/channel-button-m.png')
  s.charset = 'UTF-8';
  var x = document.getElementsByTagName('script')[0];
  x.parentNode && x.parentNode.insertBefore(s, x);
}

const channelScriptBoot = async () => {
  if (window.ChannelIOWrapper && !window.ChannelIOWrapper.q) {
    window.ChannelIOWrapper('boot', {
      pluginKey: "204ad750-a3ee-4182-a8c5-05883589bd0c"
    });
    window.ChannelIOWrapper('showChannelButton');
  } else {
    setTimeout(async () => {
      await channelScriptBoot();
    }, 100);
  }
}

window.onload = async () => {
  injectStyleCss();
  await injectBodyHtml();
  await channelScriptInit();
  await channelScriptBoot();
};
