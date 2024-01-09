import { LoaderFunction } from "react-router-dom";
import { Product } from "../types/product";

const productLoader:LoaderFunction = async ({params}) => {
    const id = params.id;

    const response = await fetch(`http://localhost:5000/products/${id}`);
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText);
    }

    const product = await response.json() as Product;
    return { product };
};

export default productLoader;
export type ProductLoaderData = Awaited<ReturnType<typeof productLoader>>;