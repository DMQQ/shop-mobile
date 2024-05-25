import removeDuplicatesById from "../../functions/RemoveRepetition";
import axios from "axios";
import { ProductTypeProps } from "modules/Product";
import { useEffect, useState } from "react";
import { useAppSelector } from "utils/hooks/hooks";

export default function useFetchProducts(path: string) {
  const [data, setData] = useState<ProductTypeProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const usr = useAppSelector((s) => s.user);

  function onEndReached() {
    if (!hasMore || loading) return;
    setSkip((p) => p + 5);
  }

  useEffect(() => {
    (async () => {
      const cancelToken = axios.CancelToken.source();

      setLoading(true);
      try {
        const response = await axios.get(path, {
          cancelToken: cancelToken.token,
          params: { skip },
          headers: {
            token: usr.token,
          },
        });

        setData((prev) =>
          removeDuplicatesById([...prev, ...response.data.results], "prod_id")
        );
        setHasMore(response.data.hasMore);
      } catch (error: any) {
        setError(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }

      return () => cancelToken.cancel();
    })();
  }, [skip]);

  return { data, loading, error, onEndReached };
}
