import { useEffect, useState } from 'react';
import { CartItemData } from '../store/cart/cart';
import { Product } from '../types/product';

const useFetchProductsById = (
  productsArray: CartItemData[],
  returnAmount = true
) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProduct = async () => {
      if (productsArray && productsArray.length) {
        const productsID: Number[] = [];
        productsArray.forEach((element) => {
          productsID.push(element.productID);
        });
        const response = await fetch(
          'http://localhost:5000/products/?ids=' + productsID
        );
        if (!response.ok && response.status !== 200)
          throw new Error(response.statusText);

        const data = (await response.json()) as Product[];

        if (returnAmount) {
          const output: Product[] = [];
          data.forEach((item) => {
            const index = productsArray.findIndex(
              (element) => element.productID === item.product_id
            );
            if (index !== -1) {
              output.push({
                ...item,
                amount: productsArray[index].amount,
              });
            } else {
              output.push(item);
            }
          });
          setProducts(output);
        } else {
          setProducts(data);
        }

        return data;
      } else {
        setProducts([]);
      }
    };

    fetchProduct();
  }, [productsArray]);

  return products;
};

export default useFetchProductsById;
