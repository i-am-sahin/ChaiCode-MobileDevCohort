export function formatMoneyINR(value: number) {
  const safe = Number.isFinite(value) ? value : 0;
  return `₹ ${safe.toFixed(0)}`;
}

export function formatRating(rating: number) {
  const safe = Number.isFinite(rating) ? rating : 0;
  return safe.toFixed(1);
}
