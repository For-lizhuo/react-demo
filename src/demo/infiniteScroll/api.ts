export interface IFetchListData {
  page: number;
  pageSize: number;
}

export async function fetchListData(payload: IFetchListData) {
  const { page, pageSize } = payload;
  const start = (page - 1) * pageSize;
  const data = new Array(pageSize).fill(-1).map((_, index) => start + index);
  return Promise.resolve(data);
}
