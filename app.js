/* =====================================================================
   MASTER SITE DIGIYLYFE · V1 — moteur d'affichage FIXE (ne change pas par pro)
   Rôle : lire client.json (le 3e lecteur du modèle de données DIGIYLYFE),
   remplir les 9 blocs, gérer les 8 langues du "chrome", galerie, partage,
   vCard et SEO local. Aucune base, aucune connexion, aucun cockpit.
   ===================================================================== */
(() => {
  "use strict";

  /* ---- Dictionnaire du CHROME (libellés de l'interface), 8 langues ----
     Le CONTENU du pro vient du JSON. Ici, seulement les mots de l'ossature. */
  const UI = {
    fr:{whatsapp:"WhatsApp",call:"Appeler",directions:"Itinéraire",share:"Partager",
        save:"Enregistrer dans mon téléphone",about:"Qui je suis",services:"Services",
        gallery:"Photos",proofs:"Ils m'ont fait confiance",card:"Ma carte DIGIYLYFE",
        contact:"Me contacter",hours:"Horaires",zone:"Zone",
        made_with:"Présence digitale réalisée avec DIGIYLYFE",
        doctrine:"Contact direct · Paiement direct · 0 % de commission",
        card_hint:"Scannez pour garder ma carte dans votre téléphone.",
        empty_t:"Aucune donnée client",empty_d:"Ajoutez client.json à côté de ce site."},
    en:{whatsapp:"WhatsApp",call:"Call",directions:"Directions",share:"Share",
        save:"Save to my phone",about:"About me",services:"Services",gallery:"Photos",
        proofs:"They trusted me",card:"My DIGIYLYFE card",contact:"Contact me",
        hours:"Hours",zone:"Area",made_with:"Digital presence powered by DIGIYLYFE",
        doctrine:"Direct contact · Direct payment · 0% commission",
        card_hint:"Scan to keep my card in your phone.",
        empty_t:"No client data",empty_d:"Add client.json next to this site."},
    es:{whatsapp:"WhatsApp",call:"Llamar",directions:"Cómo llegar",share:"Compartir",
        save:"Guardar en mi teléfono",about:"Quién soy",services:"Servicios",gallery:"Fotos",
        proofs:"Confiaron en mí",card:"Mi tarjeta DIGIYLYFE",contact:"Contáctame",
        hours:"Horario",zone:"Zona",made_with:"Presencia digital con DIGIYLYFE",
        doctrine:"Contacto directo · Pago directo · 0 % de comisión",
        card_hint:"Escanea para guardar mi tarjeta.",
        empty_t:"Sin datos de cliente",empty_d:"Añade client.json junto al sitio."},
    pt:{whatsapp:"WhatsApp",call:"Ligar",directions:"Como chegar",share:"Partilhar",
        save:"Guardar no telemóvel",about:"Quem sou",services:"Serviços",gallery:"Fotos",
        proofs:"Confiaram em mim",card:"O meu cartão DIGIYLYFE",contact:"Contacte-me",
        hours:"Horário",zone:"Zona",made_with:"Presença digital com DIGIYLYFE",
        doctrine:"Contacto direto · Pagamento direto · 0 % de comissão",
        card_hint:"Digitalize para guardar o meu cartão.",
        empty_t:"Sem dados de cliente",empty_d:"Adicione client.json junto ao site."},
    it:{whatsapp:"WhatsApp",call:"Chiama",directions:"Indicazioni",share:"Condividi",
        save:"Salva sul telefono",about:"Chi sono",services:"Servizi",gallery:"Foto",
        proofs:"Si sono fidati di me",card:"La mia carta DIGIYLYFE",contact:"Contattami",
        hours:"Orari",zone:"Zona",made_with:"Presenza digitale con DIGIYLYFE",
        doctrine:"Contatto diretto · Pagamento diretto · 0% di commissione",
        card_hint:"Scansiona per salvare la mia carta.",
        empty_t:"Nessun dato cliente",empty_d:"Aggiungi client.json accanto al sito."},
    de:{whatsapp:"WhatsApp",call:"Anrufen",directions:"Route",share:"Teilen",
        save:"Auf dem Handy speichern",about:"Über mich",services:"Leistungen",gallery:"Fotos",
        proofs:"Sie vertrauten mir",card:"Meine DIGIYLYFE-Karte",contact:"Kontakt",
        hours:"Zeiten",zone:"Gebiet",made_with:"Digitale Präsenz mit DIGIYLYFE",
        doctrine:"Direkter Kontakt · Direkte Zahlung · 0 % Provision",
        card_hint:"Scannen, um meine Karte zu speichern.",
        empty_t:"Keine Kundendaten",empty_d:"client.json neben die Website legen."},
    nl:{whatsapp:"WhatsApp",call:"Bellen",directions:"Route",share:"Delen",
        save:"Op mijn telefoon opslaan",about:"Wie ik ben",services:"Diensten",gallery:"Foto's",
        proofs:"Zij vertrouwden mij",card:"Mijn DIGIYLYFE-kaart",contact:"Contact",
        hours:"Uren",zone:"Zone",made_with:"Digitale aanwezigheid met DIGIYLYFE",
        doctrine:"Direct contact · Directe betaling · 0 % commissie",
        card_hint:"Scan om mijn kaart te bewaren.",
        empty_t:"Geen klantgegevens",empty_d:"Voeg client.json toe naast de site."},
    ar:{whatsapp:"واتساب",call:"اتصال",directions:"الاتجاهات",share:"مشاركة",
        save:"احفظ في هاتفي",about:"من أنا",services:"الخدمات",gallery:"صور",
        proofs:"وثقوا بي",card:"بطاقتي DIGIYLYFE",contact:"تواصل معي",
        hours:"المواعيد",zone:"المنطقة",made_with:"حضور رقمي مع DIGIYLYFE",
        doctrine:"تواصل مباشر · دفع مباشر · 0٪ عمولة",
        card_hint:"امسح للاحتفاظ ببطاقتي في هاتفك.",
        empty_t:"لا توجد بيانات",empty_d:"أضف client.json بجانب الموقع."}
  };

  /* Accent par métier — 1 squelette, N expressions. Défaut = or DIGIYLYFE. */
  const SECTOR_ACCENT = {
    artisan:"#2E6E8E", plombier:"#2E6E8E", service:"#2E6E8E",
    commerce:"#B8541E", boutique:"#B8541E", market:"#B8541E",
    beaute:"#C0417A", nails:"#C0417A", salon:"#C0417A",
    resto:"#C4741A", restaurant:"#C4741A", hotel:"#7A5CA6", lieu:"#7A5CA6", tourisme:"#7A5CA6",
    chauffeur:"#1F7A5A", driver:"#1F7A5A", transport:"#1F7A5A",
    location:"#3E6D33", loc:"#3E6D33", consultant:"#4A4A55"
  };

  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };
  const RTL = new Set(["ar"]);

  let DATA = null;
  let LANG = "fr";
  let LANGS = ["fr"];

  /* pick() : champ multilingue. Chaîne => tel quel. Objet {fr,en,…} => langue courante, repli FR. */
  const pick = (f) => {
    if (f == null) return "";
    if (typeof f === "string") return f;
    if (typeof f === "object") return f[LANG] || f[DATA.meta?.lang_default || "fr"] || f.fr || Object.values(f)[0] || "";
    return String(f);
  };
  const t = (k) => (UI[LANG] || UI.fr)[k] || (UI.fr[k] || k);
  const has = (v) => v != null && (Array.isArray(v) ? v.length : String(v).trim().length);

  /* ---------- Chargement des données ---------- */
  async function load() {
    try {
      const res = await fetch("client.json", { cache: "no-store" });
      if (res.ok) return await res.json();
      throw new Error("fetch " + res.status);
    } catch (_) {
      const inline = $("#client-data");
      if (inline && inline.textContent.trim()) {
        try { return JSON.parse(inline.textContent); } catch (e) { /* tombe en erreur */ }
      }
      return null;
    }
  }

  /* ---------- Init ---------- */
  async function init() {
    DATA = await load();
    if (!DATA) return showEmpty();

    LANGS = (DATA.meta?.langs && DATA.meta.langs.length) ? DATA.meta.langs : ["fr"];
    const saved = localStorage.getItem("digiySiteLang");
    LANG = (saved && LANGS.includes(saved)) ? saved
         : (DATA.meta?.lang_default && LANGS.includes(DATA.meta.lang_default)) ? DATA.meta.lang_default
         : LANGS[0];

    applyAccent();
    buildLangSwitch();
    renderAll();
    injectSEO();
    injectManifest();
    reveal();
  }

  function applyAccent() {
    const a = DATA.meta?.accent
      || SECTOR_ACCENT[(DATA.meta?.sector || "").toLowerCase()]
      || getComputedStyle(document.documentElement).getPropertyValue("--dg-gold");
    document.documentElement.style.setProperty("--accent", a.trim());
  }

  /* ---------- Sélecteur de langue ---------- */
  function buildLangSwitch() {
    const wrap = $("#lang");
    wrap.innerHTML = "";
    if (LANGS.length < 2) return;
    LANGS.forEach((code) => {
      const b = el("button");
      b.textContent = code;
      b.setAttribute("aria-current", code === LANG ? "true" : "false");
      b.addEventListener("click", () => {
        LANG = code;
        localStorage.setItem("digiySiteLang", code);
        setDir();
        buildLangSwitch();
        renderAll();
        injectSEO();
      });
      wrap.appendChild(b);
    });
  }

  function setDir() {
    const rtl = RTL.has(LANG);
    document.documentElement.lang = LANG;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }

  /* ---------- Rendu global ---------- */
  function renderAll() {
    setDir();
    document.querySelectorAll("[data-ui]").forEach((n) => { n.textContent = t(n.dataset.ui); });
    renderIdentity();
    renderQuickContact();
    renderAbout();
    renderServices();
    renderGallery();
    renderProofs();
    renderCard();
    renderFinalContact();
  }

  /* 1 · IDENTITÉ */
  function renderIdentity() {
    const id = DATA.identity || {};
    $("#hero-eyebrow").textContent = [pick(id.activity), pick(id.zone)].filter(Boolean).join(" · ");
    $("#hero-name").textContent = id.brand || id.name || "";
    $("#hero-tagline").textContent = pick(id.tagline);

    const media = $("#hero-media");
    media.innerHTML = "";
    if (id.hero_video) {
      const v = el("video");
      v.src = id.hero_video; v.autoplay = v.muted = v.loop = v.playsInline = true;
      v.setAttribute("playsinline", ""); if (id.hero_image) v.poster = id.hero_image;
      media.appendChild(v);
    } else if (id.hero_image) {
      media.appendChild(picture(id.hero_image, id.hero_image_fallback, id.name || "", false));
    } else {
      media.style.background = "linear-gradient(140deg,var(--dg-dark),#1c211e)";
    }
  }

  /* 2 · CONTACT IMMÉDIAT */
  function renderQuickContact() {
    const c = DATA.contact || {};
    const box = $("#quickcontact");
    box.innerHTML = "";
    if (has(c.whatsapp)) box.appendChild(cbtn("wa", "💬", t("whatsapp"), waLink(c.whatsapp)));
    if (has(c.phone))    box.appendChild(cbtn("call", "📞", t("call"), "tel:" + tel(c.phone)));
    if (has(c.maps))     box.appendChild(cbtn("map", "📍", t("directions"), c.maps));
  }

  /* 3 · PRÉSENTATION */
  function renderAbout() {
    const txt = pick(DATA.about?.text);
    const sec = $("#about");
    if (!has(txt)) { sec.hidden = true; return; }
    sec.hidden = false;
    const box = $("#about-text"); box.innerHTML = "";
    String(txt).split(/\n{2,}|\n/).filter(Boolean).forEach((p) => {
      const el_ = el("p"); el_.textContent = p.trim(); box.appendChild(el_);
    });
  }

  /* 4 · SERVICES / PRODUITS */
  function renderServices() {
    const list = DATA.services || [];
    const sec = $("#services");
    if (!list.length) { sec.hidden = true; return; }
    sec.hidden = false;
    const grid = $("#services-grid"); grid.innerHTML = "";
    list.slice(0, 8).forEach((s) => {
      const card = el("div", "svc");
      const h = el("div", "svc__title"); h.textContent = pick(s.title); card.appendChild(h);
      if (has(s.desc)) { const d = el("div", "svc__desc"); d.textContent = pick(s.desc); card.appendChild(d); }
      if (has(s.price)) { const p = el("span", "svc__price"); p.textContent = pick(s.price); card.appendChild(p); }
      grid.appendChild(card);
    });
  }

  /* 5 · PHOTOS / VIDÉOS */
  function renderGallery() {
    const list = DATA.gallery || [];
    const sec = $("#gallery");
    if (!list.length) { sec.hidden = true; return; }
    sec.hidden = false;
    const grid = $("#gallery-grid"); grid.innerHTML = "";
    list.forEach((g) => {
      const b = el("button", "gallery__item");
      b.type = "button";
      b.setAttribute("aria-label", pick(g.alt) || "Photo");
      b.appendChild(picture(g.src, g.fallback, pick(g.alt), true));
      b.addEventListener("click", () => openLightbox(g.src, pick(g.alt)));
      grid.appendChild(b);
    });
  }

  /* 6 · PREUVES */
  function renderProofs() {
    const list = DATA.proofs || [];
    const sec = $("#proofs");
    if (!list.length) { sec.hidden = true; return; }
    sec.hidden = false;
    const grid = $("#proofs-grid"); grid.innerHTML = "";
    list.forEach((p) => {
      const isQuote = (p.type || "").toLowerCase() === "temoignage";
      const card = el("div", "proof" + (isQuote ? " proof--quote" : ""));
      if (has(p.image) && !isQuote) {
        const im = el("img", "proof__img"); im.src = p.image; im.alt = pick(p.text) || ""; im.loading = "lazy";
        card.appendChild(im);
      }
      const body = el("div");
      const tx = el("div", "proof__text"); tx.textContent = pick(p.text); body.appendChild(tx);
      if (has(p.author)) { const a = el("span", "proof__author"); a.textContent = "— " + pick(p.author); body.appendChild(a); }
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* 7 · CARTE DIGIYLYFE */
  function renderCard() {
    const card = DATA.card || {};
    const sec = $("#card");
    if (!has(card.image) && !has(card.qr)) { sec.hidden = true; return; }
    sec.hidden = false;
    const box = $("#card-inner"); box.innerHTML = "";

    if (has(card.image)) {
      const v = el("div", "card__visual");
      const a = card.digiylyfe_url ? el("a") : el("div");
      if (card.digiylyfe_url) { a.href = card.digiylyfe_url; a.target = "_blank"; a.rel = "noopener"; }
      const im = el("img"); im.src = card.image; im.alt = "Carte DIGIYLYFE"; im.loading = "lazy";
      a.appendChild(im); v.appendChild(a); box.appendChild(v);
    }

    const right = el("div", "card__qr");
    if (has(card.qr)) { const q = el("img"); q.src = card.qr; q.alt = "QR carte DIGIYLYFE"; q.loading = "lazy"; right.appendChild(q); }
    const hint = el("p", "card__hint"); hint.textContent = t("card_hint"); right.appendChild(hint);
    right.appendChild(cbtn("vcf", "📇", t("save"), "#", vcardHandler));
    box.appendChild(right);
  }

  /* 8 · CONTACT FINAL */
  function renderFinalContact() {
    const c = DATA.contact || {};
    const id = DATA.identity || {};
    const box = $("#finalcontact-inner"); box.innerHTML = "";
    const row = (ico, node) => { const r = el("div", "finalrow"); const i = el("span", "finalrow__ico"); i.textContent = ico; r.appendChild(i); r.appendChild(node); return r; };
    if (has(c.phone)) { const a = el("a"); a.href = "tel:" + tel(c.phone); a.textContent = c.phone; box.appendChild(row("📞", a)); }
    if (has(c.whatsapp)) { const a = el("a"); a.href = waLink(c.whatsapp); a.textContent = "WhatsApp"; box.appendChild(row("💬", a)); }
    if (has(id.zone)) { const s = el("span"); s.textContent = pick(id.zone); box.appendChild(row("📍", s)); }
    if (has(c.hours)) { const s = el("span"); s.textContent = pick(c.hours); box.appendChild(row("🕒", s)); }
    if (has(c.maps)) box.appendChild(cbtn("map", "🧭", t("directions"), c.maps));

    // Dock permanent
    const dock = $("#dock"); dock.innerHTML = "";
    if (has(c.whatsapp)) dock.appendChild(dockItem("💬", t("whatsapp"), waLink(c.whatsapp)));
    if (has(c.phone)) dock.appendChild(dockItem("📞", t("call"), "tel:" + tel(c.phone)));
    if (has(c.maps)) dock.appendChild(dockItem("📍", t("directions"), c.maps));
    dock.appendChild(dockItem("↗", t("share"), "#", shareHandler));
    dock.hidden = dock.children.length === 0;
  }

  /* ---------- Fabriques ---------- */
  function cbtn(kind, ico, label, href, onClick) {
    const a = el("a", "cbtn cbtn--" + kind);
    a.href = href || "#";
    if (kind === "wa" || kind === "map") { a.target = "_blank"; a.rel = "noopener"; }
    const i = el("span", "cbtn__ico"); i.textContent = ico;
    const s = el("span"); s.textContent = label;
    a.appendChild(i); a.appendChild(s);
    if (onClick) a.addEventListener("click", onClick);
    return a;
  }
  function dockItem(ico, label, href, onClick) {
    const a = el("a"); a.href = href || "#";
    if (href && href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
    const i = el("span", "dock__ico"); i.textContent = ico;
    const s = el("span"); s.textContent = label;
    a.appendChild(i); a.appendChild(s);
    if (onClick) a.addEventListener("click", onClick);
    return a;
  }
  function picture(src, fallback, alt, lazy) {
    if (fallback && /\.webp$/i.test(src)) {
      const pic = el("picture");
      const s = el("source"); s.type = "image/webp"; s.srcset = src; pic.appendChild(s);
      const img = el("img"); img.src = fallback; img.alt = alt || ""; if (lazy) img.loading = "lazy"; pic.appendChild(img);
      return pic;
    }
    const img = el("img"); img.src = src; img.alt = alt || ""; if (lazy) img.loading = "lazy"; return img;
  }

  /* ---------- Liens & utilitaires ---------- */
  const tel = (n) => String(n).replace(/[^\d+]/g, "");
  function waLink(n) {
    const num = String(n).replace(/[^\d]/g, "");
    const id = DATA.identity || {};
    const msg = "Bonjour " + (id.name || id.brand || "") + ", je vous contacte via votre page DIGIYLYFE.";
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
  }

  /* ---------- Partage ---------- */
  async function shareHandler(e) {
    e.preventDefault();
    const id = DATA.identity || {};
    const url = DATA.meta?.url || location.href;
    const title = id.brand || id.name || "DIGIYLYFE";
    const text = [title, pick(id.activity), pick(id.zone)].filter(Boolean).join(" · ");
    if (navigator.share) { try { await navigator.share({ title, text, url }); return; } catch (_) {} }
    window.open("https://wa.me/?text=" + encodeURIComponent(text + " " + url), "_blank", "noopener");
  }

  /* ---------- vCard (enregistrer dans le téléphone) ---------- */
  function vcardHandler(e) {
    e.preventDefault();
    const id = DATA.identity || {}, c = DATA.contact || {};
    const name = id.name || id.brand || "Contact";
    const lines = [
      "BEGIN:VCARD", "VERSION:3.0",
      "FN:" + name,
      id.brand ? "ORG:" + id.brand : "",
      pick(id.activity) ? "TITLE:" + pick(id.activity) : "",
      c.phone ? "TEL;TYPE=CELL:" + c.phone : "",
      c.whatsapp ? "TEL;TYPE=WhatsApp:" + c.whatsapp : "",
      pick(id.zone) ? "ADR;TYPE=WORK:;;" + pick(id.zone) + ";;;;" : "",
      DATA.meta?.url ? "URL:" + DATA.meta.url : "",
      "NOTE:Contact direct · 0% commission · DIGIYLYFE",
      "END:VCARD"
    ].filter(Boolean).join("\r\n");
    const blob = new Blob([lines], { type: "text/vcard" });
    const a = el("a"); a.href = URL.createObjectURL(blob);
    a.download = (id.brand || name).replace(/\s+/g, "-") + ".vcf";
    document.body.appendChild(a); a.click(); a.remove();
  }

  /* ---------- SEO local (JSON-LD + OG dynamiques côté navigateur) ---------- */
  function injectSEO() {
    const id = DATA.identity || {}, c = DATA.contact || {};
    const title = [id.brand || id.name, pick(id.activity), pick(id.zone)].filter(Boolean).join(" · ");
    document.title = title || "DIGIYLYFE";
    setMeta("description", pick(id.tagline) || t("doctrine"));
    setProp("og:title", title);
    setProp("og:description", pick(id.tagline) || t("doctrine"));
    if (id.hero_image) setProp("og:image", abs(id.hero_image_fallback || id.hero_image));
    setProp("og:url", DATA.meta?.url || location.href);

    const ld = {
      "@context": "https://schema.org", "@type": "LocalBusiness",
      name: id.brand || id.name, description: pick(id.tagline),
      areaServed: pick(id.zone), telephone: c.phone || undefined,
      url: DATA.meta?.url || location.href,
      image: id.hero_image ? abs(id.hero_image_fallback || id.hero_image) : undefined
    };
    let s = document.getElementById("ld-json");
    if (!s) { s = el("script"); s.id = "ld-json"; s.type = "application/ld+json"; document.head.appendChild(s); }
    s.textContent = JSON.stringify(ld);
  }
  const abs = (u) => (/^https?:/.test(u) ? u : new URL(u, location.href).href);
  function setMeta(name, val) { let m = document.querySelector('meta[name="' + name + '"]'); if (!m) { m = el("meta"); m.name = name; document.head.appendChild(m); } m.content = val; }
  function setProp(prop, val) { let m = document.querySelector('meta[property="' + prop + '"]'); if (!m) { m = el("meta"); m.setAttribute("property", prop); document.head.appendChild(m); } m.content = val; }

  /* ---------- Manifest dynamique (nom du pro à l'installation) ---------- */
  function injectManifest() {
    const id = DATA.identity || {};
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    const man = {
      name: id.brand || id.name || "DIGIYLYFE",
      short_name: (id.brand || id.name || "DIGIYLYFE").slice(0, 12),
      start_url: ".", display: "standalone",
      background_color: "#0D0F0E", theme_color: "#0D0F0E",
      icons: [{ src: "photos/icon-192.png", sizes: "192x192", type: "image/png" },
              { src: "photos/icon-512.png", sizes: "512x512", type: "image/png" }]
    };
    try {
      const blob = new Blob([JSON.stringify(man)], { type: "application/manifest+json" });
      const link = document.querySelector('link[rel="manifest"]');
      if (link) link.href = URL.createObjectURL(blob);
      let tm = document.querySelector('meta[name="theme-color"]'); if (tm) tm.content = "#0D0F0E";
    } catch (_) { /* garde le manifest statique */ }
  }

  /* ---------- Lightbox ---------- */
  function openLightbox(src, alt) {
    const lb = $("#lightbox"), img = $("#lightbox-img");
    img.src = src; img.alt = alt || ""; lb.hidden = false; document.body.style.overflow = "hidden";
  }
  function closeLightbox() { $("#lightbox").hidden = true; document.body.style.overflow = ""; }

  /* ---------- Reveal ---------- */
  function reveal() {
    const els = document.querySelectorAll("[data-reveal]");
    els.forEach((n) => n.classList.add("is-in"));
    const secs = document.querySelectorAll(".block, .quickcontact, .hero");
    if (!("IntersectionObserver" in window)) { secs.forEach((s) => s.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.setAttribute("data-reveal", ""); en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    secs.forEach((s) => io.observe(s));
  }

  /* ---------- État vide ---------- */
  function showEmpty() {
    const fb = $("#fallback");
    fb.hidden = false;
    fb.innerHTML = '<h2>' + t("empty_t") + '</h2><p>' + t("empty_d") + '</p>';
    document.querySelectorAll("main > section, .signature, .dock").forEach((n) => n.hidden = true);
  }

  /* ---------- Événements globaux ---------- */
  document.addEventListener("click", (e) => { if (e.target.id === "lightbox" || e.target.id === "lightbox-close") closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
