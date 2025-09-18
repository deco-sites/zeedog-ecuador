import FormRegister from "./FormRegister.tsx";
import { modalTypeLogin, steps } from "$sdk/global/signalStore.ts";
import handleOpenModal from "$islands/modal/handleOpenModal.ts";

export default function RegisterModal() {
  return (
    <section
      class="w-full h-full flex flex-col justify-center items-center gap-4 md:gap-6 p-4 pt-12 md:p-8"
      id="contentRegister"
    >
      <div class="w-full flex flex-col justify-center items-center gap-2">
        <h3 class="font-title-xl-medium">Crie sua conta</h3>
        <p class="font-body-xs-regular text-gray-600">
          Já tem uma conta?{" "}
          <button
            class="underline"
            onClick={() => {
              modalTypeLogin.value = "login";
              steps.value = "loginWithEmailAndPassword";
              handleOpenModal({
                openModal: true,
                modalType: "ModalLogin",
                modalProps: "",
                contentModalClass:
                  "bottom-0 md:bottom-auto w-full md:w-[440px] min-h-[260px] rounded-t-[20px] md:rounded-xl",
              });
            }}
          >
            Entrar
          </button>
        </p>
      </div>
      <FormRegister />
      <span class="flex flex-col justify-center items-center text-center w-full">
        <p class="font-body-3xs-regular text-gray-600">
          Ao criar uma conta, você concorda com a
        </p>
        <p class="font-body-3xs-regular text-gray-600">
          <a href="/institucional/politica-de-privacidade" class="underline">
            Política de Privacidade
          </a>{" "}
          e os{" "}
          <a href="/perguntas-frequentes" class="underline">
            Termos e Condições
          </a>.
        </p>
      </span>
    </section>
  );
}
