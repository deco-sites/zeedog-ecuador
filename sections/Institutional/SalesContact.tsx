import { Distributor } from "$loaders/distributors.ts";

interface Props {
  title: string;
  /**
   * @maxItems 4
   */
  tableContents: string[];
  distributors: Distributor[];
}

export default function AboutUs(
  { title, tableContents = [], distributors = [] }: Props,
) {
  if (tableContents.length === 0 || distributors.length === 0) return null;

  return (
    <div class="flex flex-col gap-6 lg:gap-10 items-center justify-center container max-w-3xl mx-auto px-4 py-12">
      <h1 class="font-bold text-3xl text-center">
        {title || "International Wholesale Distributors"}
      </h1>

      <div class="w-full overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              {tableContents.map((content, idx) => (
                <th
                  key={idx}
                  class="font-bold py-3 px-4 text-left border-none !bg-transparent"
                >
                  {content}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {distributors.map((d, idx) => (
              <tr
                key={idx}
                class="text-sm border-t border-t-gray-20"
              >
                <td class="py-3 px-4 border-none">
                  {d.region}
                </td>
                <td class="py-3 px-4 border-none">
                  {d.country}
                </td>
                <td class="py-3 px-4 border-none">
                  {d.distributor}
                </td>
                <td class="py-3 px-4 border-none">
                  {d.contact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
