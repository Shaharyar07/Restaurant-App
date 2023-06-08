import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";

const ingredientsList = [
  { id: 0, name: "Ingredient 1" },
  { id: 1, name: "Ingredient 2" },
  { id: 2, name: "Ingredient 3" },
];

const categoryOptions = [
  { id: 1, label: "Category 1" },
  { id: 2, label: "Category 2" },
  { id: 3, label: "Category 3" },
];

const AddRecipe = () => {
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

  const handleInputChange = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const handleCategoryChange = (value) => {
    setRecipe({ ...recipe, categoryId: value });
  };

  const handleIngredientChange = (index, ingredientId) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = [ingredientId, ""];
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index][1] = quantity;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleSubmit = () => {
    console.log(recipe);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Recipe Title"
          value={recipe.title}
          onChangeText={(value) => handleInputChange("title", value)}
        />
        <Text style={styles.label}>Select Category</Text>
        <Picker
          selectedValue={recipe.categoryId}
          style={styles.picker}
          onValueChange={(value) => handleCategoryChange(value)}
        >
          <Picker.Item label="Select Category" value="" />
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
          placeholder="Photo URL"
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

        <Button
          title="Add Photo"
          onPress={() => {
            const updatedPhotos = [...recipe.photosArray, ""];
            handleInputChange("photosArray", updatedPhotos);
          }}
        />

        <Text style={styles.label}>Time to Make</Text>
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={recipe.time}
          onChangeText={(value) => handleInputChange("time", value)}
        />

        <Text style={styles.label}>Select Ingrediants</Text>
        {recipe.ingredients.map(([ingredientId, quantity], index) => (
          <View key={index} style={styles.ingredientContainer}>
            <Picker
              style={styles.ingredientPicker}
              selectedValue={ingredientId}
              onValueChange={(value) => handleIngredientChange(index, value)}
            >
              <Picker.Item label="Select Ingredient" value="" />
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
              placeholder="Quantity"
              value={quantity}
              onChangeText={(value) => handleQuantityChange(index, value)}
            />
          </View>
        ))}

        <Button
          title="Add Ingredient"
          onPress={() => {
            const updatedIngredients = [...recipe.ingredients, ["", ""]];
            handleInputChange("ingredients", updatedIngredients);
          }}
        />
        <Text style={styles.label}>Add Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={recipe.description}
          onChangeText={(value) => handleInputChange("description", value)}
          multiline
        />

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  quantityInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
});

export default AddRecipe;
