import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, View, Pressable, Dimensions } from 'react-native';
import {Explore, HomeScreen, Page, MapView, GeoTest} from './screens/index.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import baseStyle from './shared/styles.js';
import {AppSections} from './shared/globals';

const { width, height } = Dimensions.get("window");
const _text = {
  'explore_title_short': 'Hitta skog',
  'back': 'Tillbaka',
};

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};


function MainStackScreen( props ) {

  //<HomeStack.Screen name={AppSections.MAPMODE} component={MapView} options={{headerShown: true, title: 'Kartläge'}} />
  return (
    <HomeStack.Navigator 
  
    screenListeners={({ route }) => ({
      state: (e) => {
        // Do something with the state
        //console.log('state changed', e.data);
        // if(route.name === AppSections.MAPMODE) {
        //   rootCallbackFunc(AppSections.MAPMODE);
        // } else if (route.name === AppSections.HOME) {
        //   rootCallbackFunc(route.name);
        // }
        console.log(route);
      },
    })}
    
    initialRouteName={AppSections.HOME} screenOptions={{headerShown: false, cardStyleInterpolator: forFade}}>
        <HomeStack.Screen 
              name={AppSections.HOME} 
              component={HomeScreen} 
          /> 
        <HomeStack.Screen 
              name={AppSections.EXPLORE} 
              component={Explore}
          />
        <HomeStack.Screen 
              name={AppSections.MAPMODE} 
              component={MapView} 
              options={{headerShown: true, headerBackTitle: _text.back, title: 'Kartläge'}}
          />
        <HomeStack.Screen name="GeoTest" component={GeoTest} />
      </HomeStack.Navigator>
  );
}

function OtherScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="About" component={Page} />
    </Stack.Navigator>
  );
}


function OK_TabBarButton({props}) {
  const {navigation} = props;
  return (
    <Pressable />    
  )
//  tabBarButton: props => <TouchableOpacity {...props} />
}

function NullScreen() {
  return (
    <></>
  );
}

const DisabledTabBarButton = ({ style, ...props }) => (
  <Pressable disabled style={[{ opacity: 0.2 }, style]} {...props} />
)

const Tab = createBottomTabNavigator();

export default function App(props) {
  let [fontsLoaded] = Font.useFonts({
    'Roboto-Mono': require('./assets/fonts/RobotoMono-VariableFont_wght.ttf'),
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
                headerBackTitle: _text.back, 
                headerBlurEffect: 'dark',
                headerShown: false,
                headerTransparent: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'snow',
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === "Main") {
                    iconName = 'home'
                  } else if (route.name === AppSections.SETTINGS) {
                    iconName = 'settings'
                  } else if (route.name === AppSections.MAPMODE+'_Tab') {
                    iconName = 'map'
                  } else if (route.name === AppSections.EXPLORE+'_Tab') {
                    iconName = 'bookmarks'
                  } else if (route.name === AppSections.ABOUT) {
                    iconName = 'information-circle'
                  }
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
          })}
          >
          <Tab.Screen name="Main" component={MainStackScreen} />
          <Tab.Screen name={AppSections.ABOUT} component={OtherScreens} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  video: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#aaa',
    top: 0, left: 0, right: 0, bottom: 0,
    width: '100%',
    height: height,
    opacity: .7,
  },
  tabBarStyle: {
    backgroundColor: '#222',
    justifyContent: 'space-between',
  },
  whiteText: {
    color: '#fff',
  },
});
