import 'react-native-gesture-handler';
import { Pressable, View,} from "react-native";
import React from "react";



import { WebView } from 'react-native-webview';


export default function DetailedSongScreen({ navigation, route }) {
    const { url } = route.params;
    return (
        <WebView source={{ uri: url}} />
    );
  }
