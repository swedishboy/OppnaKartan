import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import LeafletMap from 'oppnakartan/parts/Map.js'
//import {AppSections} from 'oppnakartan/shared/globals';

export default function MapView(props) {

    //console.log(props.route);

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <LeafletMap style={styles.map} />
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    baseText: {
      color: '#fff'
    },
    map: {
      paddingTop: 20,
    },
    container: {
        backgroundColor: '#444',
        flex: 1,
        alignItems: 'center',
        color: '#fff',
        justifyContent: 'center',        
    }
  });