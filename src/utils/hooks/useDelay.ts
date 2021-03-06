import { useEffect } from "react";

export default function useDelay(
  fn: () => void,
  timeout: number,
  deps: any[] = []
) {
  useEffect(() => {
    const id = setTimeout(fn, timeout);

    return () => clearTimeout(id);
  }, deps);
}
