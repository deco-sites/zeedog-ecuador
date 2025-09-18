import { RichText } from "apps/admin/widgets.ts";
import { getCookies } from "std/http/cookie.ts";
import LazyIcon from "site/components/ui/LazyIcon.tsx";
import { HandleClosePopup } from "site/islands/popup/HandleClosePopup.tsx";

export interface PopupProps {
  title: string;
  subtitle?: string;
  content: RichText;
  buttonTitle: string;
  /**
   * @hide true
   */
  closeModal?: boolean;
  /**
   * @description The time in days until the popup is displayed. If not set, the popup will be displayed every session.
   */
  displayUntil?: number;
}

const DEFAULT_PROPS: PopupProps = {
  title: "Title",
  subtitle: "",
  content: "Content",
  buttonTitle: "Agree",
  closeModal: false,
};

const Popup = (props: PopupProps) => {
  const { title, subtitle, content, buttonTitle, closeModal, displayUntil } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  if (closeModal) return null;

  return (
    <>
      <HandleClosePopup displayUntil={displayUntil} />

      <section class="fixed flex w-screen h-dvh top-0 left-0 items-center justify-center z-[203] overscroll-contain">
        <button
          aria-label="background-close"
          class="js-close-popup fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-[8888] cursor-default"
          id="labelClosePopup"
        />

        <div
          class="js-skeleton-popup absolute flex flex-col items-center justify-center shrink-0 bg-white z-[9999] transition-all bottom-0 md:bottom-auto w-full md:w-[440px] lg:w-[500px] rounded-t-[20px] md:rounded-[20px]"
          id="ModalStructure"
        >
          <button
            aria-label="fechar"
            class="js-close-popup absolute top-0 right-0 h-14 w-14 flex items-center justify-center rounded-tr-xl bg-transparent z-10"
            id="buttonClosePopup"
          >
            {/* aparently this svg doesnt receive click action */}
            <span class="relative flex items-center justify-center size-6 rounded-full bg-gray-100">
              <LazyIcon name="Close" size={16} />
            </span>
            <span class="absolute w-full h-full z-10" />
          </button>

          <div class="w-full h-full relative flex flex-col justify-center gap-4 items-center">
            <div class="w-full h-full flex flex-col justify-between gap-4 text-center p-4 pt-12 md:p-8">
              <div class="flex flex-col gap-2">
                <h3 class="font-title-xl-bold">{title}</h3>
                {subtitle && (
                  <p class="font-body-xs-regular text-gray-600">
                    {subtitle}
                  </p>
                )}
              </div>

              <div
                class="font-body-xs-regular text-gray-600"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              <button class="button-primary h-12 w-full js-close-popup">
                {buttonTitle}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const loader = (props: PopupProps, req: Request) => {
  const cookies = getCookies(req.headers);
  const hasClosePopupCookie = !!cookies["closePopup"];

  return {
    ...props,
    closeModal: hasClosePopupCookie,
  };
};

export default Popup;
