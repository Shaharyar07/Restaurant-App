import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { db } from "../../firebase";

const AddIngrediant = () => {
  const [ingredient, setIngredient] = useState({
    name: "",
    photo_url: "",
  });

  const handleInputChange = (field, value) => {
    setIngredient({ ...ingredient, [field]: value });
  };

  const handleSubmit = async () => {
    console.log(ingredient);
    try {
      const docRef = await addDoc(collection(db, "ingredients"), ingredient);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
    setIngredient({ name: "", photo_url: "" });
    Alert.alert("Ingredient added successfully");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingredient Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingredient Name'
        value={ingredient.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />
      <Text style={styles.label}>Ingredient Photo</Text>
      <TextInput
        style={styles.input}
        placeholder='Photo URL'
        value={ingredient.photo_url}
        onChangeText={(value) => handleInputChange("photo_url", value)}
      />

      <Button title='Submit' onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  label: {
    marginBottom: 8,
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },
});

export default AddIngrediant;
