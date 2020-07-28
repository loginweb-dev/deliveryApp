export const Settings = {
    aboutUs: {
        name: '',
        description: `Abrimos  muestras puertas a mediados de 2016, y desde entonces  no hemos parado de ganar seguidores  por tres motivos: la receta de nuestra masa estilo italiana  que elaboramos con total dedicación , las largas fermentaciones que se dedican a la misma  y los ingredientes cuidadosamente seleccionados que  se usan nuestras  pizzas.
Estamos obsesionados con buscar   la perfección tanto en la atención a nuestros clientes  como en nuestras pizzas , para que siempre puedas disfrutar una deliciosa 🍕TATU  en el menor tiempo posible  y con el la calidad calidez humana que nos caracteriza a la hora de entenderte.`,
        background: require('../assets/images/banner.png'),
        address: [
            {
                details: 'Av 27 de mayo diagonal madre Trinitaria',
                location: {
                    latitude: -14.8302922,
                    longitude: -64.9120521,
                }
            },
            {
                details: 'Delipark',
                location: {
                    latitude: -14.819089,
                    longitude: -64.903664,
                }
            },
        ],
        phones: ['75195380'],
        email: ['pedidos@pizzastatu.com'],
        social: [
            {name: 'Facebook', icon: 'logo-facebook', url: 'https://www.facebook.com/PizzasTatu'},
            {name: 'Instagram', icon: 'logo-instagram', url: 'https://www.instagram.com/pizzas_tatu'},
            // {name: 'Twitter', icon: 'logo-twitter', url: 'https://twitter.com/'},
            // El número de celular de WhatsApp va con el código de país sin el signo +
            {name: 'WhatsApp', icon: 'logo-whatsapp', url: 'whatsapp://send?phone=59175195380'},
        ]
    },
    aboutDev: {
        description: 'La presente aplicación móvil fue desarrollada por la empresa de tecnología LoginWeb.',
        url: 'http://loginweb.dev',
        addess: 'Urbanización Santa Inés Av. David Shriqui ',
        city: 'Santísima Trinidad - Beni - Bolivia'
    }
}

export const Products = [
    {
        'id': 1,
        'name': 'Hamburguesa sencilla',
        'details': 'Carne, ensalada, salsa y huevo.',
        'price': '15.00',
        'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/08/abstract-1238262_960_720.jpg',
        'similar': [],
        'extras': [
            {
                id: 1,
                name: 'Papas',
                price: '5.00',
                ckecked: false
            },
            {
                id: 2,
                name: 'Tocino',
                price: '5.00',
                ckecked: false
            },
            {
                id: 3,
                name: 'Salsa',
                price: '3.00',
                ckecked: false
            },
            {
                id: 4,
                name: 'Huevo',
                price: '2.00',
                ckecked: false
            },
        ],
        'slug': 'Hamburguesa-sencilla',
    },
    {
        'id': 2,
        'name': 'Hamburguesa doble',
        'details': 'Doble carne, ensalada, salsa y huevo.',
        'price': '20.00',
        'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238459__340.jpg',
        'similar': [
            {
                'id': 2,
                'name': 'Hamburguesa doble',
                'details': 'Doble carne, ensalada, salsa y huevo.',
                'price': '20.00',
                'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238459__340.jpg',
                'typeId': 1,
                'typeName': 'Pequeña'
            },
            {
                'id': 3,
                'name': 'Hamburguesa doble',
                'details': 'Doble carne, ensalada, salsa y huevo.',
                'price': '22.00',
                'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238459__340.jpg',
                'typeId': 2,
                'typeName': 'Mediana'
            },
            {
                'id': 4,
                'name': 'Hamburguesa sencilla',
                'details': 'Carne, ensalada, salsa y huevo.',
                'price': '25.00',
                'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/08/abstract-1238262_960_720.jpg',
                'typeId': 3,
                'typeName': 'Familiar'
            },
        ],
        'extras': [
            {
                id: 1,
                name: 'Papas',
                price: '5.00',
                ckecked: false
            },
            {
                id: 2,
                name: 'Tocino',
                price: '5.00',
                ckecked: false
            },
            {
                id: 3,
                name: 'Salsa',
                price: '3.00',
                ckecked: false
            },
        ],
        'slug': 'Hamburguesa-doble',
    },
    {
        'id': 3,
        'name': 'Lomito',
        'details': 'Lomito de carne, ensalada, salsa y huevo.',
        'price': '18.00',
        'image': 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg',
        'similar': [
            {
                'id': 3,
                'name': 'Lomito',
                'details': 'Lomito de carne, ensalada, salsa y huevo.',
                'price': '18.00',
                'image': 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg',
                'typeId': 1,
                'typeName': 'Pequeña'
            },
            {
                'id': 4,
                'name': 'Lomito',
                'details': 'Lomito de carne, ensalada, salsa y huevo.',
                'price': '22.00',
                'image': 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg',
                'typeId': 2,
                'typeName': 'Mediana'
            },
            {
                'id': 5,
                'name': 'Lomito',
                'details': 'Lomito de carne, ensalada, salsa y huevo.',
                'price': '25.00',
                'image': 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg',
                'typeId': 3,
                'typeName': 'Familiar'
            },
        ],
        'extras': [
            {
                id: 1,
                name: 'Papas',
                price: '5.00',
                ckecked: false
            },
            {
                id: 3,
                name: 'Salsa',
                price: '3.00',
                ckecked: false
            },
            {
                id: 4,
                name: 'Huevo',
                price: '2.00',
                ckecked: false
            },
        ],
        'slug': 'lomito',
    },
    {
        'id': 4,
        'name': 'Hamburguesa Completa',
        'details': 'Carne, ensalada, salsa, tocino y huevo.',
        'price': '18.00',
        'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238457__340.jpg',
        'similar': [
            {
                'id': 4,
                'name': 'Hamburguesa Completa',
                'details': 'Carne, ensalada, salsa, tocino y huevo.',
                'price': '18.00',
                'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238457__340.jpg',
                'typeId': 1,
                'typeName': 'Pequeña'
            },
            {
                'id': 5,
                'name': 'Hamburguesa Completa',
                'details': 'Carne, ensalada, salsa, tocino y huevo.',
                'price': '20.00',
                'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238457__340.jpg',
                'typeId': 2,
                'typeName': 'Mediana'
            },
            {
                'id': 6,
                'name': 'Hamburguesa Completa',
                'details': 'Carne, ensalada, salsa, tocino y huevo.',
                'price': '25.00',
                'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238457__340.jpg',
                'typeId': 3,
                'typeName': 'Familiar'
            },
        ],
        'extras': [
            {
                id: 2,
                name: 'Tocino',
                price: '5.00',
                ckecked: false
            },
            {
                id: 3,
                name: 'Salsa',
                price: '3.00',
                ckecked: false
            },
            {
                id: 4,
                name: 'Huevo',
                price: '2.00',
                ckecked: false
            },
        ],
        'slug': 'Hamburguesa-Completa',
    }
];

export const Categories = [
    {
        id: 10,
        title: '20% de descuento',
        subtitle: 'Oferta semanal en todos los productos',
        image: 'https://cdn.pixabay.com/photo/2017/10/30/08/41/black-friday-2901748_960_720.png',
        type: 'offert'
    },
    {
        id: 1,
        title: 'Hamburguesas',
        subtitle: 'Las mejores hamburguesas caseras',
        image: 'https://cdn.pixabay.com/photo/2015/04/20/13/25/burger-731298_960_720.jpg',
        type: 'category'
    },
    {
        id: 2,
        title: 'Gaseosas',
        subtitle: 'Variedad de sabores',
        image: 'https://cdn.pixabay.com/photo/2017/09/12/04/42/soft-drink-2741251_960_720.jpg',
        type: 'category'
    },
    {
        id: 3,
        title: 'Postres',
        subtitle: 'La mejor variedad en postres',
        image: 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_960_720.jpg',
        type: 'category'
    }
];

export const Orders = [
    {
        id: 1,
        code: '00001',
        details: 'Product 1, Product 4, Product 3',
        amount: "25.00",
        status: 1,
        statusName: 'En proceso',
        date: 'Hace 1 dias',
        tracking: [
            {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
            {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
            {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
            {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
        ]
    },
    {
        id: 2,
        code: '00002',
        details: 'Product 1, Product 5, Product 3',
        amount: "25.00",
        status: 0,
        statusName: 'En proceso',
        date: 'Hace 2 dias',
        tracking: [
            {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
            {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
        ]
    },
    {
        id: 3,
        code: '00003',
        details: 'Product 1, Product 2, Product 3',
        amount: "25.00",
        status: 1,
        statusName: 'En proceso',
        date: 'Hace 1 mes',
        tracking: [
            {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
            {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
            {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
            {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
            {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
        ]
    }
];