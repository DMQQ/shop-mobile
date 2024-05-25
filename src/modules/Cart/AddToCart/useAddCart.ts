import { useRef, useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import useDelay from "utils/hooks/useDelay";
import { useAppDispatch } from "@utils/hooks/hooks";
import { addCartProduct } from "redux/Cart/CartHttp";

type ResultType = "Added" | "";

export default function useCart(prod_id: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [result, setResult] = useState<ResultType>("");
  const dispatch = useAppDispatch();

  const cancelToken = useRef<CancelTokenSource | null>(null);

  function cancelRequest() {
    cancelToken?.current?.cancel();
  }

  async function addToCartAsync() {
    try {
      setLoading(true);

      cancelToken.current = axios.CancelToken.source();

      await dispatch(
        addCartProduct({ prod_id, cancelToken: cancelToken.current })
      ).unwrap();

      setResult("Added");
    } catch (error: any) {
      setError(error?.["message"]);

      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useDelay(() => setResult(""), 3000, [addToCartAsync]);

  useEffect(() => {
    return () => cancelRequest();
  }, []);

  return { pushToCart: addToCartAsync, loading, error, result, cancelRequest };
}
