export const Config = {
    appName: "SkotBurger",
    appDescription: "Versión inical de una aplicación que incluye react-navigation y redux.",
    autor: "LoginWeb",
    API: "https://skotburger.com",
    debug: false,
    images: {
        banner: require('../assets/images/banner.jpg'),
        bannerAlt: require('../assets/images/banner.jpg'),
        icon: require('../assets/images/icon.png'),
        iconAlt: require('../assets/images/icon.png'),
        background: require('../assets/images/background.png'),
        backgroundAlt: require('../assets/images/background.png'),
    },
    draweMenu: {
        backgroundColor: '#FFFFFF',
        backgroundSecondary: '#FFFFFF',
        colorText: '#000000',
        colorTextAlt: '#000000'
    },
    color: {
        'primary': '#000',
        'secondary': '#ffde17',
        'textPrimary': '#ffde17',
        'textSecondary': '#ffde17',
        'textMuted': '#AFADAD',
        'backgroundSplash': '#000',
        'backgroundSplashText': '#ffde17',
        'background': '#F2F2F2',
        'backgroundAlt': '#F2F2F2',
        'backgroundText': '#ccc',
        'backgroundTextAlt': '#ccc',
        'menu': '#000',
        'menuText': '#ffde17',
        'menuBadge': 'red',
    },
    location: {
        latitude: -14.834821,
        longitude: -64.904159,
    }
}

export const reziseImage = (image, size = 'medium') => {
    if(image){
        return Config.debug ? image : image.replace('.', `_${size}.`);
    }else{
        return '../img/default.png';
    }
    
}