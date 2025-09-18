import LazyIcon from "$components/ui/LazyIcon.tsx";

interface TagItemProps {
  talkToUsText: string;
}

export const TagItem = ({ talkToUsText }: TagItemProps) => {
  return (
    <div class="border border-gray-200 items-center justify-center flex rounded-b-3xl bg-white font-body-2xs-bold w-52 py-4 max-h-12 absolute bottom-0 translate-y-full left-2/4 -translate-x-2/4">
      <LazyIcon
        name="ArrowDown"
        width={26}
        height={14}
        class="mr-2"
      />
      {talkToUsText}
    </div>
  );
};
