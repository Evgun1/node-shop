import { useEffect, useState } from 'react';

const useFetchProductsById = (productsArray, returnAmount = true) => {
    const [products, setProducts] = useState([]);
    console.log(productsArray);
    useEffect(() => {
        const fetchProduct = async () => {
            if (productsArray && productsArray.length) {
                const productsID = [];
                productsArray.forEach((element) => {
                    productsID.push(element.item_id)
                });
                const response = await fetch(
                    'http://localhost:5000/products/?ids=' + productsID,
                    {
                        body: JSON.stringify(),
                    }
                );
                if (!response.ok && response.status !== 200)
                    throw new Error(response.statusText);

                const data = await response.json();

                if (returnAmount) {
                    const output = [];
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
                setProducts(null);
            }
        };

        fetchProduct();
    }, [productsArray]);

    return products;
};

export default useFetchProductsById;
