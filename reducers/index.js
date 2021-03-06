import { AsyncStorage } from 'react-native';

// Guardar la fecha de creación del carrito de compra para que solo dure 1 día
const getDate = async () => {
    var date = new Date();
    var dateNow = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    await AsyncStorage.setItem('dateNow', dateNow);
}

const reducerApp = (
        state = {
            user: {},
            cart:[],
            cartObservations: '',
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
            billValue: false,
            tokenDevice: null,
        }, action
    ) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload};
        case 'SET_LOCATION':
            return {...state, locations: action.payload};
        case 'RELOAD_CART':
            getDate();
            return {...state, cart: action.payload};
        case 'ADD_TO_CART':
            getDate();
            return {...state, cart: [...state.cart, action.payload]};
        case 'REMOVE_FROM_CART':
            var cart = state.cart.filter(cartItem => cartItem.index !== action.payload);
            return {...state, cart: cart};
        case 'SET_CART_OBSERVATIONS':
            return {...state, cartObservations: action.payload};
        case 'UPDATE_LOCATION':
            return {...state, locations: action.payload};
        case 'SET_BILL_VALUE':
            return {...state, billValue: action.payload};
        case 'SET_TOKEN_DEVICE':
            return {...state, tokenDevice: action.payload};
    }
    return state;
}

export default reducerApp;