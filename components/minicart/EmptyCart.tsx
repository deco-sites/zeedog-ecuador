import Icon from "$components/ui/Icon.tsx";

export interface EmptyCartProps {
  emptyBagText: string;
  continueShoppingText: string;
}

export default function EmptyCart(
  { emptyBagText, continueShoppingText }: EmptyCartProps,
) {
  return (
    <section class="flex flex-col items-center justify-between w-full h-[calc(100%_-_48px)]">
      <div class="flex flex-col items-center p-6 w-full h-full overflow-y-auto">
        <p class="font-body-sm-regular text-gray-700 text-center mb-5">
          {emptyBagText}
          <br />
          <b>
            {continueShoppingText}
          </b>
        </p>
        <div class="flex lg:flex-col flex-wrap items-center justify-center w-full lg:max-w-xs gap-2.5">
          <a
            href="/tutti-i-prodotti"
            class="flex items-center justify-center w-full max-w-[calc(50%_-_10px)] lg:max-w-full h-24 rounded-xl bg-gray-100 cursor-pointer"
          >
            <Icon name="ZeeDogVertical" width={60} height={50} />
          </a>
        </div>
      </div>
    </section>
  );
}
