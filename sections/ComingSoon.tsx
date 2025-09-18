import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  title: string;
  description?: string;
  position?: "flex-col" | "flex-col-reverse";
}

export default function ComingSoon(
  { title, description, position = "flex-col" }: Props,
) {
  return (
    <div
      class={`flex ${position} gap-6 items-center justify-center w-full h-dvh bg-black text-white px-6 font-futura`}
    >
      <Icon
        name={"ZeeDogHorizontalConnecting"}
        width={152}
        height={55}
        fill="#ffffff"
      />

      <div class="flex flex-col gap-2.5 items-center justify-center text-center w-full font-futura mt-8">
        <h1 class="block text-3xl font-bold">{title}</h1>
        {description && <span class="text-base lg:text-lg">{description}</span>}
      </div>
    </div>
  );
}