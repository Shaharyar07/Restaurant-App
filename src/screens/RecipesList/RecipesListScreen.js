import React, { useLayoutEffect,useContext,useState,useEffect } from "react";
import { StyleSheet, FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import { RecipeCard } from "../../AppStyles";
import { getRecipes, getCategoryName } from "../../data/MockDataAPI";
import themeContext from "../Themes/themeContext";

export default function RecipesListScreen(props) {

  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false); 
  const { navigation, route } = props;

  const item = route?.params?.category;
  const recipesArray = getRecipes(item.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  useEffect(() => {
    var tempTheme = theme;
    if(tempTheme.theme === "light"){
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  });

  const renderRecipes = ({ item }) => (
    <View style={{marginRight: 10,
      width: "45%",}}>
      <TouchableHighlight
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => onPressRecipe(item)}
        style={styles.touchButton}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={darkMode? styles.titleDark:styles.title}>{item.title}</Text>
          <Text style={darkMode? styles.categoryDark:styles.category}>
            {getCategoryName(item.categoryId)}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <View style={darkMode? styles.pageDark:styles.page}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipesArray}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,

  page:{
    flex:1,
    backgroundColor:"white",
  },

  pageDark:{
    flex:1,
    backgroundColor:"black",
  },

  touchButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 20,
    width: 160,
    height: 225,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  photo: {
    width: 159,
    height: 150,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
    width: 150,
  },
  titleDark: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
    width: 150,
  },
  category: {
    marginTop: 5,
    marginBottom: 5,
  },
  categoryDark: {
    marginTop: 5,
    marginBottom: 5,
    color:"white",
  },
});
