import { debounce } from "@/utils";
import { useState } from "react";
import { useComponentLifecycle } from ".";

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export function useWindowSize() {
  const [size, setSize] = useState(() => getSize());
  const updateSize = debounce(() => {
    if (!window) return;
    setSize(getSize());
  }, 300);

  useComponentLifecycle({
    async mounted() {
      window.addEventListener("resize", updateSize);
    },
    unmounted() {
      window.removeEventListener("resize", updateSize);
    },
  });

  return [size];
}
