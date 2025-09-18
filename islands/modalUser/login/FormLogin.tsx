import { Input } from "$components/ui/Input.tsx";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import { externalCloseModal } from "$islands/modal/HandleCloseModal.tsx";
import handleOpenModal from "$islands/modal/handleOpenModal.ts";
import { modalTypeLogin, steps } from "$sdk/global/signalStore.ts";
import { PasswordValidated } from "$sdk/types/password.ts";
import { validateEmail, validatePassword } from "$sdk/validateInputs.ts";
import { useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { invoke } from "site/runtime.ts";
import { clx } from "site/sdk/clx.ts";

interface LoginObj {
  email: string;
  password: string;
}

export default function FormLogin() {
  const loading = useSignal(false);

  const showPassword = useSignal("password");
  const isInvalidPassword = useSignal(false);
  const isFailSubmit = useSignal({ status: false, message: "" });
  const isInvalidEmail = useSignal({ empty: false, matched: false });
  const loginObj = useSignal<LoginObj>({
    email: "",
    password: "",
  });

  const mandatoryItemsPassword = useSignal<PasswordValidated>({
    hasLowerCase: false,
    hasUpperCase: false,
    hasSpecialCharacter: false,
    hasNumber: false,
    quantityCharacter: 0,
  });

  const handleGetData = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const target = e.target as HTMLInputElement;

    isFailSubmit.value = {
      status: false,
      message: "",
    };

    if (target && target.name === "email") {
      validateEmail(target.value, isInvalidEmail);
    } else {
      validatePassword(
        target.value,
        isInvalidPassword,
        mandatoryItemsPassword,
        target.value.length,
      );
    }

    loginObj.value = {
      ...loginObj.value,
      [target.name]: target.value,
    };

    return;
  };

  const sendFormLogin = async (
    e: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();

    if (!loginObj.value.email || !loginObj.value.password) {
      isFailSubmit.value = {
        status: true,
        message: "Campo obrigatório.",
      };
      return;
    }

    const data = await invoke.shopify.actions.user.signIn({
      email: loginObj.value.email,
      password: loginObj.value.password,
    });

    if (!data || !data.customerAccessTokenCreate.customerAccessToken) {
      isFailSubmit.value = {
        status: true,
        message: "Email ou senha incorretos.",
      };
      return;
    }

    isFailSubmit.value = {
      status: false,
      message: "",
    };

    externalCloseModal();

    globalThis.window.location.reload();
  };

  return (
    <>
      <div class="w-full md:w-[440px] min-h-72 h-auto relative flex flex-col justify-center gap-4 items-center">
        <form
          class="w-full h-full flex flex-col gap-4 text-center p-4 pt-12 md:p-8"
          onSubmit={(e) => sendFormLogin(e)}
        >
          <div class="flex flex-col gap-2">
            <h3 class="font-title-xl-medium">Entre na sua conta</h3>
            <p class="font-body-xs-regular text-gray-600"></p>
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
          <span class="flex flex-col gap-1">
            <Input
              type="text"
              title="E-mail"
              id="email"
              name="email"
              placeholder=""
              containerClass="w-full"
              inputClass={clx(
                "h-12 pl-4 !text-xs md:text-sm",
                (isInvalidEmail.value.empty || isInvalidEmail.value.matched) ||
                  isInvalidPassword.value || isFailSubmit.value.status
                  ? "border-red-300"
                  : "",
              )}
              onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
                isInvalidEmail.value.empty = false;
                handleGetData(e);
              }}
            />
            {((isInvalidEmail.value.empty || isInvalidEmail.value.matched) &&
              !isInvalidPassword.value) &&
              (
                <p class="font-body-3xs-regular text-red-300 ml-1 self-start">
                  E-mail inválido.
                </p>
              )}
          </span>
          <span class="flex flex-col">
            <div class="relative flex">
              <Input
                type={showPassword.value}
                title="Senha"
                id="password"
                name="password"
                placeholder=""
                containerClass="w-full"
                inputClass={clx(
                  "h-12 pl-4 !text-xs md:text-sm",
                  (isInvalidPassword.value || isFailSubmit.value.status) &&
                    "border-red-300",
                )}
                onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
                  isInvalidPassword.value = false;
                  handleGetData(e);
                }}
              />
              <LazyIcon
                name={showPassword.value === "text" ? "EyeSlashed" : "Eye"}
                width={20}
                height={20}
                class="text-gray-600 absolute right-4 bottom-0 top-4 z-20 cursor-pointer"
                onClick={() => {
                  if (showPassword.value === "text") {
                    showPassword.value = "password";
                    return;
                  }
                  showPassword.value = "text";
                }}
              />
            </div>
            {isFailSubmit.value.status
              ? (
                <p class="font-body-3xs-regular text-red-300 ml-1 mt-1 font-normal">
                  {isFailSubmit.value.message.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              )
              : (
                <p class="font-body-3xs-regular text-gray-500 ml-1 mt-1 text-justify">
                  Sua senha precisa ter 6 caracteres.
                </p>
              )}
          </span>
          <button
            class="button-primary h-11 w-full"
            disabled={loading.value}
            type="submit"
          >
            {loading.value
              ? <span class="loading loading-spinner" />
              : "ENTRAR"}
          </button>
          <button
            class="font-body-xs-regular text-gray-600 underline"
            onClick={() => {
              steps.value = "forgetPassword";
            }}
          >
            Esqueci minha senha
          </button>
        </form>
      </div>
    </>
  );
}
