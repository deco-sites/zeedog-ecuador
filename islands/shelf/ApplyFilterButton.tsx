const updateHref = () => {
  const url = removeFilterParams();
  // console.log(url);
  const checkedFilters = document.querySelectorAll(
    "input.mobile-filter:checked",
  );
  if (checkedFilters && checkedFilters.length > 0) {
    checkedFilters.forEach((filter) => {
      const filterValue = filter.getAttribute("value")?.split("=");
      if (filterValue) {
        url.searchParams.append(filterValue[0], filterValue[1]);
      }
    });
  }

  const partialButton = document.getElementById("filter-mobile-button");
  if (!partialButton) return;

  const fPartialAttr = partialButton.getAttribute("f-partial");
  if (!fPartialAttr) return;

  // console.log("ATRIBUTO: ", fPartialAttr);
  const fPartial = fPartialAttr.replace(
    /href=.*?(?=&pathTemplate)/,
    `href=${url.pathname}${encodeURIComponent(url.search)}`,
  );
  partialButton.setAttribute("f-partial", fPartial);
  // console.log(fPartial);
  partialButton.click();
};

function removeFilterParams() {
  const url = new URL(document.location.href);
  const params = new URLSearchParams(url.search);

  // Use forEach to iterate over the parameters
  params.forEach((_, key) => {
    if (key.includes("filter")) {
      params.delete(key);
    }
  });

  // Update the URL with the filtered parameters
  url.search = params.toString();
  return url;
}

export default function ApplyFilterButton(
  { applyText }: { applyText: string },
) {
  return (
    <label
      for="hide-filters"
      class="flex items-center justify-center w-40 h-11 border border-black rounded-full focus:bg-black focus:bg-opacity-10 transition-all font-title-xs-bold"
      onClick={() => updateHref()}
    >
      {applyText}
    </label>
  );
}
