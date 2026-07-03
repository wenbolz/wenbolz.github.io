const state = {
  lang: "en",
  content: null,
  publications: [],
  gallery: [],
  lightboxIndex: null,
  observer: null,
};

const nodes = {
  navLinks: document.querySelector("#nav-links"),
  hero: document.querySelector("#hero"),
  research: document.querySelector("#research"),
  about: document.querySelector("#about"),
  publications: document.querySelector("#publications"),
  gallery: document.querySelector("#gallery"),
  contact: document.querySelector("#contact"),
  footer: document.querySelector("#footer"),
  brandName: document.querySelector("#brand-name"),
  brandRole: document.querySelector("#brand-role"),
  metaDescription: document.querySelector('meta[name="description"]'),
  lightbox: document.querySelector("#lightbox"),
  lightboxImage: document.querySelector("#lightbox-image"),
  lightboxCaption: document.querySelector("#lightbox-caption"),
  lightboxClose: document.querySelector("#lightbox-close"),
  lightboxPrev: document.querySelector("#lightbox-prev"),
  lightboxNext: document.querySelector("#lightbox-next"),
  langButtons: Array.from(document.querySelectorAll(".lang-button")),
};

function t(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[state.lang] ?? value.zh ?? value.en ?? "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderNav() {
  const labels = state.content.labels.nav;
  nodes.navLinks.innerHTML = [
    ["research", labels.research],
    ["about", labels.about],
    ["publications", labels.publications],
    ["gallery", labels.gallery],
    ["contact", labels.contact],
  ]
    .map(
      ([id, label]) =>
        `<a href="#${id}">${escapeHtml(t(label))}</a>`,
    )
    .join("");
}

function renderHeader() {
  nodes.brandName.textContent = t(state.content.person.name);
  nodes.brandRole.textContent = t(state.content.person.role);
}

function renderHero() {
  const person = state.content.person;
  const labels = state.content.labels.hero;

  nodes.hero.innerHTML = `
    <article class="hero-copy" data-reveal>
      <span class="eyebrow">${escapeHtml(t(labels.eyebrow))}</span>
      <h1 class="hero-title">${escapeHtml(t(person.name))}</h1>
      <p class="hero-role">${escapeHtml(t(person.role))}</p>
      <p class="hero-affiliation">${escapeHtml(t(person.affiliation))}</p>
      <p class="hero-intro">${escapeHtml(t(person.heroIntro))}</p>
      <div class="chip-row">
        ${person.highlights
          .map((item) => `<span class="chip">${escapeHtml(t(item))}</span>`)
          .join("")}
      </div>
      <div class="hero-actions">
        <a class="button button-primary" href="#publications">${escapeHtml(
          t(labels.primaryCta),
        )}</a>
        <a class="button button-secondary" href="mailto:${escapeHtml(
          person.email,
        )}">${escapeHtml(t(labels.secondaryCta))}</a>
      </div>
      <div class="hero-stats">
        ${person.stats
          .map(
            (item) => `
              <div class="stat-card">
                <strong>${escapeHtml(item.value)}</strong>
                <span>${escapeHtml(t(item.label))}</span>
              </div>
            `,
          )
          .join("")}
      </div>
    </article>

    <aside class="hero-card" data-reveal>
      <div class="portrait-frame">
        <img src="${escapeHtml(person.avatar)}" alt="${escapeHtml(
          t(person.name),
        )}" />
      </div>
      <div class="portrait-note">
        <strong>${escapeHtml(t(labels.cardTitle))}</strong>
        <p>${escapeHtml(t(person.heroCardNote))}</p>
      </div>
    </aside>
  `;
}

function renderResearch() {
  const section = state.content.labels.sections.research;
  const cards = state.content.person.researchAreas;

  nodes.research.innerHTML = `
    <div class="section-head" data-reveal>
      <div>
        <span class="eyebrow">${escapeHtml(t(section.eyebrow))}</span>
        <h2>${escapeHtml(t(section.title))}</h2>
      </div>
      <p>${escapeHtml(t(section.intro))}</p>
    </div>
    <div class="focus-grid">
      ${cards
        .map(
          (card, index) => `
            <article class="focus-card" data-reveal>
              <span>0${index + 1}</span>
              <h3>${escapeHtml(t(card.title))}</h3>
              <p>${escapeHtml(t(card.body))}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderAbout() {
  const section = state.content.labels.sections.about;
  const about = state.content.person.about;

  nodes.about.innerHTML = `
    <div class="section-head" data-reveal>
      <div>
        <span class="eyebrow">${escapeHtml(t(section.eyebrow))}</span>
        <h2>${escapeHtml(t(section.title))}</h2>
      </div>
      <p>${escapeHtml(t(section.intro))}</p>
    </div>
    <div class="about-layout">
      <aside class="about-panel" data-reveal>
        <h3>${escapeHtml(t(section.sideTitle))}</h3>
        <p>${escapeHtml(t(section.sideText))}</p>
      </aside>
      <div class="about-richtext" data-reveal>
        <p>${escapeHtml(t(about))}</p>
      </div>
    </div>
  `;
}

function renderPublications() {
  const section = state.content.labels.sections.publications;
  const list = [...state.publications].sort((a, b) => b.year - a.year);

  nodes.publications.innerHTML = `
    <div class="section-head" data-reveal>
      <div>
        <span class="eyebrow">${escapeHtml(t(section.eyebrow))}</span>
        <h2>${escapeHtml(t(section.title))}</h2>
      </div>
      <p>${escapeHtml(t(section.intro))}</p>
    </div>
    <div class="publication-list">
      ${list
        .map(
          (paper) => `
            <article class="publication-card" data-reveal>
              <div class="publication-year">${escapeHtml(String(paper.year))}</div>
              <div class="publication-body">
                <h3>${escapeHtml(paper.title)}</h3>
                <div class="publication-meta">
                  <span>${escapeHtml(paper.source || "Research Publication")}</span>
                </div>
              </div>
              <a class="publication-link" href="${escapeHtml(
                paper.url,
              )}" target="_blank" rel="noopener noreferrer">${escapeHtml(
                t(section.openLabel),
              )}</a>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderGallery() {
  const section = state.content.labels.sections.gallery;

  nodes.gallery.innerHTML = `
    <div class="section-head" data-reveal>
      <div>
        <span class="eyebrow">${escapeHtml(t(section.eyebrow))}</span>
        <h2>${escapeHtml(t(section.title))}</h2>
      </div>
      <p>${escapeHtml(t(section.intro))}</p>
    </div>
    <div class="gallery-grid">
      ${state.gallery
        .map(
          (photo, index) => `
            <figure class="gallery-card" data-reveal data-index="${index}" tabindex="0" role="button" aria-label="${escapeHtml(
              t(photo.caption),
            )}">
              <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(
                t(photo.caption),
              )}" loading="lazy" />
              <figcaption>
                <span>${escapeHtml(t(photo.caption))}</span>
                <span>${String(index + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderContact() {
  const section = state.content.labels.sections.contact;

  nodes.contact.innerHTML = `
    <div class="contact-card" data-reveal>
      <div class="contact-copy">
        <span class="eyebrow">${escapeHtml(t(section.eyebrow))}</span>
        <h3>${escapeHtml(t(section.title))}</h3>
        <p>${escapeHtml(t(section.intro))}</p>
      </div>
      <div class="contact-actions">
        <a class="button button-primary" href="mailto:${escapeHtml(
          state.content.person.email,
        )}">${escapeHtml(state.content.person.email)}</a>
        <a class="button button-secondary" href="#gallery">${escapeHtml(
          t(section.secondaryCta),
        )}</a>
      </div>
    </div>
  `;
}

function renderFooter() {
  const footer = state.content.labels.sections.footer;
  const person = state.content.person;
  const visitor = state.content.visitorCounter;
  const maintainNote = t(footer.maintainNote);

  nodes.footer.innerHTML = `
    <div class="footer-wrap">
      <div class="footer-card" data-reveal>
        <div class="footer-top">
          <div class="footer-brand">
            <h3>${escapeHtml(t(person.name))}</h3>
            <p>${escapeHtml(t(person.role))}</p>
          </div>
          <div class="footer-counter">
            <small>${escapeHtml(t(footer.counterLabel))}</small>
            <a href="${escapeHtml(visitor.historyUrl)}" target="_blank" rel="noopener noreferrer">
              <img src="${escapeHtml(visitor.badgeUrl)}" alt="${escapeHtml(
                t(footer.counterAlt),
              )}" loading="lazy" />
            </a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${escapeHtml(
            t(person.name),
          )} · ${escapeHtml(t(footer.rights))}</span>
          ${maintainNote ? `<span>${escapeHtml(maintainNote)}</span>` : ""}
        </div>
      </div>
    </div>
  `;
}

function setupLangSwitch() {
  nodes.langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
    button.onclick = () => {
      state.lang = button.dataset.lang;
      localStorage.setItem("wenbo-home-lang", state.lang);
      render();
    };
  });
}

function openLightbox(index) {
  state.lightboxIndex = index;
  const photo = state.gallery[index];
  nodes.lightboxImage.src = photo.src;
  nodes.lightboxImage.alt = t(photo.caption);
  nodes.lightboxCaption.textContent = t(photo.caption);
  nodes.lightbox.hidden = false;
  document.body.classList.add("is-locked");
}

function closeLightbox() {
  state.lightboxIndex = null;
  nodes.lightbox.hidden = true;
  document.body.classList.remove("is-locked");
}

function moveLightbox(direction) {
  if (state.lightboxIndex == null) return;
  const total = state.gallery.length;
  const nextIndex = (state.lightboxIndex + direction + total) % total;
  openLightbox(nextIndex);
}

function bindGalleryEvents() {
  document.querySelectorAll(".gallery-card").forEach((card) => {
    const open = () => openLightbox(Number(card.dataset.index));
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function setupLightbox() {
  nodes.lightboxClose.onclick = closeLightbox;
  nodes.lightboxPrev.onclick = () => moveLightbox(-1);
  nodes.lightboxNext.onclick = () => moveLightbox(1);
  nodes.lightbox.addEventListener("click", (event) => {
    if (event.target === nodes.lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (nodes.lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });
}

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-reveal]").forEach((node) => {
      node.classList.add("is-visible");
    });
    return;
  }

  if (state.observer) {
    state.observer.disconnect();
  }

  state.observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          state.observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  document.querySelectorAll("[data-reveal]").forEach((node) => {
    state.observer.observe(node);
  });
}

function render() {
  const site = state.content.site;
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.title = t(site.title);
  nodes.metaDescription.setAttribute("content", t(site.description));
  renderHeader();
  renderNav();
  renderHero();
  renderResearch();
  renderAbout();
  renderPublications();
  renderGallery();
  renderContact();
  renderFooter();
  setupLangSwitch();
  bindGalleryEvents();
  setupReveal();
}

async function init() {
  const [content, publications, gallery] = await Promise.all([
    fetch("data/site-content.json").then((response) => response.json()),
    fetch("data/publications.json").then((response) => response.json()),
    fetch("data/gallery.json").then((response) => response.json()),
  ]);

  state.content = content;
  state.publications = publications.papers;
  state.gallery = gallery.photos;
  render();
  setupLightbox();
}

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = `
    <main class="shell" style="padding: 4rem 0;">
      <h1 style="font-family: var(--font-display); font-size: 3rem;">页面加载失败</h1>
      <p>请确认使用本地 HTTP 服务或 GitHub Pages 访问本站，而不是直接打开 file:// 文件。</p>
    </main>
  `;
});
