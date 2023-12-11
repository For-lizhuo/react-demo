import * as React from "react";
import { useLayoutEffect, useRef } from "react";
import { Image } from "./style";

export interface LazyLoadImageProps {
  src: string;
  width?: string;
  height?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  root?: Element;
}
const LazyLoadImage: React.FC<LazyLoadImageProps> = (props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const loadImage = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      // 判断图片进入视口
      if (entry.isIntersecting) {
        const image = imageRef.current as HTMLImageElement;
        image.src = image.dataset.src as string;
      }
    }
  };
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(loadImage, {
      root: props.root ?? document,
      rootMargin: "0px 0px 20px 0px",
    });
    observer.observe(imageRef.current as HTMLImageElement);
  }, []);
  return (
    <Image data-src={props.src} alt="懒加载图片" ref={imageRef} props={props} />
  );
};
export default LazyLoadImage;
