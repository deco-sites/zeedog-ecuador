import Image from "apps/website/components/Image.tsx";
import RemoveProduct, {
  RemoveProductTexts,
} from "$islands/bag/RemoveProduct.tsx";
import { formatPrice } from "$sdk/global/format.ts";
import { MinicartProduct } from "$sdk/types/order.ts";
import { RichText } from "apps/admin/widgets.ts";

interface ModalConfirmDeleteProductProps {
  product: MinicartProduct;
  deleteProductText: RichText;
  productCartTexts: RemoveProductTexts;
}

export const ModalConfirmDeleteProduct = (
  { product, deleteProductText, productCartTexts }:
    ModalConfirmDeleteProductProps,
) => {
  const mainImage = (product.thumb && product.thumb) || product.images?.[0] ||
    "";

  return (
    <div class="flex flex-col w-full h-full bg-white rounded-lg gap-8 items-center pt-12">
      <div
        class="font-body-xs-regular text-center px-4"
        dangerouslySetInnerHTML={{ __html: deleteProductText }}
      />

      <div class="flex gap-4 px-8">
        <Image
          src={mainImage}
          alt={product.name}
          style={{ aspectRatio: "1 / 1" }}
          width={80}
          height={80}
          class="h-28 w-28 object-cover rounded overflow-hidden shrink-0"
          decoding="async"
          fetchPriority="auto"
          loading="lazy"
        />

        <div class="flex flex-col justify-between w-72">
          <p class="font-body-xs-regular">
            {product.name}
          </p>
          <div class="flex flex-col">
            {product.unit_discount_price && (
              <p
                class={`${
                  product.unit_discount_price
                    ? "font-body-xs-bold"
                    : "font-body-xs-regular"
                }`}
              >
                {product.unit_sale_price !== product.unit_discount_price
                  ? formatPrice(product.unit_discount_price)
                  : formatPrice(product.unit_sale_price)}
              </p>
            )}
            <p
              class={` ${
                product.unit_discount_price
                  ? "line-through font-body-xs-regular"
                  : "font-body-xs-bold"
              }`}
            >
              {formatPrice(
                product.unit_sale_price !== product.unit_discount_price
                  ? product.unit_sale_price
                  : undefined,
              )}
            </p>
          </div>
        </div>
      </div>

      <RemoveProduct
        skud_id={String(product.product_id!)}
        productCartTexts={productCartTexts}
      />
    </div>
  );
};
