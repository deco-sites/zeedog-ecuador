import { Sections } from "apps/website/pages/Page.tsx";

interface MultiPagesProps {
  sections: Sections;
}

export default function MultiPages({ sections }: MultiPagesProps) {
  return (
    <>
      {sections.map((section, idx) => {
        const { Component, props } = section;
        return <Component key={idx} {...props} />;
      })}
    </>
  );
}
