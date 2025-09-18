import { ComponentChildren } from "preact";

interface CollapseProps {
  class?: string;
  children: ComponentChildren;
  cursorPointer?: boolean;
}

interface CollapseTitle extends CollapseProps {
  collapseIcon?: "plus" | "arrow";
}

export function Collapse(
  { class: className, children, cursorPointer = true }: CollapseProps,
) {
  return (
    <div class={`collapse ${className}`}>
      <input
        type="checkbox"
        class={`peer z-[1] ${cursorPointer ? "cursor-pointer" : ""}`}
      />
      {children}
    </div>
  );
}

export function CollapseTitle(
  { class: className, collapseIcon = "plus", children }: CollapseTitle,
) {
  return (
    <div
      class={`collapse-title collapse-icon ${
        collapseIcon === "plus" ? "collapse-plus" : "collapse-arrow"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CollapseContent({ class: className, children }: CollapseProps) {
  return (
    <div class={`collapse-content ${className}`}>
      {children}
    </div>
  );
}
