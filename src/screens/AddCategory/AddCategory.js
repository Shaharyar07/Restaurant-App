import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text,TouchableHighlight } from "react-native";
import { db } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    photo_url: "",
  });

  const handleInputChange = (field, value) => {
    setCategory({ ...category, [field]: value });
  };

  const handleSubmit = async () => {
    console.log(category);
    try {
      const docRef = await addDoc(collection(db, "categories"), category);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
    setCategory({ name: "", photo_url: "" });
    Alert.alert("Category added successfully");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Category Name'
        value={category.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />
      <Text style={styles.label}>Category Photo</Text>
      <TextInput
        style={styles.input}
        placeholder='Photo URL'
        value={category.photo_url}
        onChangeText={(value) => handleInputChange("photo_url", value)}
      />

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
  );
};

const styles = StyleSheet.create({

  buttonContainer: {
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

export default AddCategory;
