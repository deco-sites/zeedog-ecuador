import { RichText } from "apps/admin/widgets.ts";

interface Props {
  title?: string;
  htmlContent?: RichText;
}

export default function AboutUs({ title, htmlContent: html }: Props) {
  if (!html) return null;

  return (
    <div class="flex flex-col gap-6 lg:gap-10 items-center justify-center container max-w-3xl mx-auto px-4 py-8">
      <h1 class="font-bold text-2xl text-center">
        {title || "Connecting Dogs and People"}
      </h1>

      <div
        class="formatted-html"
        dangerouslySetInnerHTML={{
          __html: html.replace(/\s{2,}|\n/g, "<br>"),
        }}
      />
    </div>
  );
}
