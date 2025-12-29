import { useLayoutEffect, useRef, useState } from 'react';

function getWidth() {
  const ref = useRef(null);
  const [w, setW] = useState(0);

  useLayoutEffect(() => {
    setW(ref.current?.getBoundingClientRect().width ?? 0);
  }, []);

  return (
    <div ref={ref}>
      Width: {w}px
    </div>
  );
}
export default getWidth;