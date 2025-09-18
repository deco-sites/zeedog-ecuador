import { SearchEvent } from "apps/commerce/types.ts";

interface SearchEventProps {
  searchTerm: string;
}

/**
 * Log this event to indicate when the user has performed a search.
 * You can use this event to identify what users are searching for on your website or app.
 * For example, you could send this event when a user views a search results page after performing a search.
 */
export const searchEvent = (
  { searchTerm }: SearchEventProps,
) => {
  const event: SearchEvent = {
    name: "search",
    params: {
      search_term: searchTerm,
    },
  };

  return event;
};
