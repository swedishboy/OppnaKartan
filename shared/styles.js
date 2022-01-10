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

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 22,
        borderRadius: 6,
        borderColor: 'rgba(255,255,255,.8)',
        borderWidth: 1.5,
        elevation: 3,
        shadowOpacity: .7,
        marginBottom: 15,
    },
    button_normal: {
        shadowOffset: {width: 5, height: 5},
        backgroundColor: 'rgba(50,50,50,.8)',
        shadowRadius: 4,
    },
    button_pressed: {
        backgroundColor: 'rgba(120,120,120,.8)',
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
    },    
});

export default baseStyle;
