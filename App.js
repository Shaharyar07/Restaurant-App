import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import { EventRegister } from 'react-native-event-listeners';

export default function App() {
  const [colorMode,setColorMode] = useState(false);

  useEffect(() => {
    let eventListner = EventRegister.addEventListener("changeTheme", (data)=>{
      setColorMode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListner);
    }
  })
  return (
     <AppContainer />
  );
}
