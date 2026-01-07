import { useCallback, useEffect, useState } from "react";

/**
 * Track focus state for any element.
 * @example
 * const { ref, isFocused } = useFocus();
 * return (
 *   <div ref={ref} tabIndex={0} className={isFocused ? styles.focused : ""}>
 *     Focus me
 *   </div>
 * );
 */
export function useFocus() {
  const [isFocused, setIsFocused] = useState(false);
  const [node, setNode] = useState(null);

  const ref = useCallback((element) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node) {
      setIsFocused(false);
      return undefined;
    }

    const onFocusIn = () => setIsFocused(true);
    const onFocusOut = () => setIsFocused(false);

    // Use focusin/focusout to track focus within the element.
    node.addEventListener("focusin", onFocusIn);
    node.addEventListener("focusout", onFocusOut);

    return () => {
      node.removeEventListener("focusin", onFocusIn);
      node.removeEventListener("focusout", onFocusOut);
      setIsFocused(false);
    };
  }, [node]);

  return { ref, isFocused };
}
