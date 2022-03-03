import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ImageBackground, ActivityIndicator, View, FlatList, Text, StyleSheet, Dimensions} from 'react-native';
import baseStyle from '../shared/styles';
import * as Location from 'expo-location';
import * as GeoLib from 'geolib';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')
const bgImage = require('oppnakartan/assets/background3.jpg');
const bgImage2 = require('oppnakartan/assets/background2.jpg');
const bgImage3 = require('oppnakartan/assets/background4.jpg');
const bgImage4 = require('oppnakartan/assets/background5.jpg');


function pickRandomBackground() {
    var bgID = Math.ceil(Math.random()*4);
    switch(bgID) {
        case 1:
            return bgImage;
        case 2:
            return bgImage2;
        case 3:
            return bgImage3;
        default:
            return bgImage4;
     }
}

function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
      // Pick a remaining element
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
}

function ForestServices(props) {
    //let servicesAvailable = props.servicesAvailable || ['parking', ]
    let maincolor = 'rgb(225,225,225)';
    let altcolor = 'rgba(225,225,225,.2)';
    var colorSelector = shuffleArray([1,0,1,0,1,0,1,1,1]);
    const getColor = (value) => {
        var index = colorSelector[value]; 
        return index == 1 ? maincolor : altcolor;
    }

    let colorA = getColor(1);
    let colorB = getColor(2);
    let colorC = getColor(3);
    let colorD = getColor(4);
    return(
        <View style={styles.forestServices}>
            <View style={styles.iconHolder}>
            <FontAwesome5 name="parking" size={32} color={colorA} />
            <Text style={[styles.small, {color: colorA}]}>Parkering</Text>
            </View>
            <View style={styles.iconHolder}>
            <FontAwesome5 name="monument" size={32} color={colorB} />
            <Text style={[styles.small, {color: colorB}]}>Fornminnen</Text>
            </View>

            <View style={styles.iconHolder}>
            <FontAwesome5 name="tree" size={32} color={colorC} />
            <Text style={[styles.small, {color: colorC}]}>Urskog</Text>
            </View>

            <View style={styles.iconHolder}>
            <MaterialCommunityIcons name="campfire" size={32} color={colorD} />
            <Text style={[styles.small, {color: colorD}]}>Lägerplats</Text>
            </View>
        </View>
    );
}

function Item({ title, distance, type, near }){
    let bg = pickRandomBackground();
    return (
    <ImageBackground source={bg} style={baseStyle.background}>
    <View style={styles.exploreContainer}>
    <View style={styles.topArea}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{distance} bort</Text>
    </View>
    <View style={styles.exploreBox}>
    <Text style={styles.boxTitle}>{type}</Text>
    <Text style={styles.boxTitle2}>Nära <Text style={{fontFamily: 'Roboto-Mono'}}>{near}</Text></Text>
    <ForestServices />
    </View>      
    </View>
    </ImageBackground>
    );
}

function LoadingIndicator(props) {
    return(
        <View style={[styles.contentContainer, {flex: 1, justifyContent: 'center'}]}>
            <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color={'#aaa'} />
                <Text style={styles.loadingText}>{props.status}</Text>
            </View>
        </View>
    );
}
const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms))


const diveIntoArray = async(inputArray) => {
    let a = inputArray;
    let safetyCounter = 0;
    while(a[0].length == 1) {
        safetyCounter++;
        if(safetyCounter > 20) {
            break;
        }
        a = a[0];
    }
    return a[0];
}

/**
 * 
 *  fetchForests async
 *  @returns array
 */
 async function fetchForests(locdata) {
    try {
        const data = await require('oppnakartan/assets/skogar.json');
        await sleep(500);
        let newData = [];

        if(data) {
            //console.log(data);
            const fromPosition = {latitude: locdata.lat, longitude: locdata.lng};
            if(!data.features) {
                thwrow('error: no features in data!')
            }

            data.features.map(d => {
                // settings some vars
                let forestName = d.properties?.name;
                let nearTo = d.properties?.near || 'Okänt';
                let forestID = d.properties?.id || 'id' + (new Date()).getTime();

                // array to hold our data from promise
                var coordinatesOut = [];
                // init min distance
                var minDistance = 10000000;
                // setup coordinates from deep array
                let coords_p = Promise.resolve(diveIntoArray(d.geometry.coordinates));

                // pass promise
                coords_p.then(values => {
                    // mapp values to new array and use the values to calculate distance
                    values.map(val => {
                        coordinatesOut.push(val);

                        // geolib distance calculation by meters of 10
                        var distance = GeoLib.getDistance(fromPosition, {
                            latitude: val[1],
                            longitude: val[0],
                        }, 10);
                        // division to get km
                        distance *= 0.001;
                        // round kms to one decimal and below 1 km to meters
                        distance = (distance >= 1) ? Number((distance).toFixed(1)) : Mathf.Round(distance*1000);

                        if(distance < minDistance) {
                            minDistance = distance;
                        }
                    });
                    //console.log('shortest distance for > '+forestName+' = '+minDistance);
                    let distanceText = minDistance > 1 ? minDistance+' km' : minDistance*100+' m';
                    newData.push({id: forestID, title: forestName, type: d.properties.typ, near: nearTo, coords: coordinatesOut, distance: minDistance, distanceText: distanceText});
                });
            });
            await sleep(1000);

            console.log('** data');
            newData.sort((a, b) => {
                return b.distance < a.distance ? 1 : -1;
            });
            console.log(newData);
            // console.log(newData.length);
            await sleep(1000);
            return newData;
        }
    } catch(error) {
        console.log(error);
    }            
}

/**
 * 
 * Explore Component
 * @param {
 *      latlng,
 *      forests,
 *      progress
 * } props [not used]
 * @returns <Explore />
 */

export default function Explore(props) {

    const renderItem = (item, index) => (
        <Item title={item.title} index={index} distance={item.distanceText} type={item.type} near={item.near} />
        );
        
    const [latlng, setLatlng] = useState(null);
    const [forests, setForests] = useState(null);
    const [progress, setProgress] = useState('Laddar...');

    useEffect(() => {
        let locationFetched = false;
        let mounted = true;
        // clear console
        console.clear();

        // set progress for geo calculation
        setProgress('Räknar ut din plats');
/**
 * fetchLocation async
 * @returns location
 */
        const fetchLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    //setErrorMsg('Permission to access location was denied');
                    console.warn("didn't get permission to use geo-location");
                    setProgress('FEL: Fick inte använda din plats');
                    return false;
                }else{
                    setProgress('Plats lokaliserad');
                    let location = await Location.getLastKnownPositionAsync({});
                    let newPosition = {lat: location.coords.latitude, lng: location.coords.longitude};

                    if(mounted) {
                        setLatlng(newPosition);
                    }
                    //setLatlng(newPosition);
                    //await sleep(1000);
                    return newPosition;
                }
            } catch(error) {
                console.log(error);
            }
        }


        const locationSet = fetchLocation()
        // make sure to catch any error
        .catch(console.error);

        console.log(locationSet);
        locationSet.then(locData => {
            setProgress('Beräknar närmaste skogar ...');
            const forestData = fetchForests(locData).catch(console.error);
            forestData.then(data => {
                setProgress('Nästan klar ...');
                if(mounted == true) {
                    setForests(data);
                }
            });

        });

        return function cleanup() {
            mounted = false
        }

    }, []);

    if (!forests) {
        return (
            <LoadingIndicator status={progress} />
        )
    }else{
        return (
        <FlatList
        horizontal={true}
        pagingEnabled={true}
        style={styles.contentContainer}
        data={forests}
        initialNumToRender={1}
        renderItem={({ item, index, separators }) => renderItem(item, index)}
        >   
        </FlatList>
        );
    }
}

const styles = StyleSheet.create({
contentContainer: {
    height: height,
},
loadingBox: {
    height: 100,
    alignItems: 'center',
},
loadingText: {
    fontFamily: 'Roboto-Mono',
    fontSize: 14,
    marginTop: 20,
    color: '#aaa',
},
topArea: {
    flex: 1
},
title: {
    fontSize: 32,
    textTransform: 'capitalize',
    letterSpacing: -.1,
    fontFamily: 'Roboto-Mono-Bold',
    textAlign: 'center',
    marginTop: 60,
},
subtitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Mono',
    textAlign: 'center',
    marginVertical: 30,
},   
exploreContainer: {
    width: width-40,
    marginHorizontal: 20,
    flex: 1,
    height: '100%'
},
exploreBox: {
    borderRadius: 4,
    color: 'snow',
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexShrink: 2,
    alignItems: 'center',
    height: 200,
    marginTop: 50,
    marginBottom: 30,
},
boxTitle: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: 'Roboto-Mono',
    textTransform: 'capitalize',
    color: '#fff',
},
boxTitle2: {
    fontSize: 16,
    fontFamily: 'Roboto-Mono-Light',
    fontWeight: '300',
    color: '#fff',
    marginTop: 10
},
forestServices: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
    marginTop: 40,
    justifyContent: 'space-between',
},
small: {
    fontFamily: 'Roboto-Mono',
    fontSize: 8,
    color: 'white',
},
maincolor: {
    color: 'white'
},
altcolor: {
    color: 'rgba(225,225,225,.2)'
},
iconHolder: {
    alignItems: 'center'
},
debug: {
    fontFamily: 'Roboto-Mono',
    fontSize: 14,
    color: 'snow',
}
});