import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, ScrollView, SafeAreaView, Text, FlatList, StyleSheet } from 'react-native';
import baseStyle from '../shared/styles';
import { Ionicons } from '@expo/vector-icons';



function FeatureList(props) {
  let featuerListArr = [
    {id: 1, text: 'Med vår app får användaren konkreta förslag på platser att besöka utifrån syfte och preferenser'},
    {id: 2, text: 'Förslagen är baserade på närhet för att alla ska kunna ta del av de positiva effekterna av naturvistelser'},
    {id: 3, text: 'För att stimulera kontinuerlig aktivitet bygger vi ett antal motivationsdrivare. För närvarande är avstånd och skogsegenskaper implementerade.'}
  ];
  
  return(
    <View>
      {featuerListArr.map((item) => {
          return (
              <View key={item.id} style={{flex: 1, flexDirection: 'row', marginVertical: 10}}>
              <Ionicons name="checkmark-circle" size={24} color="lightgreen" /><Text style={baseStyle.bulletEntry}>{item.text}</Text>
              </View>
          );       
      })}
    </View>
  );
}
  

export default function About(props) {
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <ScrollView style={baseStyle.pageWrap}>
            <Text style={baseStyle.pageTitle}>Om Öppna Kartan</Text>
            <Text style={baseStyle.pageText}>Öppna Kartan är en app-prototyp för att hitta närmaste hälskoskog* utifrån din position. Prototypen använder skogar i Västra Götland med fokus kring Göteborg.
            </Text>
            <FeatureList />
            <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd', marginVertical: 40}}></View>
            <Text style={baseStyle.pageText}>
              <Text style={baseStyle.pageTitle}>Utvecklare</Text>
              {"\n"}{"\n"}
              <Text style={styles.bold}>Johan Hammarlund</Text>{"\n"} 
              projektledning, research{"\n"}{"\n"}
              
              <Text style={styles.bold}>Johan Ström</Text>{"\n"}
              programmering, hacks{"\n"}{"\n"}
              
              <Text style={styles.bold}>Jonathan Mattebo Persson</Text>{"\n"}
              design, ux, webb
              {"\n"}{"\n"}
              Teamet träffades för att tävla i Hack for Sweden 2021, och fick sedan chansen att arbeta vidare med sin idé med stöd från Naturvårdsverket.
            </Text>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#ddd', marginVertical: 40}}></View>
        </ScrollView>
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    baseText: {
      color: '#fff'
    },
    bold: {
      fontFamily: 'Roboto-Mono-Bold',
      fontWeight: 'bold',
    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
        height: '100%',
        alignItems: 'center',
        color: '#fff',
        justifyContent: 'center',        
    }
  });