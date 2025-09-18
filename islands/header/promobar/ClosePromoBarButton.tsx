import LazyIcon from "$components/ui/LazyIcon.tsx";

export default function ClosePromoBarButton({ fill }: { fill?: string }) {
  return (
    <button
      aria-label="Fechar Barra de Promoção"
      class="md:absolute right-0 p-3 md:p-5 h-full flex items-center justify-center z-30"
      onClick={(evt) =>
        evt.currentTarget.parentElement?.classList.add("hidden")}
      style={{ color: fill }}
    >
      <LazyIcon name="Close" width={20} height={20} />
    </button>
  );
}
