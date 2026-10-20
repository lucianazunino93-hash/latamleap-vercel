if (location.pathname === "/en" || location.pathname.startsWith("/en/")) {
  document.documentElement.lang = "en";
  var message = document.querySelector("[data-nf='msg']");
  var home = document.querySelector("[data-nf='home']");
  if (message) message.textContent = "Page not found";
  if (home) {
    home.textContent = "Back to home";
    home.setAttribute("href", "/en");
  }
}
