interface DeviceData {
  os: string;
  browser: string;
}

export const getOS = (userAgent: string): string => {
  let os = "No OS detection";
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    os = "iOS";
  } else if (/Android/i.test(userAgent)) {
    os = "Android";
  } else if (/Macintosh/i.test(userAgent)) {
    os = "Mac OS";
  } else if (/Windows/i.test(userAgent)) {
    os = "Windows";
  } else if (/Linux/i.test(userAgent)) {
    os = "Linux";
  }
  return os;
};

const getBrowser = (userAgent: string): string => {
  let browser = "No browser detection";
  if (userAgent.indexOf("edge") > -1) {
    browser = "MS Edge";
  } else if (userAgent.indexOf("edg/") > -1) {
    browser = "Edge (chromium based)";
  } else if (userAgent.indexOf("chrome") > -1) {
    browser = "Chrome";
  } else if (userAgent.indexOf("firefox") > -1) {
    browser = "Mozilla Firefox";
  } else if (userAgent.indexOf("safari") > -1) {
    browser = "Safari";
  }
  return browser;
};

// server: req.headers.get("user-agent")
// client: navigator.userAgent
const getDeviceData = (userAgent: string): DeviceData => {
  const os = getOS(userAgent.toLowerCase());
  const browser = getBrowser(userAgent.toLowerCase());
  return {
    os,
    browser,
  };
};

export default getDeviceData;
