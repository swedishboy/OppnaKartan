import React, {Component, useEffect, useRef, useState} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { LatLng, LeafletView, WebViewLeaflet, WebViewLeafletEvents, AnimationType, MapShapeType } from 'react-native-leaflet-view';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

// const OK_Jawg_Layer = [
//     {
//       attribution:
//         '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//       baseLayerIsChecked: true,
//       baseLayerName: 'OpenStreetMap.Mapnik',
//       url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//       jawgAccess: '0wbN3MV576fpTxSAswX3Lth03c2CXsPE8AYaPzaMhCr2UsnKNZs9OZmRuyFXcghs',
//     },
//   ];
const LoadingIndicator = () => {
    return (
        <View style={styles.loadingArea}>
            <Text>Loading ...</Text>
        </View>
    );    
}

//const startPosition = {lat: 57.6954, lng: 11.9271};
// const zoomLevel = 12;

const Stamen_Watercolor_Layer = {
        layerID: 'stamen_watercolor',
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
        subdomains: 'abcd',
        ext: 'jpg',
        minZoom: 1,
        maxZoom: 20,
        baseLayer: true,
        baseLayerIsChecked: true,
        baseLayerName: 'Water Color',
        url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}',
    };

// not used
const CartoDB_Labels_Only = {
        layerID: 'carto_labels_only',
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20
    };

const Stamen_Terrain_Labels = {
    url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}{r}.{ext}',
	//attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
};

const Stamen_Toner_Tiles = 
    {
        url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.{ext}',
        //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    };

export default function LeafletMap(props) {

    const myStartPosition = {lat: 57.6954, lng: 11.9271};
    const startPositionDefault = {lat: 57.6954, lng: 11.9271}; //{lat: 59.6954, lng: 12.9271};
    const defaultLayers = [Stamen_Watercolor_Layer, Stamen_Terrain_Labels];
    const detailedLayers = [Stamen_Watercolor_Layer, Stamen_Toner_Tiles];

    const [ownPosition, setOwnPosition] = useState(null);
    const [ownMarker, setOwnMarker] = useState(false);
    const [startPosition, setStartPosition] = useState(startPositionDefault);
    const [zoomLevel, setZoom] = useState(13);
    const [currentZoom, setCurrentZoom] = useState(0);
    const [mapLayers, setMapLayers] = useState(defaultLayers);
    const [mapShapes, setMapShapes] = useState(null);
    const [isDetailed, setIsDetailed] = useState(false);
    //var isDetailed = false;
    //const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
//    const [msg, setMsg] = useState('Waiting ...');

    const test_mapShapes = [
        {
          shapeType: MapShapeType.CIRCLE,
          color: "#123123",
          id: "1",
          center: { lat: 57.6954, lng: 12.0271 },
          radius: 3000
        }
    ];

    const myPositionMarker = {
        position: ownPosition,
        icon: "🔵",
        size: [24, 24],
        animation: {
            duration: 2.5,
            delay: .5,
            iterationCount: "infinite",
            type: AnimationType.PULSE
        }
    };


    // useEffect(() => {
    //   (async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //       setErrorMsg('Permission to access location was denied');
    //       return;
    //     }
  
    //     let location = await Location.getLastKnownPositionAsync({});
    //     //setLocation(location);
    //     //console.log(location);
    //     let newPosition = {lat: location.coords.latitude, lng: location.coords.longitude};
    //     setStartPosition(newPosition);
    //     if(!ownPosition) {
    //         setOwnPosition(newPosition);
    //     }

    //     setZoom(13);
    //     setCurrentZoom(13);
    //   })();
    // }, []);

    useEffect(() => {
        console.log('shape magic!');
        setOwnPosition(startPositionDefault);
    }, []);

    useEffect(() => {
        if(currentZoom > 16) {
            setZoom(16);
        }
    }, []);

    const handleLoadEnd = () => {
        
    }

    const onZoom = (event) => {
        console.log('zoom!');
    }

    function isZoomStable(val) {
        return val % 1 === 0;
    }


    const messageReceived = (message) => {
        if(message.event == WebViewLeafletEvents.ON_ZOOM) {
            let payload = message.payload;
            //let zoomisInt = payload.zoom % 1 === 0;
            if(isZoomStable(payload.zoom)) {
                //console.log(payload.zoom);
                if(payload.zoom >= 15 && !isDetailed) {
                    setIsDetailed(true);
                    setMapLayers(detailedLayers);
                }else if(payload.zoom < 15 && isDetailed) {
                    setIsDetailed(false);
                    setMapLayers(defaultLayers);
                }

            }
            setCurrentZoom(payload.zoom);

        }
    }

    return (
            <>
            <LeafletView renderLoading={() => <LoadingIndicator />} doDebug={false} 
 mapCenterPosition={startPosition} showZoomControls={false} zoom={zoomLevel} mapLayers={mapLayers} 
onLoadEnd={handleLoadEnd} mapShapes={test_mapShapes} onMessageReceived={messageReceived} mapMarkers={[myPositionMarker]}
 />
            </>
    );
}

// useEffect(() => {
//     if (!initialized) {
//       return;
//     }
//     sendMessage({ mapLayers });
//   }, [initialized, mapLayers, sendMessage]);


// export default function OK_Map() {
//     return (
//         <>
//         <LeafletView renderLoading={() => <LoadingIndicator />} mapCenterPosition={startPosition} zoom={zoomLevel} mapLayers={Stamen_Watercolor_Layer}></LeafletView>
//         </>
//     );
// }

const styles = StyleSheet.create({
    loadingArea: {
        height: '100%',
        backgroundColor: '#444'
    },
});
/*
var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});
var Stamen_TonerLines = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});
*/