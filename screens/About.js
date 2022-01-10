import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';

export default function Page(props) {
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.pageWrap}>
            <Text>ABOUT</Text>
        </View>
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
    pageWrap: {
        padding: 20
    },
    container: {
        backgroundColor: '#444',
        flex: 1,
        alignItems: 'center',
        color: '#fff',
        justifyContent: 'center',        
    }
  });