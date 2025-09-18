import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

interface UpdateURLProps {
  currentURL: URL;
}

export default function UpdateURL({ currentURL }: UpdateURLProps) {
  useEffect(() => {
    if (IS_BROWSER) history.pushState(null, "", currentURL);
    globalThis.scroll({ top: 0, behavior: "smooth" });
  }, [currentURL]);

  return <></>;
}
