import {
  Collapse,
  CollapseContent,
  CollapseTitle,
} from "$components/ui/Collapse.tsx";
import Icon from "$components/ui/Icon.tsx";
import LazyIcon from "$components/ui/LazyIcon.tsx";
import { ComponentChildren } from "preact";
import { InteractiveIconWithTooltip } from "$components/footer/IconWithTooltip.tsx";
import { TalkToUsList } from "$islands/footer/TalkToUsList.tsx";
import AthenaContent from "$components/athena/AthenaContent.tsx";
import { useDevice } from "@deco/deco/hooks";
import { MenuFooterProps } from "$sdk/types/footer.ts";
import { redirect, SectionProps } from "@deco/deco";
import { getServerCookies } from "zee/sdk/cookies.ts";
import { clx } from "site/sdk/clx.ts";
import { useLanguage } from "site/sdk/hooks/useLanguage.ts";
import { Brands } from "site/components/footer/Brands.tsx";
import Image from "apps/website/components/Image.tsx";

interface FooterCollapseProps {
  title?: string;
  children: ComponentChildren;
  class?: string;
  openOnMobile?: boolean;
}

function FooterCollapse(
  { title, children, class: className = "", openOnMobile = false }:
    FooterCollapseProps,
) {
  return (
    <Collapse
      class={clx(
        "lg:collapse-open overflow-visible",
        className,
        openOnMobile
          ? "collapse-open"
          : "rounded-none border-t border-gray-200 lg:border-0",
      )}
      cursorPointer={false}
    >
      <CollapseTitle
        class={clx(
          "py-5 mx-7 lg:mx-0 cursor-pointer",
          openOnMobile && "max-lg:hidden",
        )}
      >
        <span class="font-roboto font-bold tracking-wider">
          {title}
        </span>
      </CollapseTitle>
      <CollapseContent class="mx-7 lg:mx-0 transition-opacity duration-75 ease-in-out">
        {children}
      </CollapseContent>
    </Collapse>
  );
}

export default function Footer(
  {
    menu,
    socialMedia,
    institutionalLinks,
    paymentMethods,
    complaintsBook,
    company,
    talkToUs,
    athenaContent,
    isMenuOpened,
    selectedMenuItem,
    url,
    highlight,
    selectedLanguage,
    texts,
  }: SectionProps<typeof loader>,
) {
  const device = useDevice();
  const isFaqPage = url.pathname === "/faq";

  return (
    <footer
      class="relative flex flex-col items-center w-full max-w-full bg-gray-100 pt-12 border-t border-gray-200 overflow-hidden z-[200]"
      id="footer"
    >
      {athenaContent && (
        <div class="fixed right-0 bottom-[90px] flex flex-col items-end z-10">
          <AthenaContent
            selectedMenuItem={selectedMenuItem}
            isMenuOpened={isMenuOpened}
            isFaqPage={isFaqPage}
            faq={athenaContent.faqContent}
            isBlackFriday={false}
            texts={texts}
            languageCode={selectedLanguage}
            {...athenaContent}
          />
        </div>
      )}

      {url.pathname === "/" && highlight && (
        <div class="flex items-center justify-center px-4 pb-10 border-b border-gray-200 w-full">
          <h1 class="font-semibold text-black text-center">
            {highlight}
          </h1>
        </div>
      )}

      <div class="w-full max-w-screen-2xl lg:px-8 mt-8 lg:mt-0">
        <div class="flex flex-col items-center justify-center mb-8 lg:hidden gap-y-8">
          <Icon
            name={"ZeeDogVertical"}
            width={48}
            height={68}
          />
          <ul class="flex flex-wrap gap-4">
            {socialMedia && socialMedia.map(({ children }) => (
              <>
                {children &&
                  children.map(({ icon, url, alt, width, height }) => (
                    <li>
                      <InteractiveIconWithTooltip
                        href={url}
                        ariaLabel={alt}
                        iconName={icon}
                        iconWidth={width}
                        iconHeight={height}
                        tooltipClass="font-body-2xs-regular bg-white dropdown-content-tooltip-arrow-white px-3.5 py-2"
                      >
                        <p>{icon}</p>
                      </InteractiveIconWithTooltip>
                    </li>
                  ))}
              </>
            ))}
          </ul>
        </div>
        <div class="flex flex-col lg:flex-row lg:justify-between lg:pb-5 text-gray-500 font-body-xs-regular">
          {menu &&
            menu.map(({ title, children }) => (
              <FooterCollapse title={title} class="row-span-full">
                <ul>
                  {children.map(({ title, url, openNewTab }) => (
                    <li class="border-b border-gray-200 pl-7 py-4 lg:pl-0 lg:border-0 lg:pt-0">
                      <a
                        href={url}
                        target={openNewTab ? "_blank" : "_self"}
                        rel={openNewTab ? "noopener" : undefined}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </FooterCollapse>
            ))}

          <div class="flex flex-col lg:gap-y-20 lg:w-40 xl:w-auto">
            {device === "desktop" && (
              <>
                {socialMedia &&
                  socialMedia.map(({ title, children }) => (
                    <FooterCollapse
                      title={title}
                      class="order-first lg:h-40 hidden lg:grid"
                      openOnMobile
                    >
                      <ul class="flex flex-wrap gap-3 max-lg:justify-center p-4 lg:pt-0 lg:px-0">
                        {children.map((
                          { icon, url, alt, width, height },
                        ) => (
                          <li>
                            <InteractiveIconWithTooltip
                              href={url}
                              ariaLabel={alt}
                              iconName={icon}
                              iconWidth={width}
                              iconHeight={height}
                              tooltipClass="font-body-2xs-regular bg-white dropdown-content-tooltip-arrow-white px-3.5 py-2"
                            >
                              <p>{icon}</p>
                            </InteractiveIconWithTooltip>
                          </li>
                        ))}
                      </ul>
                    </FooterCollapse>
                  ))}
              </>
            )}
            {talkToUs && (
              <FooterCollapse
                title={talkToUs.title}
                class="lg:h-40"
              >
                <TalkToUsList {...talkToUs} />
              </FooterCollapse>
            )}
          </div>
          {paymentMethods && paymentMethods.items.length > 0 && (
            <div class="flex flex-col lg:gap-y-20">
              <FooterCollapse title={paymentMethods.title} class="lg:h-40">
                <ul class="flex flex-wrap justify-center lg:justify-start gap-3 lg:max-w-64 p-4 lg:pt-0 lg:px-0">
                  {paymentMethods.items.map((payment) => (
                    <li
                      class={`flex items-center justify-center w-14 h-9 rounded-md ${
                        paymentMethods.mode === "gray"
                          ? "bg-gray-100 border border-gray-200"
                          : "bg-white"
                      }`}
                    >
                      <LazyIcon
                        name={payment.icon}
                        width={payment.width}
                        height={payment.height}
                      />
                    </li>
                  ))}
                </ul>
              </FooterCollapse>

              {/* Libro de Reclamaciones */}
              {complaintsBook && complaintsBook.title &&
                complaintsBook.image.source && (
                <>
                  {device === "desktop"
                    ? (
                      <a
                        href={complaintsBook.url}
                        target="_blank"
                        rel="noopener"
                        class="flex items-center justify-center w-36 py-4 px-2 border-2 border-solid border-gray-200 rounded-md mt-5"
                      >
                        <Image
                          src={complaintsBook.image.source}
                          alt={complaintsBook.image.alt}
                          width={complaintsBook.image.width || 120}
                          height={complaintsBook.image.height || 80}
                          loading="lazy"
                        />
                      </a>
                    )
                    : (
                      <FooterCollapse
                        title={complaintsBook.title}
                        class="lg:h-40"
                      >
                        <a
                          href={complaintsBook.url}
                          target="_blank"
                          rel="noopener"
                          class="flex items-center justify-center w-28 py-4 px-2 border-2 border-solid border-gray-200 rounded-md"
                        >
                          <Image
                            src={complaintsBook.image.source}
                            alt={complaintsBook.image.alt}
                            width={complaintsBook.image.width || 120}
                            height={complaintsBook.image.height || 80}
                            loading="lazy"
                          />
                        </a>
                      </FooterCollapse>
                    )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Brands
        $device={device}
        connectingDogsAndPeopleText={texts.connectingDogsAndPeopleText}
      />
      <div class="flex justify-center w-full bg-gray-200">
        <div class="flex flex-col lg:flex-row lg:justify-between items-center w-full max-w-screen-2xl font-body-2xs-regular lg:px-8">
          <ul class="flex flex-col lg:flex-row text-center text-gray-500 py-6 gap-2 lg:gap-x-8">
            {institutionalLinks &&
              institutionalLinks.map(({ title, url }) => (
                <li>
                  <a href={url}>
                    {title}
                  </a>
                </li>
              ))}
          </ul>
          {device === "mobile" && <hr class="w-full border-white" />}
          {company && (
            <div class="flex flex-col text-center text-gray-500 p-6 lg:pr-0 gap-2 lg:text-right">
              <p>
                @ {new Date().getFullYear()} {company.name}
              </p>
              <address>
                {company.address}
              </address>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export const loader = (
  props: MenuFooterProps,
  req: Request,
) => {
  const url = new URL(req.url);
  const cookies = getServerCookies(req.headers);
  const languageByPathname = useLanguage(url);

  if (props.selectedMenuItem === "orders" && !!cookies.secure_customer_sig) {
    redirect("/account");
  }

  return {
    ...props,
    url: new URL(req.url),
    selectedLanguage: languageByPathname,
  };
};
