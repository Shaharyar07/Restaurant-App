import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

const AddIngrediant = () => {
  const [ingredient, setIngredient] = useState({
    name: "",
    photo_url: "",
  });

  const handleInputChange = (field, value) => {
    setIngredient({ ...ingredient, [field]: value });
  };

  const handleSubmit = () => {
    setIngredient({ name: "", photo_url: "" });
    console.log(ingredient);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingredient Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingredient Name"
        value={ingredient.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />
      <Text style={styles.label}>Ingredient Photo</Text>
      <TextInput
        style={styles.input}
        placeholder="Photo URL"
        value={ingredient.photo_url}
        onChangeText={(value) => handleInputChange("photo_url", value)}
      />

      <Button title="Submit" onPress={handleSubmit} />
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
