import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";
import { AnalyticsEvent } from "apps/commerce/types.ts";
import { sendEvent } from "site/sdk/analytics.tsx";

interface Props {
  event: AnalyticsEvent;
  clickId?: string;
}

export default function AnalyticsIsland({ event, clickId }: Props) {
  if (!IS_BROWSER) return <></>;

  useEffect(() => {
    if (clickId) {
      const element = document.getElementById(clickId);
      if (element) {
        element.addEventListener("click", () => {
          sendEvent(event);
        });
      }
    } else {
      sendEvent(event);
    }
  }, []);

  return <></>;
}
