export const cartReducer = (state, action) => {
    const {type, payload} = action;
  
    switch(type) {       
      case "ADD_TO_CART":
          return {...state, cartList: payload.products}
  
      case "REMOVE_FROM_CART":
          return {...state, cartList: payload.products}

      case "CLEAR_CART":
          return {...state, cartList: []}
  
      case "UPDATE_TOTAL":
          return {...state, total: payload.total}

      case "CART_COUNT":
          return {...state, cartCount: payload.cartCount}
  
      default:
          throw new Error("No Case found In cartReducer")
    }
  }
  