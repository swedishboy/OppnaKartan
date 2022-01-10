import React from 'react';
import { Text, Pressable, Dimensions } from 'react-native';
import baseStyle from '../shared/styles';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {AppSections} from '../shared/globals';

const { width } = Dimensions.get("window");

export default function StartButtons(props) {
    
    var [ isPress, setIsPress ] = React.useState(0);
    const navigation = useNavigation();

    return(
        <>
        <Pressable style={[isPress == 1 ? baseStyle.button_pressed: baseStyle.button_normal,
                    baseStyle.button] } 
                    onPress={() => navigation.navigate('Main', {screen: AppSections.EXPLORE})} onPressIn={() => setIsPress(1)} onPressOut={() => setIsPress(0)}>
        <Text style={[baseStyle.whiteText]}>Hitta närmaste skog</Text>
        </Pressable>

        <Pressable style={[isPress == 2 ? baseStyle.button_pressed: baseStyle.button_normal,
            baseStyle.button] } 
            onPress={() => navigation.navigate(AppSections.MAPMODE)} onPressIn={() => setIsPress(2)} onPressOut={() => setIsPress(0)}>
        <Text style={baseStyle.whiteText}>Kartläge</Text>
        </Pressable>

        </>
    );
}