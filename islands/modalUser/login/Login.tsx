import Image from "apps/website/components/Image.tsx";
import { modalTypeLogin, steps } from "$sdk/global/signalStore.ts";

import handleOpenModal from "$islands/modal/handleOpenModal.ts";

export default function Login() {
  return (
    <div class="w-full flex flex-col gap-5 p-4 pt-12 md:p-8 text-center">
      <h3 class="font-title-xl-medium">Entre na sua conta</h3>
      <button class="flex ite ms-center justify-center gap-2 font-body-xs-bold border border-black px-3 py-3 bg-white w-full rounded-3xl">
        <Image
          src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2225/deb39223-1e4c-407e-8e24-f2e1887b8fd6"
          alt="Google Login"
          width={18}
          height={18}
          loading="lazy"
          decoding="async"
          fetchPriority="auto"
          preload={false}
        />
        Continuar com Google
      </button>
      <button
        class="button-primary h-11 w-full"
        id="GoToLogin"
        onClick={() => {
          steps.value = "loginWithEmailAndPassword";
        }}
      >
        Continuar com E-mail e senha
      </button>
      <p class="font-body-xs-regular text-gray-600">
        Ainda não tem conta?{" "}
        <button
          class="font-body-xs-regular underline"
          onClick={() => {
            modalTypeLogin.value = "register";
            steps.value = "createAccount";
            handleOpenModal({
              openModal: true,
              modalType: "ModalLogin",
              modalProps: "",
              contentModalClass:
                "bottom-0 md:bottom-auto w-full md:w-[440px] min-h-[508px] rounded-t-[20px] md:rounded-xl",
            });
          }}
        >
          Criar conta
        </button>
      </p>
    </div>
  );
}
