import axios, { CancelTokenSource } from "axios";
import { useEffect, useRef, useState } from "react";
import { API } from "@constants/routes";
import { useUser } from "@utils/context/UserContext";
import { useAppDispatch, useAppSelector } from "./hooks";
import { cacheAction } from "redux/Cache/Cache";

interface StateProps<T> {
  data: T | undefined;
  loading: boolean;
  error: string;

  hasMore: boolean;
}

interface SettingsProps<T> {
  /**
   * If present, effect will only activate if the values in the list change.  */
  invalidate?: any[];
  /**
   * fetch data on component mount */
  fetchOnMount?: boolean;
  /**
   * Success response handler, replaces default success response handler **/
  onSuccess?: (
    data: T,
    setState: React.Dispatch<React.SetStateAction<StateProps<T>>>
  ) => any;
  /**
   * Error handler **/
  onError?: (error: unknown) => any;

  /**
   * should retry if response failed **/
  retry?: boolean;

  /**
   * How many times should retry  **/
  retryAttempts?: number;

  /**
   * cache results **/
  cache?: boolean;

  /**
   * Infinite scroll
   */

  infiniteScroll?: boolean;
}

const DEFAULT_OPTIONS = {
  invalidate: [],
  fetchOnMount: true,
  retry: true,
  retryAttempts: 3,
  cache: false,

  infiniteScroll: false,

  defaultPageSize: 5,
};

export default function useFetch<T>(
  path: `/${string}`,
  opt?: SettingsProps<T>
) {
  const options = Object.freeze({ ...DEFAULT_OPTIONS, ...opt });

  const mounted = useRef(false);
  const [state, setState] = useState<StateProps<T>>({
    data: undefined,
    loading: false,
    error: "",

    hasMore: false,
  });

  const [skip, setSkip] = useState(0);

  const { user } = useUser();

  const cache = useAppSelector((state) => state.cache.cache);
  const dispatch = useAppDispatch();

  function onEndReached(_hasMore?: boolean) {
    if (state.hasMore || _hasMore) {
      setSkip((_skip) => _skip + options.defaultPageSize);
    }
  }

  function cacheResponse(data: T) {
    if (options.cache) {
      dispatch(cacheAction.setCacheWithKey({ key: path, data }));
    }
  }

  async function query(
    cancelToken?: CancelTokenSource,
    searchOptions?: Object
  ) {
    if (options.cache && !!cache[path]) {
      return setState({
        loading: false,
        error: "",
        data: cache[path],
        hasMore: false,
      });
    }

    setState((p) => ({
      ...p,
      loading: true,
    }));
    try {
      if (mounted.current === false) return;
      const { data } = await axios.get(API + path, {
        headers: {
          token: user.token,
        },
        params: {
          ...(opt?.infiniteScroll && { skip, take: options.defaultPageSize }),
          ...searchOptions,
        },
        cancelToken: cancelToken?.token,
      });

      cacheResponse(data);

      if (!!options.onSuccess && mounted.current) {
        options?.onSuccess?.(data, setState);
      } else if (mounted.current) {
        setState((prev) => ({
          ...prev,
          loading: false,
          data: data,
          error: "",
          // hasMore: data.hasMore
        }));
      }

      return data as T;
    } catch (error: any) {
      if (!!options.onError) {
        options.onError(error);
      }

      if (!axios.isCancel(error) && mounted.current) {
        setState((p) => ({
          ...p,
          error: error?.response?.data?.message || error.message,
        }));
      }
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }

  type MutateMethods = "put" | "post" | "delete";

  async function mutate(
    httpMethod: MutateMethods,
    url: `/${string}`,
    data = {},
    callback: (arg: [T, T]) => T
  ) {
    return axios({
      baseURL: API + url,
      method: httpMethod,
      headers: {
        token: user.token,
      },
      data,
    }).then(({ data: response }) => {
      setState((prev) => ({
        ...prev,
        data: callback([state.data!, response]),
      }));
    });
  }

  useEffect(() => {
    if (!options.fetchOnMount) return;

    mounted.current = true;
    const cancelToken = axios.CancelToken.source();

    query(cancelToken);

    return () => {
      mounted.current = false;
      cancelToken.cancel();
    };
  }, options.invalidate);

  return { ...state, setState, refetch: query, mutate, onEndReached };
}
