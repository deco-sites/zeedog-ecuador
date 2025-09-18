import Icon from "$components/ui/Icon.tsx";
import { signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import InputWithButton from "$components/ui/InputWithButton.tsx";
import { formatPrice } from "$sdk/global/format.ts";
import { SelectedOptionContainer } from "$components/ui/SelectedOptionContainer.tsx";
import { invoke } from "site/runtime.ts";
import { useCart } from "zee/sdk/hooks/useCart.ts";

const inputCoupon = signal("");
const displayForm = signal(false);
const invalidCoupon = signal("");
const loading = signal(false);

const handleToggleDiscountForm = () => {
  displayForm.value = !displayForm.value;
};

const handleOnChangeCoupon = (e: any) => {
  if (!e) return;

  inputCoupon.value = e.target.value.trim();
};

export interface OrderDiscountsTextsProps {
  couponTitle: string;
  changeCouponText: string;
  invalidCouponErrorText: string;
  couponErrorText: string;
  addCouponText: string;
  addCouponButtonText: string;
  couponInputPlaceholder: string;
  cancelCouponText: string;
}

export interface OrderDiscountsProps {
  whereabout?: string;
  coupon: OrderDiscountsTextsProps;
}

export const OrderDiscounts = (
  { whereabout, coupon }: OrderDiscountsProps,
) => {
  const { cart, addCoupon } = useCart();
  const [couponError, setCouponError] = useState({ value: "" });

  useEffect(() => {
    if (couponError.value) {
      const timeout = setTimeout(() => {
        setCouponError({ value: "" });
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [couponError.value]);

  const couponCode = cart.value?.discountCodes[0]?.applicable
    ? cart.value?.discountCodes[0]?.code
    : "";

  const couponDiscount = cart.value?.lines?.nodes?.reduce(
    (total: number, line) => {
      const productDiscount = line?.discountAllocations?.reduce(
        (lineTotal: number, discount) => {
          if (
            discount && "discountedAmount" in discount &&
            discount.discountedAmount?.amount
          ) {
            const amount = parseFloat(discount.discountedAmount.amount);
            return lineTotal + (isNaN(amount) ? 0 : amount);
          }
          return lineTotal;
        },
        0,
      );

      return total + (productDiscount ?? 0);
    },
    0,
  );

  const hasSomeDiscount = couponCode || !!couponDiscount;

  const handleAddCoupon = async (e: any) => {
    e.preventDefault();
    const code = inputCoupon.value;

    if (!inputCoupon.value) return;

    try {
      loading.value = true;
      const data = await addCoupon({
        discountCodes: [code],
      });
      if (!data || !data.discountCodes[0].applicable) {
        couponError.value = coupon.invalidCouponErrorText;
        invalidCoupon.value = coupon.couponErrorText;
      } else {
        invalidCoupon.value = "";
        displayForm.value = false;
        cart.value = data;
      }
    } finally {
      loading.value = false;
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      loading.value = true;
      const data = await invoke.shopify.actions.cart.updateCoupons({
        discountCodes: [""],
      });
      inputCoupon.value = "";
      displayForm.value = false;
      cart.value = data;
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex flex-col gap-y-4">
      <div class="flex items-center justify-between">
        <h4 class="flex items-center gap-2 font-body-xs-bold text-gray-700">
          {whereabout !== "minicart" && (
            <Icon name="Coupon" class="w-6 h-6 -mt-0.5" />
          )}
          {coupon.couponTitle}
        </h4>
        {couponCode
          ? (
            <button
              onClick={handleRemoveCoupon}
              class="font-body-xs-regular text-gray-700 underline"
            >
              {coupon.changeCouponText}
            </button>
          )
          : (
            <button
              onClick={handleToggleDiscountForm}
              class="font-body-xs-regular text-gray-700 underline"
            >
              {displayForm.value
                ? coupon.cancelCouponText
                : coupon.addCouponText}
            </button>
          )}
      </div>

      <div
        class={`flex flex-col gap-y-1 ${
          displayForm.value ? "h-14 mt-0" : "h-0 -mt-4"
        } overflow-hidden transition-all`}
      >
        <form
          onSubmit={handleAddCoupon}
        >
          <InputWithButton
            id="coupon-input"
            name="coupon-code"
            type="text"
            value={inputCoupon.value}
            placeholder={coupon.couponInputPlaceholder}
            onChange={handleOnChangeCoupon}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
              }
            }}
            maxLength={20}
            disabled={false}
            buttonType="submit"
            buttonText={coupon.addCouponButtonText}
            buttonLoading={loading.value}
            buttonDisabled={inputCoupon.value.length === 0}
            errorStyle={`${
              invalidCoupon.value
                ? "border-red-300 has-[input:focus]:border-red-300"
                : ""
            }`}
          />
          {couponError.value && (
            <span class="flex justify-center items-center fixed w-full top-10 bg-red-300 size-14 text-black">
              {couponError.value}
            </span>
          )}
        </form>
      </div>
      {hasSomeDiscount && (
        <div class="flex flex-col gap-y-4">
          {couponCode && (
            <div class="flex items-center justify-between">
              <div class="flex gap-2 items-center">
                <span class="hidden sm:block font-body-2xs-regular text-gray-700">
                  {coupon.couponTitle}:
                </span>
                <SelectedOptionContainer
                  background={whereabout === "minicart" ? "white" : "gray-100"}
                  value={couponCode}
                  onRemove={handleRemoveCoupon}
                />
              </div>
              {!!couponDiscount && couponDiscount > 0 && (
                <span class="font-body-xs-regular text-blue-400">
                  - {formatPrice(couponDiscount)}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
