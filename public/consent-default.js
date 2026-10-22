window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  wait_for_update: 500
});
try {
  var saved = localStorage.getItem("latamleap.consent");
  if (saved === "granted" || saved === "denied") document.documentElement.setAttribute("data-consent", saved);
} catch (error) {}
