import { Loading3QuartersOutlined, ReloadOutlined } from "@ant-design/icons";
import { useLatest } from "ahooks";
import { Button } from "antd";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchListData } from "./api";
import { Wrapper } from "./style";

const InfiniteScroll: React.FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const latestPagination = useLatest(pagination);
  const [list, setList] = useState<number[]>([]);
  const loadingRef = useRef<HTMLDivElement>(null);
  // 分页获取数据
  const getListData = useCallback(async () => {
    if (latestPagination.current.page > 10) return;
    const data = await fetchListData({
      page: latestPagination.current.page,
      pageSize: latestPagination.current.pageSize,
    });
    setList((prev) => [...prev, ...data]);
    setPagination({
      ...latestPagination.current,
      page: latestPagination.current.page + 1,
    });
  }, [latestPagination.current.page, latestPagination.current.pageSize]);

  // IntersectionObserver构造函数的回调
  const loadMore = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      // 判断是进入/退出视口
      if (entry.isIntersecting) {
        getListData();
      }
    }
  }, []);

  // 重置数据
  const reset = useCallback(()=>{
    setPagination({
      ...latestPagination.current,
      page: 1,
    });
    setList([])
  },[])

  // 创建IntersectionObserver实例，并绑定监听对象
  useEffect(() => {
    const observer = new IntersectionObserver(loadMore);
    observer.observe(loadingRef.current as Element);
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <div className="header">
          <span>数据列表</span>
          <Button type='link' icon={<ReloadOutlined className="icon" /> } onClick={reset}></Button>
        </div>
        <div className="list-wrapper">
          {list.map((item) => (
            <div className="list-item" key={item}>{`list item ${item}`}</div>
          ))}
        </div>
        <div className="footer">
          {pagination.page > 10 ? (
            <div>无更多数据</div>
          ) : (
            <div className="loading" ref={loadingRef}>
              <Loading3QuartersOutlined />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
export default InfiniteScroll;
