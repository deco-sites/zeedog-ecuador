import LazyIcon from "$components/ui/LazyIcon.tsx";
import { steps } from "$sdk/global/signalStore.ts";
import { ComponentChildren } from "preact";
import { closeModal } from "$islands/modal/HandleCloseModal.tsx";

interface ConfirmedActionProps {
  btnText: string;
  text: ComponentChildren;
  title: string;
  step:
    | "close"
    | "login"
    | "loginWithEmailAndPassword"
    | "forgetPassword"
    | "linkSent"
    | "createNewPassword"
    | "changedPassword"
    | "createAccount";
  // account validation
  // | "verifyYourPhone"
  // | "verificationCode";
  stepButton:
    | "close"
    | "login"
    | "loginWithEmailAndPassword"
    | "forgetPassword"
    | "linkSent"
    | "createNewPassword"
    | "changedPassword"
    | "createAccount";
  // account validation
  // | "verifyYourPhone"
  // | "verificationCode";
}

export default function ConfirmedAction(
  { btnText, text, title, step, stepButton }: ConfirmedActionProps,
) {
  return (
    <>
      <div
        class={`relative flex flex-col gap-10 w-full p-4 pt-12 md:p-8 text-center`}
      >
        <button
          aria-label="Voltar"
          class="absolute left-0 top-0 size-14 flex items-center justify-center -mt-1"
          onClick={() => {
            if (stepButton === "close") {
              closeModal();
            } else {
              steps.value = stepButton;
            }
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
        <h3 class="flex items-center justify-center gap-1 font-title-xl-medium">
          <LazyIcon
            name="Checked"
            width={20}
            height={20}
            class="mr-1 text-blue-400"
          />
          {title}
        </h3>
        {text}
        <button
          class="button-primary w-full h-11"
          onClick={() => {
            if (step === "close") {
              closeModal();
            } else {
              steps.value = step;
            }
          }}
        >
          {btnText}
        </button>
      </div>
    </>
  );
}
