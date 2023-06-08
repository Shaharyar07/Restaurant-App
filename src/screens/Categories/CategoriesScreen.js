import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  deleteField,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
export default function CategoriesScreen(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { navigation } = props;
  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = collection(db, "categories");
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });

        setData(docSnap.docs.map((doc) => doc.data()));
        setLoading(false);
      } catch (err) {
        console.log("error in catch: ", err);
      }
    }
    fetchData();
  }, []);
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
    <TouchableHighlight
      underlayColor='rgba(73,182,77,0.9)'
      onPress={() => onPressCategory(item)}
    >
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <FlatList
          data={data}
          renderItem={renderCategory}
          keyExtractor={(item) => `${item.id}`}
        />
      )}
    </View>
  );
}
