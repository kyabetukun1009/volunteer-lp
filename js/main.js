/* ボランティアLP：メニュー開閉とフォームの入力チェック（送信処理はまだ未接続） */
(function () {
  'use strict';

  /* ---------- ハンバーガーメニュー ---------- */
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('gnav');

  if (btn && nav) {
    var setOpen = function (open) {
      if (open) {
        nav.removeAttribute('hidden');
      } else {
        nav.setAttribute('hidden', '');
      }
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    btn.addEventListener('click', function () {
      setOpen(nav.hasAttribute('hidden'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'A') {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    });
  }

  /* ---------- お問い合わせフォーム（表側のみ・送信は未接続） ---------- */
  var form = document.getElementById('contactForm');
  var msg = document.getElementById('formMsg');

  if (form && msg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        var invalid = form.querySelector(':invalid');
        msg.textContent = '必須項目（*）を入力してください。メールアドレスの形式もご確認ください。';
        if (invalid) {
          invalid.focus();
        }
        return;
      }

      msg.textContent = '送信機能は準備中です。現在、入力内容は送信されません。';
    });
  }

  /* ---------- タブレット帯だけ：カード群をデザイン寸法のまま均一ズーム ---------- */
  var stages = [];
  var vcStage = document.querySelector('.vc-stage');
  if (vcStage) {
    stages.push({ el: vcStage, designWidth: 516, spDesignWidth: 251 });
  }
  var fyStage = document.querySelector('.fy-stage');
  if (fyStage) {
    stages.push({ el: fyStage, designWidth: 1026, spDesignWidth: 430 });
  }
  var expStage = document.querySelector('.exp-stage');
  if (expStage) {
    stages.push({ el: expStage, designWidth: 1020 });
  }
  var roleStage = document.querySelector('.role-stage');
  if (roleStage) {
    stages.push({ el: roleStage, designWidth: 1022 });
  }
  var ovStage = document.querySelector('.ov-stage');
  if (ovStage) {
    stages.push({ el: ovStage, designWidth: 1024 });
  }
  if (stages.length > 0) {
    var mq = window.matchMedia('(min-width: 551px) and (max-width: 1023px)');
    var mqSp = window.matchMedia('(max-width: 550px)');
    var fitStages = function () {
      stages.forEach(function (s) {
        var dw = 0;
        if (mq.matches) {
          dw = s.designWidth;
        } else if (mqSp.matches && s.spDesignWidth) {
          dw = s.spDesignWidth;
        }
        if (dw > 0) {
          s.el.style.zoom = '';
          var w = s.el.parentElement.clientWidth;
          if (w > 0) {
            s.el.style.zoom = String(w / dw);
          }
        } else {
          s.el.style.zoom = '';
        }
      });
    };
    fitStages();
    window.addEventListener('resize', fitStages);
    if (mq.addEventListener) {
      mq.addEventListener('change', fitStages);
    }
    if (mqSp.addEventListener) {
      mqSp.addEventListener('change', fitStages);
    }
  }
})();
