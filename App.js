import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppContainer from "./src/navigations/AppNavigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { EventRegister } from "react-native-event-listeners";
import { RecipeProvider } from "./src/data/RecipeContext";

export default function App() {
  const [colorMode, setColorMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setColorMode(data);
        console.log(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  return (
    <Provider store={store}>
      <RecipeProvider>
        <AppContainer />
      </RecipeProvider>
    </Provider>
  );
}
