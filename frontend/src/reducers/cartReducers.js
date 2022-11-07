import { CART_ADD_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload; // Item contain ID , 
            const existItem = state.cartItems.find(x => x.product === item.product); // 
            if (existItem) {
                return {
                    ...state,
                    // Upate Current CartIems with QTY of the product
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    // Push the Item inot The cartItems 
                    cartItems: [...state.cartItems, item]
                }
            }
        default:
            return state
    }
}