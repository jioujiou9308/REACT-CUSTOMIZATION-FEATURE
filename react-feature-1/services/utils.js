// Trim string values inside an object/array. Useful before sending payloads.
export function trimStringValuesFromObject(value) {
  if (Array.isArray(value)) return value.map(trimStringValuesFromObject);
  if (value && typeof value === "object") {
    return Object.entries(value).reduce((acc, [key, val]) => {
      acc[key] = trimStringValuesFromObject(val);
      return acc;
    }, Array.isArray(value) ? [] : {});
  }
  if (typeof value === "string") return value.trim();
  return value;
}

// Stringify safely without throwing on circular data.
export function safeStringify(value) {
  try {
    if (typeof value === "string") return value;
    return JSON.stringify(value);
  } catch (err) {
    return "[unserializable]";
  }
}
