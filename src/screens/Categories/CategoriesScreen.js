import React, { useLayoutEffect,useState,useEffect,useContext } from "react";
import { FlatList, Text, View, Image, TouchableHighlight,StyleSheet } from "react-native";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import themeContext from "../Themes/themeContext";

export default function CategoriesScreen(props) {

  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const { navigation } = props;

  useEffect(() => {
    var tempTheme = theme;
    if(tempTheme.theme === "light"){
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
      <View style={darkMode? styles.categoriesItemContainerDark : styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={darkMode? styles.categoriesNameDark:styles.categoriesName}>{item.name}</Text>
        <Text style={darkMode? styles.categoriesInfoDark:styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={darkMode? {backgroundColor:"black"}:null}>
      <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 215,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 20,
  },

  categoriesItemContainerDark: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 215,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor:"black",
  },

  categoriesPhoto: {
    width: "100%",
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3,
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginTop: 8,
  },
  categoriesNameDark: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginTop: 8,
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5,
  },
  categoriesInfoDark: {
    marginTop: 3,
    marginBottom: 5,
    color:"white",
  },
});
