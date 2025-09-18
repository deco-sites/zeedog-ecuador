import Icon from "$components/ui/Icon.tsx";

export interface MyProfileProps {
  myProfileText: string;
}

export function AccountMO({ myProfileText }: MyProfileProps) {
  return (
    <a
      href="/account"
      class="flex items-center gap-2.5 px-6 h-14 font-body-xs-regular text-gray-600"
      tabIndex={0}
    >
      <Icon
        name="MyAccount"
        width={20}
        height={20}
        class="fill-transparent"
      />
      {myProfileText}
    </a>
  );
}
