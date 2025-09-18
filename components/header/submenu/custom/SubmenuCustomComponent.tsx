export type AvailableSubmenuComponents =
  | ""
  | "SubmenuZeeNow";

export interface Props {
  name?: AvailableSubmenuComponents;
}

export function SubmenuCustomComponent({ name = "" }: Props) {
  return <></>;
}
