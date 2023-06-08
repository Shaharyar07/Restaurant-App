import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { categories } from "../../data/dataArrays";
export default function RecipesListScreen(props) {
  const { navigation, route } = props;

  const item = route?.params?.category;
  console.log("item: ", item);
  // const recipesArray = getRecipes(item.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  const renderRecipes = ({ item }) => (
    <View
      style={{
        marginRight: 10,
        width: "45%",
      }}
    >
      <TouchableHighlight
        underlayColor='rgba(73,182,77,0.9)'
        
        style={styles.touchButton}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>
            {/* {getCategoryName(item.categoryId)} */}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={categories}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}
