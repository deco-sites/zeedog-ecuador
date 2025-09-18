export const encodeBase64 = (data: any) => {
  if (globalThis?.window && data) {
    return globalThis?.window.btoa(data);
  }
  return "";
};

export const decodeBase64 = (data: any) => {
  if (globalThis?.window && data) {
    return globalThis?.window.atob(data);
  }
  return "";
};
