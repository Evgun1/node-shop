import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { useSearchParams } from 'react-router-dom';

export const usePaginationFetch = (url: string) => {
  const [urlSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>();
  const [productsCount, setProductsCount] = useState<number>();

  const fetchProducts = () => {
    fetch(`${url}?${urlSearchParams}`)
      .then((res) =>
        res.ok && res.status === 200 ? res.json() : new Error(res.statusText)
      )
      .then((data) => {
        setProducts(data.productsArr);
        setProductsCount(parseInt(data.rowCounts));
      })
      .catch((error) => console.log(error));
  };

  useEffect(fetchProducts, []);
  useEffect(fetchProducts, [urlSearchParams]);
  return { products, productsCount };
};

export default usePaginationFetch;
