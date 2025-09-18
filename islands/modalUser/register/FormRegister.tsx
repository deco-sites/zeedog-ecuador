import { PasswordRequirements } from "$components/PasswordRequirements.tsx";
import { Input } from "$components/ui/Input.tsx";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import { externalCloseModal } from "$islands/modal/HandleCloseModal.tsx";
import { PasswordValidated } from "$sdk/types/password.ts";
import { validateEmail, validatePassword } from "$sdk/validateInputs.ts";
import { useSignal } from "@preact/signals";
import { JSX } from "preact";
import { dataRegister } from "$sdk/global/signalStore.ts";
import { invoke } from "site/runtime.ts";
import { clx } from "site/sdk/clx.ts";

export default function FormRegister() {
  const loading = useSignal(false);

  const isInvalidEmail = useSignal({ matched: false, empty: false });
  const isInvalidPassword = useSignal(false);
  const showPasswordRequirements = useSignal(false);
  const errorSignUpEmailRegistered = useSignal<string | null>(null);

  const isEmptyPassword = useSignal(false);
  const isEmptyName = useSignal(false);
  const isEmptyLastName = useSignal(false);
  const showPassword = useSignal("password");
  const mandatoryItemsPassword = useSignal<PasswordValidated>({
    hasLowerCase: false,
    hasUpperCase: false,
    hasSpecialCharacter: false,
    hasNumber: false,
    quantityCharacter: 0,
  });

  const sendForm = async (e: JSX.TargetedSubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkIsEmpty();
    const checkInputs = isInvalidEmail.value.empty ||
      isInvalidEmail.value.matched || isEmptyName.value ||
      isEmptyPassword.value || isEmptyLastName.value || isInvalidPassword.value;

    if (checkInputs) {
      return;
    }

    const { email, password, name, lastName, promotionInEmail } =
      dataRegister.value;

    const data = await invoke.shopify.actions.user.signUp({
      email,
      password,
      firstName: name,
      lastName,
      acceptsMarketing: promotionInEmail,
    });

    if (data.customerUserErrors.length) {
      errorSignUpEmailRegistered.value = data?.customerUserErrors?.[0]?.message;
      return;
    }

    await invoke.shopify.actions.user.signIn({ email, password });

    externalCloseModal();

    globalThis.location.reload();
  };

  const checkIsEmpty = () => {
    if (!dataRegister.value.email) {
      isInvalidEmail.value.empty = true;
    }
    if (!dataRegister.value.password) {
      isEmptyPassword.value = true;
    }
    if (!dataRegister.value.name) {
      isEmptyName.value = true;
    }
    if (!dataRegister.value.lastName) {
      isEmptyLastName.value = true;
    }
  };

  const handleGetData = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const target = e.target as HTMLInputElement;

    if (target.name === "password") {
      validatePassword(
        target.value,
        isInvalidPassword,
        mandatoryItemsPassword,
        target.value.length,
      );
    }

    if (target.name === "email") {
      validateEmail(target.value, isInvalidEmail);
      errorSignUpEmailRegistered.value = null;
    }

    dataRegister.value = {
      ...dataRegister.value,
      [target.name]: target.name === "promotionInEmail"
        ? target.checked
        : target.value,
    };
  };

  return (
    <form
      class="flex flex-col w-full md:max-w-[440px] h-auto gap-6 relative"
      onSubmit={sendForm}
    >
      <div class="flex flex-col w-full gap-2">
        {/* E-mail */}
        <span class="flex flex-col gap-1">
          <div class="relative flex">
            <Input
              type="text"
              title="E-mail"
              id="email"
              name="email"
              placeholder=""
              containerClass="w-full"
              inputClass={clx(
                "h-12 pl-4 !text-xs md:text-sm",
                isInvalidEmail.value.empty && "border border-red-300",
              )}
              onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
                isInvalidEmail.value.empty = false;
                handleGetData(e);
              }}
            />
            {!errorSignUpEmailRegistered.value && !!dataRegister.value.email &&
              !isInvalidEmail.value.matched && (
              <LazyIcon
                name="Checked"
                width={20}
                height={20}
                class="text-gray-600 absolute right-4 bottom-0 top-4"
              />
            )}
          </div>
          {isInvalidEmail.value.empty && (
            <p class="font-body-3xs-regular text-red-300 ml-1">
              Campo obrigatório.
            </p>
          )}
          {errorSignUpEmailRegistered.value && (
            <p class="font-body-3xs-regular text-red-300 ml-1">
              {errorSignUpEmailRegistered.value}
            </p>
          )}
        </span>

        {/* Name */}
        <span class="flex flex-col gap-1">
          <div class="relative flex">
            <Input
              type="text"
              title="Nome"
              id="name"
              name="name"
              placeholder=""
              containerClass="w-full"
              inputClass={clx(
                "h-12 pl-4 !text-xs md:text-sm",
                isEmptyName.value && "border border-red-300",
              )}
              onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
                isEmptyName.value = false;
                handleGetData(e);
              }}
            />
            {!!dataRegister.value.name &&
              (
                <LazyIcon
                  name="Checked"
                  width={20}
                  height={20}
                  class="text-gray-600 absolute right-4 bottom-0 top-4"
                />
              )}
          </div>
          {isEmptyName.value && (
            <p class="font-body-3xs-regular text-red-300 ml-1">
              Campo obrigatório.
            </p>
          )}
        </span>

        {/* Surname */}
        <span class="flex flex-col gap-1">
          <div class="relative flex">
            <Input
              type="text"
              title="Sobrenome"
              id="lastName"
              name="lastName"
              placeholder=""
              containerClass="w-full"
              inputClass={clx(
                "h-12 pl-4 !text-xs md:text-sm",
                isEmptyLastName.value && "border border-red-300",
              )}
              onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
                isEmptyLastName.value = false;
                handleGetData(e);
              }}
            />
            {!!dataRegister.value.lastName &&
              (
                <LazyIcon
                  name="Checked"
                  width={20}
                  height={20}
                  class="text-gray-600 absolute right-4 bottom-0 top-4"
                />
              )}
          </div>
          {isEmptyLastName.value && (
            <p class="font-body-3xs-regular text-red-300 ml-1">
              Campo obrigatório.
            </p>
          )}
        </span>

        {/* Password */}
        <span class="flex flex-col gap-1">
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
                isEmptyPassword.value && "border border-red-300",
              )}
              onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
                isEmptyPassword.value = false;
                handleGetData(e);
              }}
              onFocus={() => showPasswordRequirements.value = true}
            />
            <LazyIcon
              name={showPassword.value === "text" ? "EyeSlashed" : "Eye"}
              width={20}
              height={20}
              class="text-gray-600 absolute right-4 bottom-0 top-4 z-20 cursor-pointer"
              onClick={() => {
                showPassword.value = showPassword.value === "text"
                  ? "password"
                  : "text";
              }}
            />
          </div>
          {showPasswordRequirements.value && (
            <PasswordRequirements
              hasLowerCase={mandatoryItemsPassword.value.hasLowerCase}
              hasNumber={mandatoryItemsPassword.value.hasNumber}
              hasSpecialCharacter={mandatoryItemsPassword.value
                .hasSpecialCharacter}
              hasUpperCase={mandatoryItemsPassword.value.hasUpperCase}
              quantityCharacter={dataRegister.value.password.length}
            />
          )}
          {isEmptyPassword.value && (
            <p class="font-body-3xs-regular text-red-300 ml-1">
              Campo obrigatório.
            </p>
          )}
          {(!isEmptyPassword.value && isInvalidPassword.value) && (
            <p class="font-body-3xs-regular text-red-300 ml-1">
              A senha deve atender os requisitos.
            </p>
          )}
        </span>
      </div>

      {/* Promotion */}
      <span class="w-full flex flex-col gap-4 ml-1">
        <div class="flex gap-6 pl-2">
          <span class="flex gap-3">
            <input
              type="checkbox"
              id="promotionInEmail"
              name="promotionInEmail"
              class="accent-black scale-150 cursor-pointer"
              onChange={handleGetData}
            />
            <label
              for="promotionInEmail"
              class="font-body-2xs-regular md:font-body-xs-regular text-gray-500 cursor-pointer text-left"
            >
              Aceito receber novidades e promoções da Zee.Dog por E-mail,
              WhatsApp e SMS.
            </label>
          </span>
        </div>
      </span>

      <button
        class="button-primary h-11 w-full"
        type="submit"
        disabled={loading.value}
      >
        {loading.value
          ? <span class="loading loading-spinner" />
          : "CRIAR CONTA"}
      </button>
    </form>
  );
}
