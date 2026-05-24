const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const cookie = document.querySelector("[data-cookie]");
const cookieButton = document.querySelector("[data-cookie-button]");
const form = document.querySelector(".contact-form");

menuButton?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("is-open") ?? false;
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("[data-nav] a").forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

if (localStorage.getItem("gofropenzaCookieAccepted") === "true") {
  cookie?.classList.add("is-hidden");
}

cookieButton?.addEventListener("click", () => {
  localStorage.setItem("gofropenzaCookieAccepted", "true");
  cookie?.classList.add("is-hidden");
});

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = form.querySelector(".form-status");

  if (status) {
    status.textContent = "Заявка подготовлена. Для реальной отправки подключите обработчик формы.";
  }

  form.reset();
});
