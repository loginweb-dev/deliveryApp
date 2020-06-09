import { Config } from '../config/config.js';

export  const MainStyle = {
    // typography
    h1: {
        fontSize: 30,
        margin: 10,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 25,
        margin: 10,
        fontWeight: 'bold'
    },
    h3: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold'
    },
    h4: {
        fontSize: 15,
        margin: 10,
        fontWeight: 'bold'
    },
    p: {
        fontSize: 13,
        margin: 10
    },
    textMuted:{
        color: Config.color.textMuted,
    },
    // Form
    input: {
        height: 40,
        borderColor: Config.color.textMuted,
        borderWidth: 2,
        marginVertical: 5,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        fontSize: 15
    },
}