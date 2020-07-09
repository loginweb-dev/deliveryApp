export const Config = {
    appName: "Bueno Bonito & Barato",
    appDescription: "Versión inical de una aplicación que incluye react-navigation y redux.",
    autor: "LoginWeb",
    API: "https://buenobonitobarato.com.bo",
    debug: false,
    images: {
        banner: require('../assets/images/banner.png'),
        bannerAlt: require('../assets/images/banner.png'),
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
        'primary': '#216DFC',
        'secondary': '#8C8C8C',
        'textPrimary': '#FFFFFF',
        'textSecondary': '#FFFFFF',
        'textMuted': '#AFADAD',
        'backgroundSplash': '#F2F2F2',
        'backgroundSplashText': '#000000',
        'background': '#F2F2F2',
        'backgroundAlt': '#F2F2F2',
        'backgroundText': '#ccc',
        'backgroundTextAlt': '#ccc',
        'menu': '#216DFC',
        'menuText': '#ffffff',
        'menuBadge': '#F02A2A',
    },
    location: {
        latitude: -14.834821,
        longitude: -64.904159,
    }
}

export const reziseImage = (image, size = 'medium') => {
    return Config.debug ? image : image.replace('.', `_${size}.`);
}