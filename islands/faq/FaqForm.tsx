import { Signal, useSignal } from "@preact/signals";
import { JSX } from "preact";
import { Input } from "$components/ui/Input.tsx";
import { TextArea } from "$components/ui/TextArea.tsx";
import { checkIsValidEmail } from "$sdk/checkValidEmail.ts";

interface ContactUsForm {
  email: string;
  name: string;
  country: string;
  assunto: string;
  mensagem: string;
}

interface FormProps {
  isSendForm: Signal<boolean>;
}

export default function FaqForm({ isSendForm }: FormProps) {
  const isLoading = useSignal(false);
  const contactUsForm = useSignal<ContactUsForm>({
    email: "",
    name: "",
    country: "",
    assunto: "",
    mensagem: "",
  });

  const isValidEmail = checkIsValidEmail(contactUsForm.value.email);

  const formIsEmpty = Object.values(contactUsForm.value).some(
    (value) => value === "",
  );

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    isLoading.value = !isLoading.value;
    isSendForm.value = false;

    isSendForm.value = true;
  };

  const shouldButtonSubmitBeDisabled = formIsEmpty || !isValidEmail;

  const setFormData = (
    e: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.currentTarget as HTMLInputElement;

    contactUsForm.value = {
      ...contactUsForm.value,
      [target.name]: target.value,
    };
  };

  return (
    <>
      <p
        class="font-title-xl-bold lg:font-title-2xl-bold text-center mt-8 scroll-mt-48"
        id="contact-us-form"
      >
        Formulário de contato
      </p>
      <span class="font-body-xs-regular mt-5 text-gray-600">
        Compra, revenda, dúvidas gerais.
      </span>
      <form
        onSubmit={handleFormSubmit}
        class="max-w-[565px] mt-10 flex flex-col items-center justify-center px-5 pb-5 w-full"
      >
        <fieldset class="w-full mx-2.5 md:my-2.5">
          <Input
            title="Nome completo"
            id="name"
            name="name"
            placeholder=""
            containerClass="w-full"
            inputClass="h-12 pl-4"
            onChange={(e) => {
              setFormData(e);
            }}
          />
        </fieldset>

        <div class="flex flex-col md:flex-row w-full mx-2.5 my-2.5">
          <fieldset class="w-full md:mr-5">
            <Input
              title="E-mail"
              id="email"
              name="email"
              placeholder=""
              containerClass="w-full"
              inputClass="h-12 pl-4"
              onChange={(e) => {
                setFormData(e);
              }}
            />
          </fieldset>
          <fieldset class="w-full md:my-0 mt-2.5 ">
            <Input
              title="País"
              id="country"
              name="country"
              placeholder=""
              containerClass="w-full"
              inputClass="h-12 pl-4"
              onChange={(e) => {
                setFormData(e);
              }}
            />
          </fieldset>
        </div>
        <fieldset class="w-full mx-2.5 md:my-2.5 ">
          <Input
            title="Assunto"
            id="assunto"
            name="assunto"
            placeholder=""
            containerClass="w-full"
            inputClass="h-12 pl-4"
            onChange={(e) => {
              setFormData(e);
            }}
          />
        </fieldset>
        <fieldset class="w-full mx-2.5 my-2.5">
          <TextArea
            title="Mensagem"
            id="mensagem"
            name="mensagem"
            placeholder=""
            containerClass="w-full"
            textAreaClass="min-h-8 h-12 pl-4 max-h-96"
            onChange={(e) => {
              setFormData(e);
            }}
          />
        </fieldset>
        <button
          class={`w-56 h-12 font-body-2xs-bold text-white bg-black  transition-all delay-150 rounded-full mt-8  ${
            shouldButtonSubmitBeDisabled
              ? "cursor-default opacity-55"
              : "hover:opacity-55 cursor-pointer"
          }`}
          type="submit"
          disabled={shouldButtonSubmitBeDisabled}
        >
          ENVIAR
        </button>
      </form>
    </>
  );
}
