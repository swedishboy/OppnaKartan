import { StyleSheet } from 'react-native';

const baseStyle = StyleSheet.create({
    roboto: {
        fontFamily: 'Roboto-Mono'
    },
    container: {
        flex: 1,
        fontFamily: 'Roboto-Mono',
        alignItems: 'center',
    },
    darkBg: {
        backgroundColor: '#222',
    },
    whiteBg: {
        backgroundColor: '#fff'
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
    },
    py30: {
        paddingTop: 30,
        paddingBottom: 30,
    },
    whiteText: {
        color: 'white',
        fontFamily: 'Roboto-Mono',
    },
    pageWrap: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 80,
        width: '100%',
        height: '100%',
    },
    pageTitle: {
        fontSize: 24,
        fontFamily: 'Roboto-Mono',
        marginVertical: 10,
    },
    h2: {
        fontSize: 16,
        fontFamily: 'Roboto-Mono-Bold',
    },
    pageText: {
        fontFamily: 'Roboto-Mono-Light',
        marginVertical: 20,
        fontSize: 16,
    },
    bulletList: {
        marginVertical: 20,
    },
    bulletEntry: {
        fontFamily: 'Roboto-Mono-Light',
        fontSize: 16,
        marginHorizontal: 16,        
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 22,
        borderRadius: 8,
        borderColor: 'rgba(255,255,255,.8)',
        borderWidth: 1.5,
        elevation: 3,
        shadowOpacity: .3,
        marginBottom: 15,
        marginTop: 0,
    },
    button_normal: {
        shadowOffset: {width: 3, height: 3},
        backgroundColor: 'rgba(0,0,0,.7)',
        shadowRadius: 4,
    },
    button_pressed: {
        backgroundColor: 'rgba(120,120,120,.8)',
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
    },    
});

export default baseStyle;
