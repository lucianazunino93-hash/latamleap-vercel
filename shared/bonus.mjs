/** Inclusive through endsOn in the bonus timezone (default America/Chicago). No countdown. */
export function isBonusActive(bonus, now = new Date()) {
  if (!bonus || bonus.enabled !== true) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(bonus.endsOn || ""))) return false;
  const timeZone = typeof bonus.timezone === "string" && bonus.timezone ? bonus.timezone : "America/Chicago";
  let today;
  try {
    today = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  } catch {
    return false;
  }
  return today <= bonus.endsOn;
}
