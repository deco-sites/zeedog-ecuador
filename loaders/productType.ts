import { AppContext } from "$apps/site.ts";
import { CMSProducType } from "site/sdk/types/product.ts";

export interface ProductTypeProps {
  productTypeContent?: CMSProducType[];
}

const loader = (
  props: ProductTypeProps,
  _req: Request,
  _ctx: AppContext,
): CMSProducType[] => {
  return props.productTypeContent || [];
};

export default loader;
