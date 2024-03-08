const useCustomFetch = async (url: string, searchParams: any) => {
  const urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(`${url}?${urlSearchParams}`);
  if (!res.ok && res.status !== 200) {
    throw new Error('');
  }

  const data = await res.json();
  const productsData: any = data.productsArr;
  const productsCount: number = parseInt(data.rowCounts);

  return { productsData, productsCount };
};

export default useCustomFetch;
