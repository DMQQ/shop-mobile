import { SkeletonPlaceholder } from "components";
import { Padding } from "constants/styles";
import { useState } from "react";
import {
  VirtualizedList,
  View,
  Text,
  useWindowDimensions,
  VirtualizedListProps,
  ActivityIndicator,
} from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import useInfiniteScrolling from "./useInfiniteScrolling";

type Dims = { width: number; height: number };

interface InfiniteScrollProps<T> extends Omit<VirtualizedListProps<T>, "data"> {
  orientation: "vertical" | "horizontal";
  path: `/${string}`;
  heading?: string;
  showLoadMoreSpinner?: boolean;

  placeholderDimenssions?: Partial<Dims> | ((prop: Dims) => Dims);
}

export default function InfiniteScroll<T>({
  orientation,
  renderItem,
  keyExtractor,
  getItem,
  getItemCount,
  path,
  heading,
  showLoadMoreSpinner = true,
  placeholderDimenssions,
  ...rest
}: InfiniteScrollProps<T>) {
  const [options, setOptions] = useState({});

  const { data, onSkip, loading } = useInfiniteScrolling<T, typeof options>(
    path,
    options
  );
  const { width, height } = useWindowDimensions();

  const { theme } = useColorTheme();

  const placeholderDimenssionsValue =
    typeof placeholderDimenssions === "function"
      ? placeholderDimenssions({ width, height })
      : placeholderDimenssions;

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      {loading && data.length === 0 && (
        <SkeletonPlaceholder
          size={
            placeholderDimenssionsValue ||
            ({ width: width - 20, height: 250 } as any)
          }
        >
          <View
            style={{
              width,
              height: placeholderDimenssionsValue?.height || 250,
              alignItems: "center",
            }}
          >
            <SkeletonPlaceholder.Item
              height={placeholderDimenssionsValue?.height || 250}
              width={placeholderDimenssionsValue?.width || width - 40}
            />
          </View>
        </SkeletonPlaceholder>
      )}

      <VirtualizedList
        removeClippedSubviews={true}
        windowSize={5}
        onEndReachedThreshold={0.5}
        onEndReached={onSkip}
        horizontal={orientation === "horizontal"}
        getItem={getItem}
        getItemCount={getItemCount}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          !!heading ? (
            <Text style={{ fontSize: 25, color: "white" }}>{heading}</Text>
          ) : null
        }
        ListFooterComponent={
          showLoadMoreSpinner && loading ? (
            <View
              style={{
                width,
                padding: Padding.medium,
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size={"large"} color="#fff" />
            </View>
          ) : null
        }
        {...rest}
      />
    </View>
  );
}
