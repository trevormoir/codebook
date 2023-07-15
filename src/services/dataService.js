function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));
    return {token: token, cbid: cbid };
}

export async function getUser() {
    const browserData = getSession();

    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}
    };

    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${browserData.cbid}`, requestOptions);
    if(!response.ok) {
        throw new Error(`Get user: ${response.statusText}`, { status: response.status });
    }
    const data = await response.json();

    return data;
}

export async function getUserOrders() {
    const browserData = getSession();
    
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${browserData.cbid}`, requestOptions );
    if(!response.ok) {
        throw new Error(`Get user order: ${response.statusText}`, { status: response.status });
    }
    const data = await response.json();

    return data;
}

export async function createOrder(cartList, total, cartCount, user) {
    const browserData = getSession();

    const order = {
        cartList: cartList,
        amount_paid: total,
        quantity: cartCount,
        user: {
            name: user.name, //event.target.name.value,
            email: user.email, //event.target.email.value,
            id: user.id
        }
    }
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`},
        body: JSON.stringify(order)
    }

   const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, requestOptions );
    if(!response.ok) {
        throw new Error(`Create order: ${response.statusText}`, { status: response.status });
    }
    const data = await response.json();
    return data;
}