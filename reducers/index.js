const reducerApp = (
        state = {
            user: {},
            cart:[],
            config: {},
            locations:[
                {
                    name: 'Casa',
                    description: '',
                    coor: {lat: null, lon: null}
                },
                {
                    name: 'Trabajo',
                    description: '',
                    coor: {lat: null, lon: null}
                },
                {
                    name: 'Otro',
                    description: '',
                    coor: {lat: null, lon: null}
                }
            ]
        }, action
    ) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload};
        case 'RELOAD_CART':
            return {...state, cart: action.payload};
        case 'ADD_TO_CART':
            return {...state, cart: [...state.cart, action.payload]};
        case 'REMOVE_FROM_CART':
            var cart = state.cart.filter(cartItem => cartItem.index !== action.payload);
            return {...state, cart: cart};
    }
    return state;
}

export default reducerApp;