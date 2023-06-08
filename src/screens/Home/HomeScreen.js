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
import { db } from "../../firebase";
import themeContext from "../Themes/themeContext";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen(props) {
  const theme = useContext(themeContext);
  const [sortedData, setSortedData] = useState(recipes); // State for storing sorted data
  const [sortOption, setSortOption] = useState("desc"); // State for sorting option
  const [darkMode, setDarkMode] = useState(false); // State for dark mode 
  

  useEffect(() => {
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

  useEffect(() => {
    var tempTheme = theme;
    if(tempTheme.theme === "light"){
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  });

  const navigation = useNavigation(); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
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
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <View
      style={{
        marginRight: 10,
        width: "45%",
      }}>
      <TouchableHighlight
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => onPressRecipe(item)}
        style={styles.touchButton}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={darkMode? styles.titleDark:styles.title}>{item.title}</Text>
          <View style={styles.infoContainer}>
          <Image
            style={darkMode? styles.infoPhotoDark:styles.infoPhoto}
            source={require("../../../assets/icons/time.png")}
          />
          <Text style={darkMode? styles.infoRecipeDark:styles.infoRecipe}>{item.time} minutes </Text>
        </View>
          <Text style={darkMode? styles.categoryDark:styles.category}>
            {getCategoryName(item.categoryId)}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <ScrollView>
      <View style={darkMode?styles.pageBlack : null}>
        <View style={darkMode?styles.sortContainerBlack : styles.sortContainer}>
          <Text style={darkMode? styles.sortTextDark:styles.sortText}>Sort:</Text>
          <Picker
            selectedValue={sortOption}
            style={styles.picker}
            onValueChange={onSortOptionChange}
            itemStyle={ darkMode? {color:"white"}: null}
          >
            <Picker.Item label="A → Z" value="asc" />
            <Picker.Item label="Z → A" value="desc" />
            <Picker.Item label="Cooking time Ascending" value="timeasc" />
            <Picker.Item  label="Cooking time Descending" value="timedesc" />
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
  pageBlack:{
    backgroundColor:"black",
  },

  infoRecipeDark:{
    color:"white",
  },

  infoPhoto:{
    width:"10%",
    height:"100%",
    marginRight:5,
  },

  infoPhotoDark:{
    width:"10%",
    height:"100%",
    marginRight:5,
    backgroundColor:"white",
  },

  infoContainer: {
    display:"flex",
    flexDirection:"row",
  },
  
  sortText: {
    display: "flex",
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    color: "black",
    marginBottom: 10,
  },

  sortTextDark: {
    color:"white",
    display: "flex",
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },

  picker: {
    display: "flex",
    width: "100%",
    flex: 1,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },

  pickerBlackItem: {
    color:"white",
  },

  sortContainer: {
    margin:20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  sortContainerBlack: {
    margin:20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "black",
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
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
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
