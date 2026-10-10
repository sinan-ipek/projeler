/* İstatistik altyapısı — GoatCounter hesap kodu bağlanana kadar pasiftir. */
(() => {
  'use strict';
  const code = ''; // Hesap kurulduğunda yalnızca herkese açık GoatCounter site kodu yazılacak.
  const valid = /^[a-z0-9-]{2,64}$/.test(code);
  window.SI_ANALYTICS = {code: valid ? code : '', ready: valid};
  if (!valid || location.pathname.startsWith('/projeler/istatistik')) return;
  if (location.protocol === 'file:' || !/^(sinan-ipek\.github\.io)$/i.test(location.hostname)) return;
  if (document.querySelector('script[data-goatcounter]')) return;
  window.goatcounter = {
    path: () => {
      let p = location.pathname.replace(/\/index\.html$/i, '/');
      return p === '/projeler/index.html' ? '/projeler/' : p;
    }
  };
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = 'https://' + code + '.goatcounter.com/count';
  document.head.appendChild(script);
})();
