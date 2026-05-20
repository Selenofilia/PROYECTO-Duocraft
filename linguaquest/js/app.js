(function () {
  /* Registro en 2 pasos */
  var wizard = document.querySelector("[data-wizard]");
  if (wizard) {
    var panes = wizard.querySelectorAll("[data-pane]");
    var dots = wizard.querySelectorAll("[data-step-dot]");
    var btnBack = wizard.querySelector("[data-back]");
    var btnNext = wizard.querySelector("[data-next]");
    var btnSend = wizard.querySelector("[data-submit]");
    var n = 0;

    function go(i) {
      n = i;
      panes.forEach(function (p, j) {
        p.classList.toggle("is-active", j === i);
      });
      dots.forEach(function (d, j) {
        d.classList.remove("is-on", "is-done");
        if (j < i) d.classList.add("is-done");
        if (j === i) d.classList.add("is-on");
      });
      if (btnBack) btnBack.hidden = i === 0;
      if (btnNext) btnNext.hidden = i === panes.length - 1;
      if (btnSend) btnSend.hidden = i !== panes.length - 1;
    }

    function validPane(i) {
      var fields = panes[i].querySelectorAll("input, select");
      for (var f = 0; f < fields.length; f++) {
        if (!fields[f].checkValidity()) {
          fields[f].reportValidity();
          return false;
        }
      }
      return true;
    }

    btnNext &&
      btnNext.addEventListener("click", function () {
        if (validPane(n)) go(n + 1);
      });
    btnBack && btnBack.addEventListener("click", function () {
      go(n - 1);
    });
    go(0);
  }

  /* Carta: 2 ejercicios + resumen */
  var carta = document.querySelector("[data-carta]");
  if (carta) {
    var cards = carta.querySelectorAll("[data-slide]");
    var label = carta.querySelector("[data-slide-label]");
    var btnNext = carta.querySelector("[data-slide-next]");
    var idx = 0;

    function show(i) {
      idx = i;
      cards.forEach(function (c, j) {
        c.hidden = j !== i;
      });
      if (label) {
        label.textContent =
          i < cards.length - 1 ? "Pregunta " + (i + 1) + " de 2" : "Resumen";
      }
      if (btnNext) {
        if (i === cards.length - 1) {
          btnNext.hidden = false;
          btnNext.textContent = "Volver al inicio";
        } else {
          btnNext.hidden = true;
          btnNext.textContent = "Siguiente";
        }
      }
    }

    carta.querySelectorAll("[data-option]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest("[data-slide]");
        var fb = card.querySelector("[data-feedback]");
        var ok = btn.dataset.ok === "1";
        card.querySelectorAll("[data-option]").forEach(function (b) {
          b.disabled = true;
          b.classList.remove("is-ok", "is-bad");
        });
        btn.classList.add(ok ? "is-ok" : "is-bad");
        if (fb) {
          fb.textContent = ok ? btn.dataset.msgOk || "Correcto." : btn.dataset.msgBad || "Inténtalo de nuevo.";
          fb.className = "feedback " + (ok ? "ok" : "bad");
        }
        if (btnNext && idx < cards.length - 1) {
          btnNext.hidden = false;
          btnNext.textContent = "Siguiente";
        }
      });
    });

    btnNext &&
      btnNext.addEventListener("click", function () {
        if (idx < cards.length - 1) show(idx + 1);
        else window.location.href = "inicio.html?done=1";
      });

    show(0);
  }

  /* Inicio: carta completada */
  if (new URLSearchParams(location.search).get("done") === "1") {
    var hero = document.querySelector("[data-hero]");
    if (hero) {
      hero.classList.add("is-done");
      var h2 = hero.querySelector("h2");
      var p = hero.querySelector("p");
      var a = hero.querySelector("a");
      if (h2) h2.textContent = "Práctica de hoy lista";
      if (p) p.textContent = "+50 puntos para ti y tu círculo. Mañana hay otra carta.";
      if (a) {
        a.textContent = "Ver círculo";
        a.href = "equipo.html";
      }
    }
  }
})();
