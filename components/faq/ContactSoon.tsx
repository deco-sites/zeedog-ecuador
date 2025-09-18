import LazyIcon from "$components/ui/LazyIcon.tsx";

interface ContactSoonTextsProps {
  title: string;
  description: string;
}

interface ContactSoonProps {
  texts: ContactSoonTextsProps;
}

export const ContactSoon = ({ texts }: ContactSoonProps) => {
  return (
    <div class="min-h-52 flex items-center justify-center mb-3 flex-col text-center">
      <p class="text-base text-blue-400 font-bold flex items-baseline">
        <LazyIcon
          name="Checked"
          class="mr-2.5 text-blue-400"
          width={20}
          height={20}
        />
        {texts.title}
      </p>
      <span class="text-gray-600 font-body-xs-regular">
        {texts.description}
      </span>
    </div>
  );
};
