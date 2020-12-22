import { useEffect } from "react";

const root = document.getElementById("root");

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler(e);
    };

    root.addEventListener("mousedown", listener);

    return () => {
      root.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export { useOnClickOutside };
