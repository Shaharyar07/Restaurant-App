import React, { useEffect, useLayoutEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  deleteField,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function HomeScreen(props) {
  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = collection(db, "demo");
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });

        // if (docSnap.exists()) {
        //   Alert.alert("Document data:", docSnap.data());
        //   console.log("Document data:", snapshot);
        // } else {
        //   Alert.alert("No such document!");
        //   console.log("No such document!");
        // }
      } catch (err) {
        console.log("error in catch: ", err);
      }
    }
    fetchData();
  }, []);

  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
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

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor='rgba(73,182,77,0.9)'
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}
