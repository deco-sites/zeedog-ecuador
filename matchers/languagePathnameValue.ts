import { type MatchContext } from "@deco/deco/blocks";
import { useLanguage } from "site/sdk/hooks/useLanguage.ts";

/**
 * @title {{{value}}}
 */
export interface Props {
  value: string;
}

/**
 * @title Language Pathname Value
 * @description Checks if the pathname value is equal to the value passed
 * @icon world-www
 */
const MatchCookieValue = (
  props: Props,
  { request }: MatchContext,
) => {
  const url = new URL(request.url);

  const { value } = props;
  const pathname = useLanguage(url);

  return pathname === value;
};

export default MatchCookieValue;
