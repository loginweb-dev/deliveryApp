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
                    name: 'Otra',
                    description: '',
                    coor: {lat: null, lon: null}
                }
            ],
            billValue: false
        }, action
    ) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload};
        case 'SET_LOCATION':
            return {...state, locations: action.payload};
        case 'RELOAD_CART':
            return {...state, cart: action.payload};
        case 'ADD_TO_CART':
            return {...state, cart: [...state.cart, action.payload]};
        case 'REMOVE_FROM_CART':
            var cart = state.cart.filter(cartItem => cartItem.index !== action.payload);
            return {...state, cart: cart};
        case 'UPDATE_LOCATION':
            // var cart = state.cart.filter(cartItem => cartItem.index !== action.payload);
            return {...state, locations: action.payload};
        case 'SET_BILL_VALUE':
        return {...state, billValue: action.payload};
    }
    return state;
}

export default reducerApp;