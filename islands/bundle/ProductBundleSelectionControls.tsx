import { useEffect } from "preact/hooks";
import {
  bundleItems,
  selectedBundleItems,
} from "site/sdk/global/signalStore.ts";
import { BundleItem } from "site/sdk/types/product.ts";

export interface ProductBundleSelectionControlsProps {
  totalBundleItems: BundleItem[];
  preSelectedBundleItems: BundleItem[];
}

export default function ProductBundleSelectionControls(
  { totalBundleItems, preSelectedBundleItems }:
    ProductBundleSelectionControlsProps,
) {
  if (bundleItems.value?.length === 0 || !bundleItems.value) {
    bundleItems.value = totalBundleItems;
  }
  if (selectedBundleItems.value?.length === 0 || !selectedBundleItems.value) {
    selectedBundleItems.value = preSelectedBundleItems;
  }

  const resetCardsWarning = (bundleColumn: Element) => {
    const cardsWithWarning = bundleColumn.querySelectorAll(
      ".bundle__card--no-sku-selected",
    );
    if (cardsWithWarning && cardsWithWarning.length > 0) {
      cardsWithWarning.forEach((card) => {
        card.classList.remove("bundle__card--no-sku-selected");
      });
    }
  };

  const getBundleSkuSelection = (newCurrentActiveProduct: Element) => {
    const selectedSkuInput = newCurrentActiveProduct.querySelector(
      "input:checked",
    );
    return selectedSkuInput;
  };

  useEffect(() => {
    const bundleColumns = document.querySelectorAll(
      ".bundle-column",
    );

    const nextProduct = (
      columnIndex: number,
      bundleColumn: Element,
      bundleContainer: Element,
    ) => {
      const currentActiveProduct = bundleContainer.firstElementChild;
      let skuSelected: Element | null = null;
      if (currentActiveProduct) {
        bundleContainer?.appendChild(currentActiveProduct);
        const newCurrentActiveProduct = bundleContainer.firstElementChild;
        skuSelected = getBundleSkuSelection(newCurrentActiveProduct);
      }
      const newActiveProducID = bundleContainer.firstElementChild
        ?.getAttribute("data-product-id");

      const productInList = bundleItems.value?.find((item) =>
        item.productId === newActiveProducID
      );

      if (selectedBundleItems.value) {
        const newSelectedBundleItems = [...selectedBundleItems.value]; // Cria um novo array
        if (productInList) {
          newSelectedBundleItems[columnIndex] = {
            ...productInList,
            skuSelected: !!skuSelected,
          };
        }
        selectedBundleItems.value = newSelectedBundleItems; // Atribui o novo array ao signal
      }

      const newActiveProductIndex = bundleContainer.firstElementChild
        ?.getAttribute("data-index");
      const activeBullet = bundleColumn.querySelector(
        ".bundle__bullet--active",
      );
      if (activeBullet) {
        activeBullet.classList.remove("bundle__bullet--active");
      }
      const nextActiveBullet = bundleColumn.querySelector(
        `.bundle__bullet[data-index='${newActiveProductIndex}']`,
      );
      if (nextActiveBullet) {
        nextActiveBullet.classList.add("bundle__bullet--active");
      }
      resetCardsWarning(bundleColumn);
    };

    const prevProduct = (
      columnIndex: number,
      bundleColumn: Element,
      bundleContainer: Element,
    ) => {
      const lastProduct = bundleContainer.lastElementChild;
      let skuSelected: Element | null = null;
      if (lastProduct) {
        bundleContainer?.prepend(lastProduct);
        const newCurrentActiveProduct = bundleContainer.firstElementChild;
        if (newCurrentActiveProduct) {
          skuSelected = getBundleSkuSelection(
            newCurrentActiveProduct,
          );
        }
      }

      const newActiveProducID = bundleContainer.firstElementChild
        ?.getAttribute("data-product-id");

      const productInList = bundleItems.value?.find((item) =>
        item.productId === newActiveProducID
      );

      if (selectedBundleItems.value) {
        const newSelectedBundleItems = [...selectedBundleItems.value]; // Cria um novo array
        if (productInList) {
          newSelectedBundleItems[columnIndex] = {
            ...productInList,
            skuSelected: !!skuSelected,
          };
        }
        selectedBundleItems.value = newSelectedBundleItems; // Atribui o novo array ao signal
      }

      const newActiveProductIndex = bundleContainer.firstElementChild
        ?.getAttribute("data-index");
      const activeBullet = bundleColumn.querySelector(
        ".bundle__bullet--active",
      );
      if (activeBullet) {
        activeBullet.classList.remove("bundle__bullet--active");
      }
      const nextActiveBullet = bundleColumn.querySelector(
        `.bundle__bullet[data-index='${newActiveProductIndex}']`,
      );
      if (nextActiveBullet) {
        nextActiveBullet.classList.add("bundle__bullet--active");
      }
      resetCardsWarning(bundleColumn);
    };

    if (
      bundleColumns && bundleColumns.length > 0
    ) {
      bundleColumns.forEach((bundleColumn, index) => {
        const bundleContainer = bundleColumn.querySelector(
          ".bundle-column__container",
        );
        if (!bundleContainer) return;
        const nextButton = bundleColumn.querySelector(
          ".bundle__button--next",
        );
        const prevButton = bundleColumn.querySelector(
          ".bundle__button--prev",
        );

        // esse index serve pra saber qual coluna estamos lidando, uma vez que a troca entre os produtos deve alterar somente o produto da coluna em questão, por exemplo, o usuário pode colocar o mesmo produto na coluna 1 e 2, mas ao clicar no botão de next da coluna 1, somente o produto da coluna 1 deve ser alterado, assim como o signal que armazena os produtos selecionados
        const handleNext = () =>
          nextProduct(index + 1, bundleColumn, bundleContainer);
        const handlePrev = () =>
          prevProduct(index + 1, bundleColumn, bundleContainer);

        nextButton?.addEventListener("click", handleNext);
        prevButton?.addEventListener("click", handlePrev);

        return () => {
          nextButton?.removeEventListener("click", handleNext);
          prevButton?.removeEventListener("click", handlePrev);
        };
      });
    }
  }, []);

  return <></>;
}
