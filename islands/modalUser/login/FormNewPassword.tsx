import { Input } from "$components/ui/Input.tsx";
// import { steps } from "$sdk/global/signalStore.ts";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import { useSignal } from "@preact/signals";
// import { PasswordRequirements } from "$components/PasswordRequirements.tsx";
// import { PasswordValidated } from "$sdk/types/password.ts";
// import { JSX } from "preact/jsx-runtime";
// import { validatePassword } from "$sdk/validateInputs.ts";
// import { useAccount } from "zee/sdk/hooks/useAccount.ts";
// import { passwordRecoveryToken } from "$islands/PasswordRecovery.tsx";

export default function FormNewPassword() {
  // const { loadingAccount, updatePassword } = useAccount();
  const loadingAccount = { value: false };

  const showPassword = useSignal("password");
  const isEmptyPassword = useSignal(false);
  // const password = useSignal("");
  // const mandatoryItemsPassword = useSignal<PasswordValidated>({
  //   hasLowerCase: false,
  //   hasUpperCase: false,
  //   hasSpecialCharacter: false,
  //   hasNumber: false,
  //   quantityCharacter: 0,
  // });

  // const handleGetData = (e: JSX.TargetedEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;

  //   validatePassword(
  //     target.value,
  //     isEmptyPassword,
  //     mandatoryItemsPassword,
  //     target.value.length,
  //   );

  //   password.value = target.value;

  //   return;
  // };

  // const sendFormPassword = async (e: any) => {
  //   e.preventDefault();

  //   if (!password.value) {
  //     isEmptyPassword.value = true;
  //   }

  //   const data = await updatePassword({
  //     new_password: password.value,
  //     new_password_confirmation: password.value,
  //     token: passwordRecoveryToken.value || "",
  //   });
  //   if (data && data?.error) {
  //     console.log(data.error);
  //     return;
  //   }

  //   steps.value = "changedPassword";
  // };

  return (
    <form
      class="w-full md:w-[440px] flex flex-col gap-5 text-center p-4 pt-12 md:p-8"
      onSubmit={() => {}}
    >
      <h3 class="font-title-xl-medium">
        Alteração de senha
      </h3>
      <p class="font-body-xs-regular">
        Siga as orientações para criar uma senha segura.
      </p>
      <span class="flex flex-col gap-3">
        <div class="relative flex ">
          <Input
            type={showPassword.value}
            title="Senha"
            id="password"
            name="password"
            placeholder=""
            containerClass="w-full"
            inputClass={`h-12 pl-4 !text-xs md:text-sm ${
              isEmptyPassword.value && "border-red-300"
            }`}
            onChange={(_e) => {
              isEmptyPassword.value = false;
              // handleGetData(e);
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
        {
          /* <PasswordRequirements
          hasLowerCase={mandatoryItemsPassword.value.hasLowerCase}
          hasNumber={mandatoryItemsPassword.value.hasNumber}
          hasSpecialCharacter={mandatoryItemsPassword.value
            .hasSpecialCharacter}
          hasUpperCase={mandatoryItemsPassword.value.hasUpperCase}
          quantityCharacter={password.value.length}
        /> */
        }
      </span>
      <button
        class="button-primary h-11 w-full"
        type="submit"
        disabled={loadingAccount.value}
      >
        {loadingAccount.value
          ? <span class="loading loading-spinner"></span>
          : "ALTERAR SENHA"}
      </button>
    </form>
  );
}
