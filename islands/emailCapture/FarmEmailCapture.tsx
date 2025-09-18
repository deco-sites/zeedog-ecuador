import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import { isValidEmail } from "site/sdk/validateInputs.ts";
import {
  //   FarmDex,
  //   FarmDexInterface,
  formatDate,
  //   useSalesforce,
} from "zee/sdk/hooks/useSalesforce.ts";
import { useToast } from "$sdk/hooks/useToast.ts";

export default function FarmEmailCapture(
  { device }: { device: "mobile" | "desktop" },
) {
  const email = useSignal("");

  const placeholder = device === "mobile"
    ? "Insira seu e-mail"
    : "Deixe seu e-mail e seja o primeiro a saber";

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (email.value !== "" && isValidEmail(email.value)) {
      //   const emailLowerCase = email.value.toLowerCase();

      //   const salesforceProps: FarmDexInterface = {
      //     _deExternalKey: FarmDex,
      //     email: emailLowerCase,
      //     created_at: formatDate(),
      //   };
      //   await useSalesforce(salesforceProps);

      // sendEvent({
      //   name: "lead_sign_up",
      //   params: {
      //     lead_sign_up_origin: "Marvel",
      //   },
      // });

      const { addToast } = useToast();
      addToast({
        message:
          "Tudo certo. Você será avisado por e-mail assim que o lançamento estiver disponível.",
        type: "black",
        position: "top-right",
      });
    }
  };
  return (
    <>
      <Image
        src="https://assets.decocache.com/zeedog/0220d167-09c5-4bc5-8e5d-d0924b20cd41/farm-zeedog-title.png"
        width={device === "mobile" ? 282 : 436}
        height={device === "mobile" ? 48 : 74}
      />
      <form
        class={`group relative flex items-center justify-center w-full md:w-[618px] h-14 rounded-full bg-white transition-all z-30`}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder={placeholder}
          class="peer flex items-center w-full h-full px-6 rounded-full border border-black outline-none placeholder-black overflow-hidden hover:border-[#2339d3]"
          value={email.value}
          onChange={(e) => {
            email.value = e.currentTarget?.value;
          }}
        />
        <button
          type="submit"
          class={`absolute right-1 w-16 md:w-32 h-12 button-primary text-white transition-all font-title-xs-medium peer-hover:bg-[#2339d3] !p-0`}
        >
          {device === "mobile"
            ? (
              <span class="block w-2.5 h-2.5 -ml-1 border-t-2 border-r-2 border-white rotate-45 rounded-sm pointer-events-none">
              </span>
            )
            : "ENVIAR"}
        </button>
      </form>
    </>
  );
}
