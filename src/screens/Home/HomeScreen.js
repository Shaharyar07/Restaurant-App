import React, { useContext, useEffect, useLayoutEffect } from "react";
import {FlatList,Text,View,TouchableHighlight,Image, useColorScheme, StyleSheet} from "react-native";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import {doc,collection,setDoc,getDoc,deleteField,getDocs,} from "firebase/firestore";
import { db } from "../../firebase";
import themeContext from "../Themes/themeContext";

export default function HomeScreen(props) {
  const theme = useContext(themeContext);

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


  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    console.log(theme);
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <View style= {{backgroundColor:theme.background}}>
      <TouchableHighlight
      underlayColor='rgba(73,182,77,0.9)'
      onPress={() => onPressRecipe(item)}
      style={styles.touchButton}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
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
        data={recipes}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  touchButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    width: 160,
    height: 225,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  container: {
   
    flex: 1,
    alignItems: 'center',
  },
  photo: {
    width: 159,
    height: 150,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
    width: 150,
  },
 
  category: {
    marginTop: 5,
    marginBottom: 5
  }
});