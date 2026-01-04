export const formatZAR = (amount: number): string =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatZARRange = (from: number | null, to: number | null): string => {
  if (from == null || to == null) return "Available on request";
  return `${formatZAR(from)} – ${formatZAR(to)}`;
};

export const formatPercentage = (value: number): string => `${value}%`;

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("en-ZA").format(value);
