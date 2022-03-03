
import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, ImageBackground, Text, StyleSheet, Image, FlatList, View, SafeAreaView, Dimensions } from 'react-native';
import baseStyle from 'oppnakartan/shared/styles.js';
import StartButtons from 'oppnakartan/parts/StartButtons'
//import BottomNavigation from 'oppnakartan/shared/nav.js';
import Explore from './Explore.js';
//import {AppSections} from 'oppnakartan/shared/globals';
//import { useScrollToTop, useFocusEffect } from '@react-navigation/native';

//import { Video, AVPlaybackStatus } from 'expo-av';

const logoImage = require('oppnakartan/assets/logo_alpha.png');
const bgImage = require('oppnakartan/assets/background1.jpg');
const { width, height } = Dimensions.get("window");

function NvLogo() {
  const nvLogo = require('oppnakartan/assets/naturvardsverket_logo.png');
  return(
      <Image source={nvLogo} style={s.nvLogo} />
  )
};

const flatListData = [
  {id: 1, comp: 'home'},
  {id: 2, comp: 'explore'},
];


function FlatListItem({id, comp, listRef}) {
  switch(comp) {
    case 'home':
        return ( <Home listRef={listRef} /> );
    case 'explore':
      return ( <Explore /> );
  }
}

class Background extends Component {
  render() {

    return(
      <ImageBackground source={bgImage} style={s.mainBackground} />
      );
  }
}

const AnimatedBackground = Animated.createAnimatedComponent(Background);

class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.Exploring = false;
    this.onScrollEnd = this.onScrollEnd.bind(this);
    this.flatListRef = null;
    //this.rootCallback = props.
  }


  onScrollEnd(event) {

  }



  render() {
 
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 20
    };

    // if(isFocused) {
    //   scrollBack();
    // }
      
    // the flat list can maybe be changed to a scrollview??
//          ref={(ref) => this.flatListRef = ref}

    return (  
      <ImageBackground source={bgImage} style={s.mainBackground}>
      <SafeAreaView style={baseStyle.container}>

      <StatusBar style="dark" />
        <View style={s.startContainer}>
          <Image source={logoImage} style={s.logo} />          
          <Text style={[baseStyle.roboto, {paddingTop: 20, paddingBottom: 10, flexShrink: 2}]}>
              <Text style={s.faintGray}>version 0.5b</Text>
          </Text>
          <View style={[{marginTop: 10, marginBottom: 10}]}>
          <StartButtons />
          </View>
          <View style={s.below}>
            <Text style={[baseStyle.roboto, {color: 'rgba(255,255,255,.7)', fontSize: 10}]}>Skapad med stöd ifrån</Text>
            <NvLogo />
          </View>

          </View>
      </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default HomeScreen;
//export default HomeScreen;
// export default function(props) {
//   const ref = React.useRef(null);
//   useScrollToTop(ref);

//   return <HomeScreen {...props} flatListRef={ref} />;
// }

  const s = StyleSheet.create({
    startContainer: {
      alignItems: 'center', 
      width: width,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    faintGray: {
      color: 'rgba(0,0,0,.5)',
    },
    nvLogo: {
      width: 50,
      height: 60,
      marginTop: 10,
      marginBottom: 10,
      resizeMode: 'contain',
      shadowColor: 'rgba(0,0,0,.7)',
      shadowOffset: {width: 0, height: 0},
      shadowRadius: 5,
    },
    below: {
      marginTop: 40,
      paddingBottom: 10,
/*      borderWidth: 2,
      borderColor: '#fff',*/
      height: 100,
      alignItems: 'center'
    },
    logo: {
      width: '100%',
      height: 140,
      marginTop: 70,
      resizeMode: 'contain',
    },
    mainBackground: {
      width: '100%',
      height: '100%',
      flex: 1,
      alignItems: 'center',
    },
  });