import { getUserCookie } from "apps/shopify/utils/user.ts";
import { AppContext } from "site/apps/deco/shopify.ts";

const loader = (
  _props: null,
  req: Request,
  _ctx: AppContext,
): boolean => {
  const customerAccessToken = getUserCookie(req.headers);

  return !!customerAccessToken;
};

export default loader;
