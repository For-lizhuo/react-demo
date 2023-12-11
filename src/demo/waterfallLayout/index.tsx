import { useLatest, useThrottleFn } from "ahooks";
import * as React from "react";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { fetchImageSrcList } from "./api";
import { Wrapper } from "./style";

interface Position {
  left: number;
  top: number;
}

const WaterfallLayout: React.FC = () => {
  const [imageSrcList, setImageSrcList] = useState<string[]>([]);
  const latestImageSrcList = useLatest(imageSrcList);
  const [positionList, setPositionList] = useState<Position[]>([]);
  const getImageSrcList = useCallback(async () => {
    const data = await fetchImageSrcList();
    setImageSrcList(data);
  }, []);
  const getMin = useCallback((arr: number[]) => {
    if (arr.length <= 0) return [-1, -Infinity];
    let minIndex = 0,
      minValue = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < minValue) {
        minIndex = i;
        minValue = arr[i];
      }
    }
    return [minIndex, minValue];
  }, []);
  const { run: layout } = useThrottleFn(
    () => {
      if (latestImageSrcList.current.length === 0) return;
      const container = document.getElementsByClassName("wrapper")[0];
      const imageList = document.querySelectorAll(".image-wrapper");
      // 容器元素的宽度
      const containerWidth = container.getBoundingClientRect().width;
      // 图片元素的宽度
      const imageWidth = imageList[0].getBoundingClientRect().width;
      // 一行能够排列的图片数量
      const columnCount = Math.floor(containerWidth / imageWidth);
      const list: Position[] = [];
      for (
        let i = 0, column = 0, heightList = new Array(columnCount).fill(0);
        i < latestImageSrcList.current.length;
        i++
      ) {
        if (i < columnCount) {
          column = i;
          list[i] = {
            top: 0,
            left: column * imageWidth,
          };
        } else {
          const [index, minHeight] = getMin(heightList);
          column = index;
          list[i] = {
            top: minHeight,
            left: column * imageWidth,
          };
        }
        const imageHeight = imageList[i].getBoundingClientRect().height;
        heightList[column] += imageHeight;
      }
      setPositionList(list);
    },
    {
      wait: 100,
    }
  );
  useEffect(() => {
    window.addEventListener("resize", layout);
  }, []);
  useEffect(() => {
    getImageSrcList();
  }, []);
  useLayoutEffect(() => {
    layout();
  }, [imageSrcList]);
  return (
    <Wrapper className="wrapper">
      {imageSrcList.map((url, index) => (
        <div
          className="image-wrapper"
          key={index}
          style={{
            top: positionList[index]?.top ?? 0 + "px",
            left: positionList[index]?.left ?? 0 + "px",
          }}
        >
          <img src={url} alt="瀑布流图片" />
        </div>
      ))}
    </Wrapper>
  );
};
export default WaterfallLayout;
