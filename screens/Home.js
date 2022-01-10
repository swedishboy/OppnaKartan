
import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, StyleSheet, Image, FlatList, View, SafeAreaView, Dimensions } from 'react-native';
import baseStyle from 'oppnakartan/shared/styles.js';
import StartButtons from 'oppnakartan/parts/StartButtons'
import BottomNavigation from 'oppnakartan/shared/nav.js';
import Explore from './Explore.js';
import {AppSections} from 'oppnakartan/shared/globals';
import { useScrollToTop, useFocusEffect } from '@react-navigation/native';

//import { Video, AVPlaybackStatus } from 'expo-av';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const logoImage = require('oppnakartan/assets/logo_alpha.png');
const bgImage = require('oppnakartan/assets/background1.jpg');
const { width, height } = Dimensions.get("window");


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

// this handles automatic scrollback when home comes to focus again from other screen

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
          <Text style={[baseStyle.roboto, baseStyle.py30]}>
              <Text style={s.faintGray}>version 0.4b</Text>
          </Text>
          <StartButtons />

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
    },
    faintGray: {
      color: 'rgba(0,0,0,.5)',
    },
    logo: {
      width: '100%',
      height: 140,
      marginTop: 80,
      resizeMode: 'contain',
    },
    mainBackground: {
      width: '100%',
      height: '100%',
      flex: 1,
      alignItems: 'center',
    },
  });