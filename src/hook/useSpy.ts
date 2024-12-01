import { useCallback, useEffect, useRef, useState } from "react";

type ScrollDirection = "UP" | "DOWN";

export const useSpyElem = (elemHeight: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [marginTop, setMarginTop] = useState(0);
  const prevScrollTop = useRef(0);
  const prevDirection = useRef<ScrollDirection>("DOWN");
  const transitionPoint = useRef(elemHeight);

  const onScroll = useCallback(() => {
    const currScrollTop =
      document?.documentElement?.scrollTop || document?.body?.scrollTop || 0;
    const nextDirection = prevScrollTop.current > currScrollTop ? "UP" : "DOWN";

    const isUpTransition = prevDirection.current === "DOWN" && nextDirection === "UP";
    const isDownTransition = prevDirection.current === "UP" && nextDirection === "DOWN";

    const NextBottomPoint = currScrollTop + elemHeight;

    if (isUpTransition && transitionPoint.current < currScrollTop) {
      transitionPoint.current = prevScrollTop.current;
    }

    if (isDownTransition && NextBottomPoint < transitionPoint.current) {
      transitionPoint.current = prevScrollTop.current + elemHeight;
    }

    const newMargin = Math.min(
      0,
      Math.max(-elemHeight, transitionPoint.current - NextBottomPoint)
    );
    setMarginTop(newMargin);

    prevDirection.current = nextDirection;
    prevScrollTop.current = currScrollTop;
  }, [elemHeight]);

  useEffect(() => {
    const scrollTop = document.documentElement?.scrollTop || document.body.scrollTop;
    transitionPoint.current = scrollTop + elemHeight;
    prevScrollTop.current = scrollTop;
  }, [elemHeight]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return { ref, marginTop };
};
