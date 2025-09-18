import LazyIcon from "$components/ui/LazyIcon.tsx";

export default function Gotop({ goToTopText }: { goToTopText: string }) {
  return (
    <a
      href="#"
      class="animation-sticky-bottom absolute bottom-0 flex flex-col items-center justify-end w-20 h-10 bg-white/20 backdrop-blur-md border border-t-black border-b-white rounded-t-full z-50 transition-all"
    >
      <LazyIcon name="ArrowUp" width={20} height={20} />
      <span class="font-body-2xs-regular">{goToTopText}</span>
    </a>
  );
}
