import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  useColorScheme,
  StyleSheet,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

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
import {
  doc,
  collection,
  setDoc,
  getDoc,
  deleteField,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import themeContext from "../Themes/themeContext";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen(props) {
  const theme = useContext(themeContext);
  const [sortedData, setSortedData] = useState(recipes); // State for storing sorted data
  const [sortOption, setSortOption] = useState("desc"); // State for sorting option

  useEffect(() => {
    console.log(theme);
    async function fetchData() {
      try {
        const docRef = collection(db, "demo");
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (err) {
        console.log("error in catch: ", err);
      }
    }
    fetchData();
  }, []);

  const navigation = useNavigation(); // Access the navigation object

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
    });
  }, [navigation]);

  const onSortOptionChange = (option) => {
    console.log(option);
    setSortOption(option);
  };

  useEffect(() => {
    // Sort the data whenever the sort option changes
    sortData();
  }, [sortOption]);

  const sortData = () => {
    const sorted = [...recipes]; // Create a copy of the original data
    if (sortOption === "asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title in ascending order
    } else if (sortOption === "desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title in descending order
    } else if (sortOption === "timeasc") {
      sorted.sort((a, b) => a.time - b.time); // Sort by cooking time in ascending order
    } else if (sortOption === "timedesc") {
      sorted.sort((a, b) => b.time - a.time); // Sort by cooking time in ascending order
    }
    setSortedData(sorted);
  };

  const onPressRecipe = (item) => {
    console.log(theme);
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <View
      style={{
        backgroundColor: theme?.background,
        marginRight: 10,
        width: "45%",
      }}
    >
      <TouchableHighlight
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => onPressRecipe(item)}
        style={styles.touchButton}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>
            {getCategoryName(item.categoryId)}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <ScrollView>
      <View>
        <View style={styles.sortContainer}>
          <Text style={styles.sortText}>Sort:</Text>
          <Picker
            selectedValue={sortOption}
            style={styles.picker}
            onValueChange={onSortOptionChange}
          >
            <Picker.Item label="A ➡️ Z" value="asc" />
            <Picker.Item label="Z ➡️ A" value="desc" />
            <Picker.Item label="Cooking time Ascending" value="timeasc" />
            <Picker.Item label="Cooking time Descending" value="timedesc" />
          </Picker>
        </View>
        <View style={styles.flatListContainer}>
          <FlatList
            style={styles.flatList}
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={sortedData} // Render the sorted data
            renderItem={renderRecipes}
            keyExtractor={(item) => `${item.recipeId}`}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sortText: {
    display: "flex",
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#444444",
    marginBottom: 10,
  },

  picker: {
    display: "flex",
    width: "50%",
    flex: 1,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },

  sortContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  touchButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#444444",
    fontWeight: "bold",
    textAlign: "center",
    color: "#444444",
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
    width: 150,
  },
  category: {
    marginTop: 5,
    marginBottom: 5,
  },
    marginBottom: 5,
  },
});
