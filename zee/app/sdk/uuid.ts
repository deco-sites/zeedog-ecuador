export const getUUID = () => {
  const uuid = globalThis?.crypto ? globalThis.crypto.randomUUID() : "";
  return uuid;
};
