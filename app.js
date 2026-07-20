const WHATSAPP_NUMBER = "963994457082";


const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const whatsappBtn = document.getElementById("whatsappBtn");
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    const msg = 
    window.open(waLink(msg), "_blank");
  });
}

function loadProjectPage() {
  if (typeof PROJECTS === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;

  const projectType = document.getElementById("projectType");
  const titleAr = document.getElementById("projectTitleAr");
  const titleEn = document.getElementById("projectTitleEn");
  const locationAr = document.getElementById("projectLocationAr");
  const locationEn = document.getElementById("projectLocationEn");
  const projectYear = document.getElementById("projectYear");
  const descAr = document.getElementById("projectDescriptionAr");
  const descEn = document.getElementById("projectDescriptionEn");
  const gallery = document.getElementById("projectGallery");
  const btn = document.getElementById("similarProjectBtn");

  if (projectType) projectType.textContent = `${project.typeAr} | ${project.typeEn}`;
  if (titleAr) titleAr.textContent = project.titleAr;
  if (titleEn) titleEn.textContent = project.titleEn;
  if (locationAr) locationAr.textContent = project.locationAr;
  if (locationEn) locationEn.textContent = project.locationEn;
  if (projectYear) projectYear.textContent = project.year;
  if (descAr) descAr.textContent = project.descriptionAr;
  if (descEn) descEn.textContent = project.descriptionEn;

  if (gallery) {
    gallery.innerHTML = "";

    project.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = project.titleAr;
      gallery.appendChild(img);
    });
  }

  if (btn) {
    btn.addEventListener("click", () => {
      const msg = `مرحباً،
أرغب بالاستفسار عن مشروع مشابه لدى شركة البيان .

اسم المشروع:
${project.titleAr}

Project:
${project.titleEn}`;

      window.open(waLink(msg), "_blank");
    });
  }
}

function revealElements() {
  document.querySelectorAll(
    ".service, .equip, .project-card, .team-item, .manager-card, .executive-box"
  ).forEach(el => {
    el.classList.add("reveal-on-scroll");

    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

function animateCounters() {
  document.querySelectorAll(".numbers b, .team-item b").forEach(counter => {
    if (counter.dataset.done) return;

    const top = counter.getBoundingClientRect().top;
    if (top > window.innerHeight - 80) return;

    counter.dataset.done = "true";

    const originalText = counter.textContent.trim();
    const target = parseInt(originalText.replace(/\D/g, ""), 10);
    const hasPlus = originalText.includes("+");

    if (isNaN(target)) return;

    let current = 0;
    const duration = 1200;
    const stepTime = 20;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        counter.textContent = hasPlus ? `+${target}` : target;
        clearInterval(timer);
      } else {
        counter.textContent = hasPlus ? `+${Math.floor(current)}` : Math.floor(current);
      }
    }, stepTime);
  });
}

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <button class="lightbox-close">×</button>
  <img src="" alt="">
`;

document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const closeLightbox = lightbox.querySelector(".lightbox-close");

document.addEventListener("click", e => {
  if (e.target.matches(".project-execution-gallery img")) {
    lightboxImg.src = e.target.src;
    lightbox.classList.add("show");
  }
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

loadProjectPage();
function setupGalleryControls(){
  const gallery = document.getElementById("projectGallery");
  const prev = document.getElementById("galleryPrev");
  const next = document.getElementById("galleryNext");
  const counter = document.getElementById("galleryCounter");

  if(!gallery || !prev || !next || !counter) return;

  function updateCounter(){
    const total = gallery.querySelectorAll("img").length;
    if(total === 0) return;

    const index = Math.round(gallery.scrollLeft / gallery.clientWidth) + 1;
    counter.textContent = `${Math.min(index, total)} / ${total}`;
  }

  next.addEventListener("click", () => {
    gallery.scrollBy({ left: -gallery.clientWidth, behavior: "smooth" });
    setTimeout(updateCounter, 350);
  });

  prev.addEventListener("click", () => {
    gallery.scrollBy({ left: gallery.clientWidth, behavior: "smooth" });
    setTimeout(updateCounter, 350);
  });

  gallery.addEventListener("scroll", () => {
    clearTimeout(gallery._scrollTimer);
    gallery._scrollTimer = setTimeout(updateCounter, 120);
  });

  setTimeout(updateCounter, 300);
}

setupGalleryControls();
const openWhatsappModal = document.getElementById("openWhatsappModal");
const whatsappModal = document.getElementById("whatsappModal");
const closeWhatsappModal = document.getElementById("closeWhatsappModal");

if(openWhatsappModal && whatsappModal && closeWhatsappModal){
  openWhatsappModal.addEventListener("click", () => {
    whatsappModal.classList.add("show");
  });

  closeWhatsappModal.addEventListener("click", () => {
    whatsappModal.classList.remove("show");
  });

  whatsappModal.addEventListener("click", e => {
    if(e.target === whatsappModal){
      whatsappModal.classList.remove("show");
    }
  });
}

