import { useIsFocused } from "@react-navigation/native";
import ScreenContainer from "components/ui/ScreenContainer";
import { useEffect } from "react";
import { VirtualizedList } from "react-native";
import ActiveFiltersList from "../components/ActiveFiltersList";
import type { SearchNestedScreenProps, SuggestionType } from "/@types/types";
import InputHeaderControll from "../components/InputHeaderControll";
import useSearch from "../hooks/useSearch";
import { Suggestion } from "components";

const getItem = (data: SuggestionType[], index: number) => {
  return data[index];
};

export default function Searched({
  navigation,
}: SearchNestedScreenProps<"Searched">) {
  const isFocused = useIsFocused();
  const { getSuggestionsAsync, results, onEndReached, skip, searchedText } =
    useSearch();

  useEffect(() => {
    const promise = getSuggestionsAsync(true);

    return () => promise.abort();
  }, [skip, searchedText, isFocused]);

  return (
    <ScreenContainer>
      <InputHeaderControll mode="display" />
      <ActiveFiltersList
        handleOpenFilters={() =>
          navigation.navigate("Filters", {
            focusedFilter: "search",
          })
        }
      />
      <VirtualizedList
        style={{ marginTop: 15, flex: 1 }}
        data={results}
        onEndReached={onEndReached}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        getItemCount={(data) => data.length}
        getItem={getItem}
        initialNumToRender={2}
        renderItem={({ item, index }) => <Suggestion index={index} {...item} />}
      />
    </ScreenContainer>
  );
}
