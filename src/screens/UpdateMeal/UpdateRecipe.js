import React, { useState,useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text,Keyboard, KeyboardAvoidingView,TouchableHighlight, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../firebase";
import { addDoc, collection, doc, getDoc,getDocs, setDoc, updateDoc } from "firebase/firestore";

const ingredientsList = [
  { id: 0, name: "Salt" },
  { id: 1, name: "Sugar" },
  { id: 2, name: "Oil" },
];

const categoryOptions = [
  { id: 1, label: "Category 1" },
  { id: 2, label: "Category 2" },
  { id: 3, label: "Category 3" },
];

const UpdateRecipe = (props) => {

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const { navigation, route } = props;
  const item = route.params.item

  const [recipe, setRecipe] = useState({
    recipeId: 122,
    categoryId: "",
    title: "",
    photo_url: "",
    photosArray: [],
    time: "",
    ingredients: [],
    description: "",
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      setKeyboardOffset(0)
    );
  
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = (event) => {
    setKeyboardVisible(true);
    setKeyboardOffset(event.endCoordinates.height);
  };
  
  const keyboardDidHide = () => {
    setKeyboardVisible(false);
    setKeyboardOffset(0);
  };

  useEffect(() => {

    recipe.recipeId = item.recipeId
    recipe.categoryId = item.categoryId
    recipe.title = item.title
    recipe.photo_url = item.photo_url
    recipe.photosArray = item.photosArray
    recipe.time = item.time
    recipe.ingredients = item.ingredients
    recipe.description = item.description

    console.log(item)
   setLoading(false)
  },[])

  

  

  const handleInputChange = (field, value) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, [field]: value }));
  };

  const handleCategoryChange = (value) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, categoryId: value }));
  };

  const handleIngredientChange = (index, ingredientId) => {
    setRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index] = [ingredientId, ""];
      return { ...prevRecipe, ingredients: updatedIngredients };
    });
  };

  const handleQuantityChange = (index, quantity) => {
    setRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index][1] = quantity;
      return { ...prevRecipe, ingredients: updatedIngredients };
    });
  };

  const handleSubmit = async () => {

    console.log("dsak");
    try {
      const recipeNew = {
        ...recipe,
        ingredients: recipe.ingredients.map(([ingredientId, quantity]) => ({
          ingredientId,
          quantity,
        })),
      };

      const docRef = collection(db, "recipes");
        const docSnap = await getDoc(docRef);
        docSnap.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });

      // const recipeRef = doc(db, "recipes", recipe.recipeId);
      // const recipeSnapshot = await getDoc(recipeRef);
      // console.log("from deb", recipeSnapshot)
      // const data = await getDoc()
      // const docRef = await updateDoc(collection(db, "recipes"), {
      //   recipeNew,
      // });

      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Recipe added successfully");
      navigation.navigate("Home");
    } catch (error) {
      navigation.navigate("Home")
      console.log(error);
    }
  };
  if (loading) {
    <ActivityIndicator/>
  }

  return (
    <ScrollView contentContainerStyle={[
      styles.scrollContent,
      { paddingBottom: keyboardOffset },
    ]}
    keyboardShouldPersistTaps="handled">   
        <View style={styles.container}>
        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Recipe Title'
          value={recipe.title}
          onChangeText={(value) => handleInputChange("title", value)}
        />
        
       
        <Text style={styles.label}>Select Category</Text>
        <Picker
          selectedValue={recipe.categoryId}
          style={styles.picker}
          onValueChange={(value) => handleCategoryChange(value)}
        >
          <Picker.Item label='Select Category' value='' />
          {categoryOptions.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.label}
              value={category.id}
            />
          ))}
        </Picker>
        <Text style={styles.label}>Primary Photo</Text>
        <TextInput
          style={styles.input}
          placeholder='Photo URL'
          value={recipe.photo_url}
          onChangeText={(value) => handleInputChange("photo_url", value)}
        />

        <Text style={styles.label}>Add Secondary Photos</Text>
        {recipe.photosArray.map((photo, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Photo URL ${index + 1}`}
            value={photo}
            onChangeText={(value) => {
              const updatedPhotos = [...recipe.photosArray];
              updatedPhotos[index] = value;
              handleInputChange("photosArray", updatedPhotos);
            }}
          />
        ))}

        <TouchableHighlight
          underlayColor="rgba(73,182,77,0.9)"
          onPress={() => {
            const updatedPhotos = [...recipe.photosArray, ""];
            handleInputChange("photosArray", updatedPhotos);
          }}
          style={styles.buttonContainer}
        >
        <View>
        <Text style={styles.text}>ADD PHOTO</Text>
        </View>
        </TouchableHighlight>

        <Text style={styles.label}>Time to Make</Text>
        <TextInput
          style={styles.input}
          placeholder='Time'
          value={recipe.time}
          onChangeText={(value) => handleInputChange("time", value)}
        />

        <Text style={styles.label}>Select Ingredients</Text>
        {recipe.ingredients.map(([ingredientId, quantity], index) => (
          <View key={index} style={styles.ingredientContainer}>
            <Picker
              style={styles.ingredientPicker}
              selectedValue={ingredientId}
              onValueChange={(value) => handleIngredientChange(index, value)}
            >
              <Picker.Item label='Select Ingredient' value='' />
              {ingredientsList.map((ingredient) => (
                <Picker.Item
                  key={ingredient.id}
                  label={ingredient.name}
                  value={ingredient.id}
                />
              ))}
            </Picker>

            <TextInput
              style={styles.quantityInput}
              placeholder='Quantity'
              value={quantity}
              onChangeText={(value) => handleQuantityChange(index, value)}
            />
          </View>
        ))}

        <TouchableHighlight
          underlayColor="rgba(73,182,77,0.9)"
          onPress={() => {
            const updatedIngredients = [...recipe.ingredients, ["", ""]];
            handleInputChange("ingredients", updatedIngredients);
          }}
          style={styles.buttonContainer}
        >
        <View>
        <Text style={styles.text}>ADD INGREDIENT</Text>
        </View>
        </TouchableHighlight>
       

        <View>
           <Text style={styles.label}>Add Description</Text>
          <TextInput
          style={styles.input}
          placeholder='Description'
          value={recipe.description}
          onChangeText={(value) => handleInputChange("description", value)}
          multiline
        />
        </View>
        <TouchableHighlight
          underlayColor="rgba(73,182,77,0.9)"
          onPress={handleSubmit}
          style={styles.buttonContainer}
        >
        <View>
        <Text style={styles.text}>SUBMIT</Text>
        </View>
        </TouchableHighlight>
      </View>    
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  buttonContainer: {
    flex: 1,
    height: 50,
    width: 170,
    marginTop: 5,
    marginLeft: "25%",
    marginRight: 10,
    marginBottom:20,
    borderRadius: 100,
    borderColor: 'blue',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: 'blue'
  },

  label: {
    marginBottom: 8,
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },

  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  picker: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  ingredientContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  ingredientPicker: {
    width:"80%",
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  quantityInput: {
    width:"20%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
});

export default UpdateRecipe;
