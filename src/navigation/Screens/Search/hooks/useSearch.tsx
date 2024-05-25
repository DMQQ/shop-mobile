import { useUser } from "@utils/context/UserContext";
import { getSearchedProducts, searchActions } from "redux/Search/search";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";

export default function useSearch() {
  const {
    user: { token },
  } = useUser();

  const { filters, searchedText, skip, response, isChanged } = useAppSelector(
    (state) => state.search
  );

  const dispatch = useAppDispatch();

  const onEndReached = () => dispatch(searchActions.nextPage());

  const getSearchedAsync = (fetchMore: boolean) =>
    dispatch(
      getSearchedProducts({
        filters: filters,
        skip,
        token,
        searchedText,
        isInfiniteScroll: fetchMore,
      })
    );

  return {
    getSuggestionsAsync: getSearchedAsync,
    results: response.results,
    onEndReached,
    skip,
    hasMore: response.hasMore,
    searchedText,
    isChanged,
  };
}
