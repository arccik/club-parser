export default function displayPrice(price) {
  let result = price.split("-")[0].trim();
  if (result.includes("£")) return result;
  return `£${result}`;
}
