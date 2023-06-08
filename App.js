import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppContainer from "./src/navigations/AppNavigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { EventRegister } from "react-native-event-listeners";

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
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
