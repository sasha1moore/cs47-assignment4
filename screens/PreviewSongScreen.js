import 'react-native-gesture-handler';
import { Pressable, Text, SafeAreaView} from "react-native";
import React from "react";


import { WebView } from 'react-native-webview';

export default function PreviewSongScreen({ navigation, route }) {
  const { url } = route.params;
    return (
        <WebView source={{ uri: url}} />
    );
  }