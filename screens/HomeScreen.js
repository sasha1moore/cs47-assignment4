import 'react-native-gesture-handler';
import { Pressable, StyleSheet, Text, View, Image, FlatList, SafeAreaView} from "react-native";
import React, { useState, useEffect } from "react";
import Images from "../Themes/images";
import { AccessTokenRequest, ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "../utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "../utils/constants";
import Colors from "../Themes/colors"
import millisToMinutesAndSeconds from "../utils/millisToMinuteSeconds";
import { useNavigation } from '@react-navigation/native';



// Endpoints for authorizing with Spotify
const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token"
  };

  const Song = ({imageURL, title, artist, album, duration, index, route, previewURL, detailedURL}) => {
    const navigation = useNavigation();
    return (
      <View style = {{flex: 1, flexDirection: "row"}}>
        <Pressable onPress={() => navigation.navigate('PreviewSongScreen', {url: previewURL})}>
          <View style = {{width: 19, alignItems: "center", justifyContent: "center"}}>
          <Image source={Images.play} style={styles.playButton}/>
          </View>
        </Pressable>
        {/* the row (besides the play button) should be pressable and navigate to detailedSongScreen */}
     <Pressable onPress={() => navigation.navigate('DetailedSongScreen', {url:detailedURL})}>
          <View style = {{flexDirection: 'row'}}>
          <View>
            <Image source = {{uri: imageURL}} style = {styles.songImg} />
          </View>
          <View style = {{width: 150, flexDirection: "column", justifyContent:"center", alignItems: "left", marginRight: 5}}>
            <Text numberOfLines={1} style={{color: 'white', fontWeight: "bold"}}>{title} </Text>
            <Text style={{color: 'white'}}>"updating"</Text>
          </View>
          <View style = {{width: 110, justifyContent:"center", alignItems: "left"}}>
            <Text numberOfLines={1} style={{color: 'white', fontWeight: "bold"}}>{album}</Text>
          </View>
          <View style = {{justifyContent:"center", alignItems: "right"}}>
            <Text style={{color: 'white', marginRight: 5}}>{duration}</Text>
          </View>
          </View>
     </Pressable>
      </View>
    
    );
  };


  const renderItem = ({item, index}) => {
    return <Song 
    index = {index}
    title = {item.name}
    previewURL = {item.preview_url}
    detailedURL = {item.external_urls.spotify}
    artist = {item.album.artists[0].name}
    album = {item.album.name}
    imageURL = {item.album.images[0].url}
    duration = {millisToMinutesAndSeconds(item.duration_ms)}
   />

 }

// Note: functional components need to start with a capital letter

export default function HomeScreen({navigation}) {

    
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  console.log('\n', tracks[0]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );


  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    const fetchTracks = async () => {
      // TODO: Comment out which one you don't want to use
      // myTopTracks or albumTracks

      const res = await myTopTracks(token);
      // const res = await albumTracks(ALBUM_ID, token);
      setTracks(res);
    };

    if (token) {
      // Authenticated, make API request
      fetchTracks();
    }
  }, [token]);


  if(token) {
    contentDisplayed = 
    //add in Mytoptracks
    //react fragment, a view box without the view component. 
    <> 
        <View style = {{flexDirection: "row", alignItems: "center"}}>
            <Image source={Images.spotify} style={styles.logo}/>
            <Text style = {styles.title}> My Top Tracks </Text>
        </View>
            <FlatList
            data={tracks} // the array of data that the FlatList displays
            renderItem={(item, index) => renderItem(item, index)} // function that renders each item
            keyExtractor={(item) => item.id} // unique key for each item
            />
    </>
    } else {
      contentDisplayed = 
        <Pressable onPress={promptAsync} style={styles.button}>
            <Image source={Images.spotify} style={styles.logo}/>
            <Text style = {{color: 'white', marginRight: 10}}>CONNECT WITH SPOTIFY</Text>
        </Pressable>

    }

    return (
        <SafeAreaView style = {styles.container}>
            {contentDisplayed}
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    button: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.spotify,
      width: 250,
      borderRadius: 99999
    },
    songImg: {
      margin: 5,
      flex: 1,
      height: 60,
      width: 60,
      backgroundColor: "blue"
    },
    logo: {
      height: 24,
      width: 24,
      marginLeft: 8,
      marginRight: 8,
      marginTop: 8,
      marginBottom: 8,
    },
    title: {
      fontSize: 24,
      color: "white",
      fontWeight: 'bold'
    },
    playButton: {
      height: 20,
      width: 20,
    },
  });