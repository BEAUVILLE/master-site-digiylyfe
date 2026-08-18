/* =====================================================================
   MASTER SITE DIGIYLYFE · V1 — lecteur texte navigateur
   Lit le contenu visible dans la langue courante, sans service externe.
   ===================================================================== */
(() => {
  "use strict";

  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;

  const LABELS = {
    fr:{listen:"Écouter",stop:"Arrêter"},
    en:{listen:"Listen",stop:"Stop"},
    es:{listen:"Escuchar",stop:"Detener"},
    pt:{listen:"Ouvir",stop:"Parar"},
    it:{listen:"Ascolta",stop:"Ferma"},
    de:{listen:"Anhören",stop:"Stoppen"},
    nl:{listen:"Luisteren",stop:"Stoppen"},
    ar:{listen:"استمع",stop:"إيقاف"}
  };

  const VOICE_LANG = {
    fr:"fr-FR", en:"en-US", es:"es-ES", pt:"pt-PT",
    it:"it-IT", de:"de-DE", nl:"nl-NL", ar:"ar-SA"
  };

  let active = false;

  const currentLang = () => (document.documentElement.lang || "fr").toLowerCase().split("-")[0];
  const labels = () => LABELS[currentLang()] || LABELS.fr;

  function setButtonState() {
    const btn = document.getElementById("text-reader-btn");
    if (!btn) return;
    const label = active ? labels().stop : labels().listen;
    btn.querySelector(".cbtn__ico").textContent = active ? "⏹" : "🔊";
    btn.querySelector(".reader__label").textContent = label;
    btn.setAttribute("aria-label", label);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  }

  function collectText() {
    const parts = [];
    const add = (selector) => {
      const node = document.querySelector(selector);
      if (node && !node.hidden) {
        const txt = (node.innerText || node.textContent || "").replace(/\s+/g, " ").trim();
        if (txt) parts.push(txt);
      }
    };

    add("#hero-eyebrow");
    add("#hero-name");
    add("#hero-tagline");
    add("#about-text");
    add("#services-grid");
    add("#proofs-grid");

    return parts.join(". ");
  }

  function stopReading() {
    window.speechSynthesis.cancel();
    active = false;
    setButtonState();
  }

  function toggleReading(e) {
    e.preventDefault();

    if (active || window.speechSynthesis.speaking) {
      stopReading();
      return;
    }

    const text = collectText();
    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);
    const lang = currentLang();
    utter.lang = VOICE_LANG[lang] || lang;
    utter.rate = 0.95;
    utter.pitch = 1;

    utter.onend = () => {
      active = false;
      setButtonState();
    };
    utter.onerror = () => {
      active = false;
      setButtonState();
    };

    active = true;
    setButtonState();
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  function ensureButton() {
    const box = document.getElementById("quickcontact");
    if (!box || document.getElementById("text-reader-btn")) return;

    const btn = document.createElement("a");
    btn.id = "text-reader-btn";
    btn.href = "#";
    btn.className = "cbtn cbtn--vcf";
    btn.setAttribute("role", "button");
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = '<span class="cbtn__ico" aria-hidden="true">🔊</span><span class="reader__label"></span>';
    btn.addEventListener("click", toggleReading);
    box.appendChild(btn);
    setButtonState();
  }

  function initReader() {
    ensureButton();

    const box = document.getElementById("quickcontact");
    if (box) {
      new MutationObserver(ensureButton).observe(box, { childList:true });
    }

    new MutationObserver(() => {
      stopReading();
      ensureButton();
      setButtonState();
    }).observe(document.documentElement, { attributes:true, attributeFilter:["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initReader);
  else initReader();
})();
