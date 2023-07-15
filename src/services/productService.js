export async function getProductList(queryTerm) {
    const response = await fetch(`${process.env.REACT_APP_HOST}/444/products${queryTerm && queryTerm.length > 0 ? "?q="+queryTerm : ""}`);
    if(!response.ok) {
        throw new Error(`Product List: ${response.statusText}`, { status: response.status });
    }
    const data = await response.json();

    return data;
}

export async function getProduct(id) {
    const response = await fetch(`${process.env.REACT_APP_HOST}/444/products/${id}`);
    if(!response.ok) {
        throw new Error(`Get product: ${response.statusText}`, { status: response.status });
    }
    const data = await response.json();

    return data;
}

export async function getFeaturedList() {
    const response = await fetch(`${process.env.REACT_APP_HOST}/444/featured_products`);
    if(!response.ok) {
        throw new Error(`Featured List: ${response.statusText}`, { status: response.status });
    }
    const data = await response.json();

    return data;
}