/* =========================================================
   体質改善ダイエット講座 LP — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     1) LINE の公式アカウント URL を一括設定
     本番では下記 LINE_URL を実際の LINE 追加 URL に変更してください。
     例) "https://lin.ee/xxxxxxx"
     ---------------------------------------------------------- */
  var LINE_URL = "https://lin.ee/rXwNunK"; // LINE 公式アカウント追加 URL

  if (LINE_URL) {
    document.querySelectorAll(".js-line").forEach(function (el) {
      el.setAttribute("href", LINE_URL);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });
  }

  /* ----------------------------------------------------------
     2) モバイル用スティッキー CTA の表示制御
        ・ファーストビューを過ぎたら表示
        ・通常の CTA ボタンが画面内にあるときは隠す（重複回避）
     ---------------------------------------------------------- */
  var sticky = document.querySelector(".sticky-cta");
  var hero = document.querySelector(".fv");
  if (!sticky || !hero) return;

  var pastHero = false;
  var ctaVisible = false;

  function update() {
    if (pastHero && !ctaVisible) {
      sticky.classList.add("is-visible");
    } else {
      sticky.classList.remove("is-visible");
    }
  }

  if ("IntersectionObserver" in window) {
    // hero 監視
    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting;
      update();
    }, { threshold: 0 }).observe(hero);

    // 各 CTA ボタン監視
    var ctaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        e.target.dataset.inview = e.isIntersecting ? "1" : "0";
      });
      ctaVisible = Array.prototype.some.call(
        document.querySelectorAll(".cta__btn"),
        function (b) { return b.dataset.inview === "1"; }
      );
      update();
    }, { threshold: 0.1 });

    document.querySelectorAll(".cta__btn").forEach(function (b) {
      ctaObserver.observe(b);
    });
  } else {
    // フォールバック
    window.addEventListener("scroll", function () {
      pastHero = window.scrollY > hero.offsetHeight;
      update();
    }, { passive: true });
  }
})();
