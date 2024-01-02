const productLoader = async (params) => {
    const id = params.params.id;

    const response = await fetch(`http://localhost:5000/products/${id}`);
    if (!response.ok || response.status !== 200) {
        throw new Error(response.statusText);
    }

    const product = await response.json();
    return { product };
};

export default productLoader;
