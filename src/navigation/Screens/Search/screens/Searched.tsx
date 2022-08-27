import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import ScreenContainer from "components/ScreenContainer";
import { useEffect } from "react";
import { VirtualizedList } from "react-native";
import ActiveFiltersList from "../components/ActiveFiltersList";
import type { SearchNestedScreenProps, SuggestionType } from "/@types/types";
import InputHeaderControll from "../components/InputHeaderControll";
import useSearch from "../hooks/useSearch";
import { Suggestion } from "components";
import { useAppSelector } from "utils/hooks/hooks";
import useDelay from "utils/hooks/useDelay";

const getItem = (data: SuggestionType[], index: number) => {
  return data[index];
};

export default function Searched({
  navigation,
}: SearchNestedScreenProps<"Searched">) {
  const isFocused = useIsFocused();
  const { searchedText } = useAppSelector((state) => state.search);
  const { getSuggestionsAsync, suggestion } = useSearch();

  // Apply infinite scroll

  useDelay(
    () => {
      if (isFocused) {
        let cancelToken = axios.CancelToken.source();
        getSuggestionsAsync(cancelToken, searchedText);

        return () => cancelToken.cancel();
      }
    },
    500,
    [isFocused]
  );

  return (
    <ScreenContainer>
      <InputHeaderControll mode="display" />
      <ActiveFiltersList
        handleOpenFilters={() => navigation.navigate("Filters")}
      />
      <VirtualizedList
        style={{ marginTop: 15 }}
        data={suggestion.results}
        //    onEndReached={onEndReached}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        getItemCount={(data) => data.length}
        getItem={getItem}
        initialNumToRender={2}
        renderItem={({ item, index }) => <Suggestion index={index} {...item} />}
      />
    </ScreenContainer>
  );
}
