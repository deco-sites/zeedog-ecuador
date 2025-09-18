import Image from "apps/website/components/Image.tsx";
import { selectedBundleItems } from "$sdk/global/signalStore.ts";

export default function ProductBundleThumbs() {
  return (
    <div class="flex flex-wrap flex-row items-center justify-center gap-2.5 w-full">
      {selectedBundleItems.value && selectedBundleItems.value?.length > 0
        ? (
          selectedBundleItems.value.map((product, index) => (
            <a {...product.url !== "" ? { href: product.url } : ""}>
              <Image
                src={product.image as string}
                width={65}
                height={65}
                alt={`Producto sugerido | Imagen ${index}`}
                loading="lazy"
                decoding="async"
                class="rounded-md border border-gray-200"
              />
            </a>
          ))
        )
        : <p>No hay productos seleccionados</p>}
    </div>
  );
}
