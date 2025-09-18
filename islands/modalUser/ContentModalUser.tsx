import Login from "./login/Login.tsx";
import RegisterModal from "$islands/modalUser/register/RegisterModal.tsx";
import FormLoginNewPassword from "./login/FormLoginNewPassword.tsx";
import FormLogin from "./login/FormLogin.tsx";
import ConfirmedAction from "$islands/modalUser/login/ConfirmationLink.tsx";
import FormNewPassword from "./login/FormNewPassword.tsx";
import { useSignal } from "@preact/signals";
import { steps } from "$sdk/global/signalStore.ts";

type ModalTextProps = {
  title: string;
  requestText: string;
  buttonText: string;
};

interface ContentModalUserProps {
  url?: URL;
  linkSent: ModalTextProps;
  changedPassword: ModalTextProps;
}

export default function ContentModalUser(
  { url, linkSent, changedPassword }: ContentModalUserProps,
) {
  const email = useSignal("");

  const modalSteps = {
    "login": <Login />,
    "loginWithEmailAndPassword": <FormLogin />,
    "forgetPassword": <FormLoginNewPassword email={email} url={url} />,
    "linkSent": (
      <ConfirmedAction
        title={linkSent.title}
        text={
          <p class="font-body-xs-regular text-center">
            {linkSent.requestText} <span class="font-bold">{email.value}</span>
          </p>
        }
        btnText={linkSent.buttonText}
        step="close"
        stepButton="forgetPassword"
      />
    ),
    "createNewPassword": <FormNewPassword />,
    "changedPassword": (
      <ConfirmedAction
        title={changedPassword.title}
        text={
          <p class="font-body-xs-regular">
            {changedPassword.requestText}
          </p>
        }
        btnText={changedPassword.buttonText}
        step="loginWithEmailAndPassword"
        stepButton="loginWithEmailAndPassword"
      />
    ),
    "createAccount": <RegisterModal />,
  };

  if (steps.value === "") return <></>;

  return (
    <>
      {modalSteps[steps.value]}
    </>
  );
}
