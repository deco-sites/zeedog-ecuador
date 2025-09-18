import { Input } from "$components/ui/Input.tsx";
import { steps } from "$sdk/global/signalStore.ts";
import LazyIcon from "$components/ui/LazyIcon.tsx";
// import { useAccount } from "zee/sdk/hooks/useAccount.ts";
import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { useToast } from "$sdk/hooks/useToast.ts";
import { clx } from "site/sdk/clx.ts";

interface FormLoginNewPasswordProps {
  email: Signal<string>;
  url: URL | undefined;
}

export default function FormLoginNewPassword(
  { email, url }: FormLoginNewPasswordProps,
) {
  const { addToast } = useToast();

  const checkUrl = (url: string | undefined) => {
    const pattern = /sacola|perfil/i;
    return pattern.test(url?.toString() || "");
  };

  // const { loadingAccount, recoverPassword } = useAccount();

  const loadingAccount = { value: false };

  useEffect(() => {
    email.value = "";
  }, []);

  const isInvalidEmail = useSignal({ empty: false, matched: false });
  const isEmptyEmail = useSignal(false);
  const isEnableToCheck = useSignal(false);

  // const handleGetData = (e: Event) => {
  //   const target = e.target as HTMLInputElement;
  //   email.value = target.value;

  //   return;
  // };

  const verifyEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email.value)) {
      isInvalidEmail.value.matched = true;
    } else {
      isInvalidEmail.value.matched = false;
    }
  };

  const handleSendForm = (e: Event) => {
    e.preventDefault();
    isEnableToCheck.value = true;

    if (!email.value) {
      isEmptyEmail.value = true;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email.value)) {
      isInvalidEmail.value.matched = true;
    } else {
      isInvalidEmail.value.matched = false;
    }

    if (isEmptyEmail.value || !isInvalidEmail.value.matched) {
      addToast({
        message: "E-mail inválido",
        type: "error",
        position: "top-right",
      });
      return;
    }

    // const data = await recoverPassword({ email: email.value });

    // if (data && "error" in data) {
    //   addToast({
    //     message: data.error,
    //     type: "error",
    //     position: "top-right",
    //   });
    //   return;
    // }

    steps.value = "linkSent";
  };

  return (
    <>
      <form
        class="relative flex flex-col gap-5 w-full text-center p-4 pt-12 md:p-8"
        onSubmit={handleSendForm}
      >
        {!checkUrl(String(url)) &&
          (
            <button
              aria-label="Voltar"
              class="absolute left-0 top-0 size-14 flex items-center justify-center"
              onClick={() => {
                steps.value = "loginWithEmailAndPassword";
              }}
            >
              <span class="relative flex items-center justify-center size-6 rounded-full bg-gray-100">
                <LazyIcon
                  name="ArrowLeft"
                  width={16}
                  height={16}
                  class="text-black"
                />
              </span>
            </button>
          )}
        <h3 class="font-title-xl-medium">
          Esqueceu sua senha?
        </h3>
        <p class="font-body-xs-regular">
          Relaxa, insira seu e-mail e te enviaremos um link de recuperação.
        </p>
        <Input
          type="text"
          title="Digite seu email"
          id="login-input-email"
          name="email"
          placeholder=""
          containerClass="w-full pb-2"
          inputClass={clx(
            "h-12 pl-4",
            (isEmptyEmail.value || !isInvalidEmail.value.matched) &&
              isEnableToCheck.value && "border-red-300",
          )}
          onChange={(_e) => {
            if (isEmptyEmail.value) {
              isEmptyEmail.value = false;
              isEnableToCheck.value = false;
            }
            if (isInvalidEmail.value.matched === false && !isEmptyEmail.value) {
              isInvalidEmail.value.matched = true;
              isEnableToCheck.value = false;
            }
            // handleGetData(e);
            verifyEmail();
          }}
        />
        {(isInvalidEmail.value.matched === false && !isEmptyEmail.value) &&
          isEnableToCheck.value && (
          <p class="font-body-3xs-regular text-red-300 ml-1 self-start -mt-6">
            E-mail inválido.
          </p>
        )}
        {isEmptyEmail.value && (
          <p class="font-body-3xs-regular text-red-300 ml-1 self-start -mt-6">
            Campo obrigatório.
          </p>
        )}
        <button
          class="button-primary w-full h-11"
          type="submit"
          disabled={loadingAccount.value}
        >
          {loadingAccount.value
            ? <span class="loading loading-spinner"></span>
            : "ENVIAR LINK DE RECUPERAÇÃO"}
        </button>
      </form>
    </>
  );
}
