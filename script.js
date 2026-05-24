const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const cookie = document.querySelector(".cookie");
const cookieButton = document.querySelector(".cookie button");
const form = document.querySelector(".contact-form");

menuButton?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
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

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = form.querySelector(".form-status");
  if (status) {
    status.textContent = "Заявка подготовлена. Для реальной отправки подключите обработчик формы.";
  }
  form.reset();
});
