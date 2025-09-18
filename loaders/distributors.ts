import { AppContext } from "$apps/site.ts";

/** @title {{ distributor }} */
export interface Distributor {
  region: string;
  country: string;
  distributor: string;
  contact: string;
}

export interface DistributorProps {
  distributors?: Distributor[];
}

const loader = (
  props: DistributorProps,
  _req: Request,
  _ctx: AppContext,
): Distributor[] => {
  return props.distributors || [];
};

export default loader;
