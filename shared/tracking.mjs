const escape = value => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export function trackingHead(seo = {}) {
  const tags = [];
  const google = String(seo.googleSiteVerification || "").trim();
  const pixel = String(seo.metaPixelId || "").trim();
  if (google) tags.push(`<meta name="google-site-verification" content="${escape(google)}" />`);
  if (/^[0-9]+$/.test(pixel)) tags.push(`<script id="meta-pixel">!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');</script>`);
  return tags.join("");
}
