import LazyIcon from "$components/ui/LazyIcon.tsx";
import { PasswordValidated } from "$sdk/types/password.ts";
import { clx } from "site/sdk/clx.ts";

export const PasswordRequirements = (
  {
    hasLowerCase,
    hasNumber,
    hasSpecialCharacter,
    hasUpperCase,
    quantityCharacter,
  }: PasswordValidated,
) => {
  const hasAllRequirements =
    (hasLowerCase && hasNumber && hasSpecialCharacter && hasUpperCase &&
        quantityCharacter)
      ? "gap-2"
      : "gap-6";

  return (
    <div class="w-full flex flex-col gap-1">
      <p class="font-body-3xs-regular text-gray-500 ml-1 text-justify">
        Sua senha precisa ter no mínimo
      </p>
      <span class={clx("flex justify-center text-justify", hasAllRequirements)}>
        <ul class="list-disc">
          <li
            class={clx(
              "whitespace-nowrap font-body-3xs-regular text-gray-500",
              quantityCharacter >= 6 && "flex",
            )}
          >
            {quantityCharacter >= 6 &&
              (
                <LazyIcon
                  name="Checked"
                  width={18}
                  height={18}
                  class="mr-1 text-blue-400"
                />
              )}
            6 caracteres
          </li>

          <li
            class={clx(
              "whitespace-nowrap font-body-3xs-regular text-gray-500",
              hasNumber && "flex",
            )}
          >
            {hasNumber &&
              (
                <LazyIcon
                  name="Checked"
                  width={18}
                  height={18}
                  class="mr-1 text-blue-400"
                />
              )}
            1 número
          </li>
        </ul>
        <ul class="list-disc">
          <li
            class={clx(
              "whitespace-nowrap font-body-3xs-regular text-gray-500",
              hasUpperCase && "flex",
            )}
          >
            {hasUpperCase &&
              (
                <LazyIcon
                  name="Checked"
                  width={18}
                  height={18}
                  class="mr-1 text-blue-400"
                />
              )}
            1 letra maiúscula
          </li>

          <li
            class={clx(
              "whitespace-nowrap font-body-3xs-regular text-gray-500",
              hasSpecialCharacter && "flex",
            )}
          >
            {hasSpecialCharacter &&
              (
                <LazyIcon
                  name="Checked"
                  width={18}
                  height={18}
                  class="mr-1 text-blue-400"
                />
              )}
            1 caracter especial ($,#,@,!)
          </li>
        </ul>
        <ul class="list-disc">
          <li
            class={clx(
              "whitespace-nowrap font-body-3xs-regular text-gray-500",
              hasLowerCase && "flex",
            )}
          >
            {hasLowerCase &&
              (
                <LazyIcon
                  name="Checked"
                  width={18}
                  height={18}
                  class="mr-1 text-blue-400"
                />
              )}
            1 letra minúscula
          </li>
        </ul>
      </span>
    </div>
  );
};
