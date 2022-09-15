import { useEffect } from "react";

export function useComponentLifecycle({
  mounted,
  unmounted,
}: {
  mounted: () => void;
  unmounted?: () => void;
}) {
  useEffect(() => {
    mounted();
    return () => {
      unmounted && unmounted();
    };
    // eslint-disable-next-line
  }, []);
}
