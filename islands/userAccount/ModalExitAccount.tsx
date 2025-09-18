// import { useAccount } from "zee/sdk/hooks/useAccount.ts";
import { externalCloseModal } from "$islands/modal/HandleCloseModal.tsx";

export default function ModalExitAccount() {
  // const { signOut } = useAccount();
  const signOut = async () => {};

  return (
    <div class="w-full xl:w-[440px] h-80 flex flex-col justify-center items-center gap-6 px-8 relative">
      <p class="font-body-xs-regular">
        Tem certeza que deseja sair da sua conta?
      </p>
      <span class="w-full flex flex-col gap-5">
        <button
          class="w-full h-11 button-primary"
          onClick={async () => {
            await signOut();

            externalCloseModal();

            globalThis.location.href = "/";
          }}
        >
          SAIR
        </button>
        <button
          class="w-full h-11 button-tertiary"
          onClick={() => {
            externalCloseModal();
          }}
        >
          VOLTAR
        </button>
      </span>
    </div>
  );
}
