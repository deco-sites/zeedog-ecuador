import { BreadcrumbList } from "apps/commerce/types.ts";
import { clx } from "site/sdk/clx.ts";

export interface BreadcrumbProps {
  breadcrumb: BreadcrumbList;
  isPDP?: boolean;
}

const Breadcrumb = ({ breadcrumb, isPDP }: BreadcrumbProps) => {
  return (
    <div
      class={clx("w-full md:w-auto", !isPDP && "order-1 xl:order-2")}
      id="breadcrumbContainer"
    >
      <div
        class={clx(
          "w-full flex items-baseline gap-2 overflow-auto custom-scrollbar",
          isPDP && "px-6 lg:px-10 2xl:px-14",
        )}
      >
        <a
          href="/"
          class="font-body-2xs-regular lg:font-body-xs-regular text-gray-500 hover:underline"
        >
          Zee.Dog
        </a>
        {breadcrumb.itemListElement.map((item, index) => {
          // if (isPDP && index === breadcrumb.itemListElement.length - 1) return;

          return (
            <>
              <b>|</b>
              <a
                href={item.item.includes("/products")
                  ? item.item
                  : `/collections${item.item}`}
                class={clx(
                  index === breadcrumb.itemListElement.length - 1
                    ? "font-body-2xs-bold lg:font-body-xs-bold"
                    : "font-body-2xs-regular lg:font-body-xs-regular",
                  "text-gray-500 hover:underline whitespace-nowrap",
                )}
              >
                {item.name}
              </a>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
