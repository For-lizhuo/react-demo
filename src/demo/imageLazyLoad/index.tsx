import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { fetchImageSrcList } from "./api";
import LazyLoadImage from "./LazyLoadImage";
import { Wrapper } from "./style";

const ImageLazyLoad: React.FC = () => {
  const [imageSrcList, setImageSrcList] = useState<string[]>([]);
  const getListData = useCallback(async () => {
    const data = await fetchImageSrcList();
    setImageSrcList(data);
  }, []);
  useEffect(() => {
    getListData();
  }, []);
  return (
    <Wrapper className="wrapper">
      <div className="title">图片列表</div>
      {imageSrcList.map((url, index) => (
        <div key={index} className="image-wrapper">
          <LazyLoadImage
            src={url}
            height="200px"
            width="400px"
            root={document.getElementsByClassName("wrapper")[0]}
          />
        </div>
      ))}
    </Wrapper>
  );
};
export default ImageLazyLoad;
