import { createContext, useContext, useReducer } from 'react';
import { cartReducer } from '../reducers/cartReducer';

const cartInitialState = {
    cartList: [],
    total: 0,
    cartCount: 0
}

const CartContext = createContext(cartInitialState);

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);
    const addToCart = (product) => {
        let updatedCartList;
        if (state.cartList.find(obj => obj.product.id === product.id)) {
            const index = state.cartList.findIndex(obj => obj.product.id === product.id);
            if (index >= 0) {
                updatedCartList = state.cartList;
                updatedCartList[index].qty++;
            }
        }
        else {
            updatedCartList = state.cartList.concat({product, qty:1});
        }
        updateTotal(updatedCartList);
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedCartList
            }
        })
    }

    const removeFromCart = (product) => {
        const updatedCartList = state.cartList.filter(current => current.product.id !== product.id);
        updateTotal(updatedCartList);
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedCartList
            }
        })
    }

    const  removeMoreFromCart = (product, qty) => {
        let updatedCartList;
        if (product.length > 0)
            product = product[0].product;
        if (state.cartList.find(obj => obj.product === product)) {
            const index = state.cartList.findIndex(obj => obj.product === product);
            if (index >= 0) {
                updatedCartList = state.cartList;
                if (updatedCartList[index].qty - parseInt(qty) === 0) {
                    removeFromCart(updatedCartList[index].product);
                }
                else {
                    updatedCartList[index].qty = parseInt(qty);
                    updateTotal(updatedCartList);
                    dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: {
                            products: updatedCartList
                        }
                    })
                }
            }

            
        }
        else {
            console.log('notfound');
        }
    }

    const  clearCart = () => {
        let updatedCartList;
        updatedCartList = [];
        updateTotal(updatedCartList);
        dispatch({
            type: "CLEAR_CART",
            payload: {
                products: updatedCartList
            }
        })
    }

    const updateTotal = (cart) => {
        let total = 0;
        cart.forEach(obj => total = total + (obj.product.price*obj.qty));
        updateCartCount(cart);
        dispatch({
            type: "UPDATE_TOTAL",
            payload: {
                total: total
            }
        })
    }

    const updateCartCount = (cart) => {
        let itemsCount = 0;
        cart.forEach(obj => itemsCount = itemsCount + (obj.qty));
        dispatch({
            type: "CART_COUNT",
            payload: {
                cartCount: itemsCount
            }
        })
    }

    const value = {
        total: state.total,
        cartList: state.cartList,
        cartCount: state.cartCount,
        addToCart,
        removeFromCart,
        removeMoreFromCart,
        clearCart,
        updateTotal,
        updateCartCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}