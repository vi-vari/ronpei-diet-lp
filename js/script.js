/* =========================================================================
   ビオ接骨院 小牧院（育毛治療院）LP — interactions
   ========================================================================= */
(function () {
  "use strict";

  /* --------------------------------------------------------------
     LINE 公式アカウントの追加 URL を全 CTA に一括設定。
     本番では下記 LINE_URL を実際の URL（例: "https://lin.ee/xxxxxxx"）に
     変更してください。空文字のままだと href="#" のままになります。
     -------------------------------------------------------------- */
  var LINE_URL = "https://line.me/R/ti/p/@729eivtp?oat_content=url&ts=07061813"; // LINE 公式アカウント追加 URL

  if (LINE_URL) {
    document.querySelectorAll(".js-line").forEach(function (el) {
      el.setAttribute("href", LINE_URL);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* --------------------------------------------------------------
     画面下の固定 CTA バー：最下部（フッター）まで来たら重複を避けて隠す。
     -------------------------------------------------------------- */
  var sticky = document.querySelector(".sticky-cta");
  var footer = document.querySelector(".site-footer");
  if (!sticky || !footer || !("IntersectionObserver" in window)) return;

  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      sticky.style.transform = e.isIntersecting ? "translateY(120%)" : "translateY(0)";
    });
  }, { threshold: 0 }).observe(footer);

  sticky.style.transition = "transform .25s ease";
})();
