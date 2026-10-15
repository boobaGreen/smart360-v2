/* GroupTraslochiSmart360° — piccoli comportamenti della pagina.
   Niente framework: menu, reveal, barra di avanzamento (fallback), privacy, modulo via EmailJS. */
(function () {
  "use strict";

  // Anno nel footer
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Menu su telefono
  var burger = document.getElementById("burger");
  var mnav = document.getElementById("mnav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = mnav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
    });
    mnav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        mnav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal: gli elementi .rv compaiono quando entrano nello schermo
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("in"); });
  }

  // Barra di avanzamento: se il browser non ha le animazioni da scroll la muoviamo noi
  var pg = document.querySelector(".pg");
  var hasScrollTimeline = CSS.supports && CSS.supports("animation-timeline: scroll()");
  if (pg && !hasScrollTimeline) {
    var tick = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      pg.style.transform = "scaleX(" + (max > 0 ? h.scrollTop / max : 0) + ")";
    };
    addEventListener("scroll", tick, { passive: true });
    tick();
  }

  // Privacy (dialog)
  var dlg = document.getElementById("privacy");
  document.querySelectorAll("[data-privacy]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (dlg && typeof dlg.showModal === "function") dlg.showModal();
    });
  });
  if (dlg) dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  // Modulo di contatto: stesso servizio e template EmailJS del sito precedente
  var form = document.getElementById("form");
  var status = document.getElementById("status");
  var send = document.getElementById("send");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "status";
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = form.privacyCheck.checked ? "Compila tutti i campi, per favore." : "Devi accettare la privacy per inviare il modulo.";
        return;
      }
      if (!window.emailjs) {
        status.textContent = "Ops ... qualcosa è andato storto. Riprova più tardi o chiamaci.";
        return;
      }
      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim()
      };
      send.disabled = true;
      send.textContent = "Inviando...";
      emailjs.init("ZTJIhDAk7ja1Snpln");
      emailjs.send("service_s3jp2sp", "template_xablkhb", data).then(function () {
        status.className = "status ok";
        status.textContent = "Messaggio ricevuto! Grazie per averci contattato.";
        form.reset();
      }).catch(function (err) {
        console.error("Errore invio email:", err);
        status.textContent = "Ops ... qualcosa è andato storto. Riprova più tardi o chiamaci.";
      }).then(function () {
        send.disabled = false;
        send.textContent = "Invia la richiesta";
      });
    });
  }
})();
