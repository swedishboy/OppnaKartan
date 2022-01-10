import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function BottomNavigation(props) {

    var gradient_colors = ['transparent', 'rgba(255,255,255,.7)'];
    var icon_color = 'black';

    if(props.theme == 'dark') {
        gradient_colors = ['transparent', 'rgba(0,0,0,.7)'];
        icon_color = 'white';
    }else{
        gradient_colors = ['transparent', 'rgba(255,255,255,.7)'];
        icon_color = 'black';
    }

    return (
        <>
        <LinearGradient
        // Background Linear Gradient
        colors={gradient_colors}
        locations={[0, .8]}
        style={s.bottom}
        >
            <Pressable style={[s.button, s.settings]}>
                <Ionicons name="settings" size={44} color={icon_color} />
            </Pressable>
            <Pressable style={[s.button, s.about]}>
                <Ionicons name="information-circle" size={48} color={icon_color} />
            </Pressable>
        </LinearGradient>
        </>
    );
} 

const s = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
    },
    settings: {
    },

    bottom: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'bottom',
        width: '100%',
        color: '#fff',
        padding: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: 90,
    },
    test: {
        color: '#fff'
    }
});

  