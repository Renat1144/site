const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelectorAll("[data-nav] a");
const cookie = document.querySelector("[data-cookie]");
const cookieButton = document.querySelector("[data-cookie-button]");
const form = document.querySelector(".contact-form");
const floatingCta = document.querySelector(".floating-cta");
const countItems = document.querySelectorAll("[data-count]");
const aboutVideo = document.querySelector("[data-about-video]");
const aboutVideoPlay = document.querySelector("[data-about-video-play]");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);
window.addEventListener("pageshow", () => {
  window.requestAnimationFrame(() => window.scrollTo(0, 0));
});

const products = {
  boxes: {
    image: "15.png",
    alt: "Гофрокороба",
    tag: "Для хранения и доставки",
    title: "Гофрокороба",
    text: "Четырёхклапанные и самосборные коробки для маркетплейсов, розницы, склада и регулярных поставок.",
    list: ["FEFCO 0201, 0427, 0421", "Печать, ручки, отверстия, перфорация", "Бурый или белёный лицевой слой"]
  },
  cardboard: {
    image: "13.png",
    alt: "Листовой гофрокартон",
    tag: "Для защиты и комплектации",
    title: "Листовой гофрокартон",
    text: "Трёхслойный и пятислойный листовой материал для упаковки, прокладок, вкладышей и защитных элементов.",
    list: ["Марки Т21-Т27 и П31-П34", "Профили B, C, BC", "Листы популярных форматов"]
  },
  zcard: {
    image: "18.png",
    alt: "Z-картон",
    tag: "Для нестандартных изделий",
    title: "Z-картон",
    text: "Бесконечный гофрокартон для гибкой упаковки длинномерных и нестандартных товаров.",
    list: ["Ширина Z ф.1100-2200", "Два и три слоя", "Печать до 2 цветов"]
  },
  cut: {
    image: "17.png",
    alt: "Сложная высечка",
    tag: "Для витрины и точной фиксации",
    title: "Сложная высечка",
    text: "Лотки, решётки, вкладыши и индивидуальные конструкции под размеры продукта и требования выкладки.",
    list: ["Индивидуальная конструкция", "Точная геометрия", "Подготовка к серии"]
  },
  support: {
    image: "20.png",
    alt: "Вспомогательная упаковка",
    tag: "Для комплектации и защиты",
    title: "Вспомогательная упаковка",
    text: "Прокладки, вкладыши, перегородки и элементы фиксации, которые помогают довести товар до клиента без повреждений.",
    list: ["Защита внутри коробки", "Разделение и фиксация товара", "Подготовка под регулярные поставки"]
  }
};

menuButton?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("is-open") ?? false;
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
  floatingCta?.classList.toggle("is-visible", window.scrollY > 520);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (localStorage.getItem("gofropenzaCookieAccepted") === "true") {
  cookie?.classList.add("is-hidden");
}

cookieButton?.addEventListener("click", () => {
  localStorage.setItem("gofropenzaCookieAccepted", "true");
  cookie?.classList.add("is-hidden");
});

const revealItems = document.querySelectorAll(".reveal");

const animateCount = (item) => {
  if (item.dataset.done === "true") return;
  item.dataset.done = "true";
  const target = Number(item.dataset.count);
  const duration = 1100;
  const start = performance.now();

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const suffix = item.dataset.suffix ?? (target >= 50 ? "+" : "");
    item.textContent = Math.round(target * eased).toString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  countItems.forEach((item) => countObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  countItems.forEach(animateCount);
}

const productTabs = Array.from(document.querySelectorAll("[data-product-tab]"));
let productSliderTimer;

const setProduct = (button) => {
    const key = button.dataset.productTab;
    const product = products[key];
    const stage = document.querySelector(".product-stage");
    if (!product || !stage) return;

    productTabs.forEach((tab) => tab.classList.toggle("is-active", tab === button));
    stage.classList.add("is-changing");

    window.setTimeout(() => {
      const image = document.querySelector("[data-product-image]");
      const tag = document.querySelector("[data-product-tag]");
      const title = document.querySelector("[data-product-title]");
      const text = document.querySelector("[data-product-text]");
      const list = document.querySelector("[data-product-list]");

      if (image) {
        image.src = product.image;
        image.alt = product.alt;
      }
      if (tag) tag.textContent = product.tag;
      if (title) title.textContent = product.title;
      if (text) text.textContent = product.text;
      if (list) list.innerHTML = product.list.map((item) => `<li>${item}</li>`).join("");

      stage.classList.remove("is-changing");
    }, 180);
};

const startProductSlider = () => {
  if (productSliderTimer || productTabs.length < 2) return;
  productSliderTimer = window.setInterval(() => {
    const activeIndex = Math.max(0, productTabs.findIndex((tab) => tab.classList.contains("is-active")));
    const next = productTabs[(activeIndex + 1) % productTabs.length];
    setProduct(next);
  }, 5200);
};

const resetProductSlider = () => {
  window.clearInterval(productSliderTimer);
  productSliderTimer = undefined;
  startProductSlider();
};

productTabs.forEach((button) => {
  button.addEventListener("click", () => {
    setProduct(button);
    resetProductSlider();
  });
});

startProductSlider();

aboutVideoPlay?.addEventListener("click", () => {
  aboutVideo?.play();
});

aboutVideo?.addEventListener("play", () => {
  aboutVideo.closest(".about-video")?.classList.add("is-playing");
});

aboutVideo?.addEventListener("pause", () => {
  aboutVideo.closest(".about-video")?.classList.remove("is-playing");
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = form.querySelector(".form-status");

  if (status) {
    status.textContent = "Заявка подготовлена. Для реальной отправки подключите обработчик формы.";
  }

  form.reset();
});
