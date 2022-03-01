import 'react-native-gesture-handler';
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native"
import { HomeScreen, DetailedSongScreen, PreviewSongScreen } from './screens';
//import { Themes } from "../cs47-a2-starter/assets/Themes";




//looks like this is where you are styling -- custom component


//style = {{flex: 1}}


const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options ={{headerShown: false}} />
          <Stack.Screen name="DetailedSongScreen" component={DetailedSongScreen} />
          <Stack.Screen name="PreviewSongScreen" component={PreviewSongScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

