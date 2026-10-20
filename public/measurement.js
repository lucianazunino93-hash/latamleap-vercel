window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied"
});
gtag("consent", "update", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "granted"
});
gtag("js", new Date());
var node = document.querySelector("script[data-ga-id]");
if (node && node.dataset.gaId) gtag("config", node.dataset.gaId);
