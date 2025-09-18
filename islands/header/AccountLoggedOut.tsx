import handleOpenModal from "$islands/modal/handleOpenModal.ts";
import { modalTypeLogin, steps } from "$sdk/global/signalStore.ts";

interface AccountLoggedOutTextsProps {
  loginText: string;
  registerText: string;
}

interface AccountLoggedOutProps {
  texts: AccountLoggedOutTextsProps;
}

export default function AccountLoggedOut({ texts }: AccountLoggedOutProps) {
  const linkStyle =
    "flex items-center justify-center whitespace-nowrap h-10 px-5 hover:bg-gray-200 transition-all";

  return (
    <span
      tabIndex={0}
      class="max-md:hidden dropdown-content top-full bg-white shadow-md rounded z-[1] font-body-2xs-regular"
      id="UserLoggedOut"
    >
      <button
        class={`${linkStyle} rounded-t w-full`}
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
        {texts.loginText}
      </button>
      <button
        class={`${linkStyle} rounded-t`}
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
        {texts.registerText}
      </button>
    </span>
  );
}
