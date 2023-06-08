import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppContainer from "./src/navigations/AppNavigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { EventRegister } from "react-native-event-listeners";
import themeContext from './src/screens/Themes/themeContext';
import theme from './src/screens/Themes/theme';

export default function App() {
  const [colorMode, setColorMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setColorMode(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  return (
    <themeContext.Provider value={colorMode === true? theme.dark : theme.light}>
      <Provider store={store}>
            <AppContainer />
          </Provider>
    </themeContext.Provider>
    
  );
}
