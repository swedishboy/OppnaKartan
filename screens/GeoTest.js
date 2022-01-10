import React, { useState, useEffect } from 'react';
import { Platform, Text, SafeAreaView, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import baseStyle from 'oppnakartan/shared/styles'
import { Button } from 'react-native-elements/dist/buttons/Button';

function updateMyLocation() {
    setMsg('updating ...');
}

export default function GeoTest() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [msg, setMsg] = useState('Waiting ...');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getLastKnownPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView style={baseStyle.container}>
      <Text style={baseStyle.roboto}>{text}</Text>
      <Button onPress={updateMyLocation} style={{backgroundColor: '#444'}} title="Uppdatera" />
    </SafeAreaView>
  );
}