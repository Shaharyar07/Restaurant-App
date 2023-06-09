import React,{useContext,useState,useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home/HomeScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import RecipeScreen from "../screens/Recipe/RecipeScreen";
import RecipesListScreen from "../screens/RecipesList/RecipesListScreen";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import IngredientScreen from "../screens/Ingredient/IngredientScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import IngredientsDetailsScreen from "../screens/IngredientsDetails/IngredientsDetailsScreen";
import AddRecipe from "../screens/AddMeal/AddRecipe";
import AddCategory from "../screens/AddCategory/AddCategory";
import AddIngrediant from "../screens/AddIngrediant/AddIngrediant";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchIngredients } from "../redux/slices/ingredientsSlice";
import { fetchRecipes } from "../redux/slices/recipesSlice";
import { color } from "react-native-reanimated";
import themeContext from "../screens/Themes/themeContext";
import { HeaderBackButton } from "@react-navigation/elements";
import UpdateRecipe from "../screens/UpdateMeal/UpdateRecipe";
import SortScreen from "../screens/Sorting/SortScreen";

const Stack = createStackNavigator();

function MainNavigator() {
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    var tempTheme = theme;
    if(tempTheme.theme === "light"){
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          flex: 1,
          textAlign: "center",
          alignSelf: "center",
        },
        headerTitleContainerStyle: {
          marginTop: 14,
          
        },
        headerTitleStyle : darkMode? {color:"white"}:null,
        headerStyle:  darkMode?{ backgroundColor: 'black' } : { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Categories' component={CategoriesScreen} />
      <Stack.Screen name='Recipe' component={RecipeScreen} />
      <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='Add Recipe' component={AddRecipe} />
      <Stack.Screen name='Add Category' component={AddCategory} />
      <Stack.Screen name='Add Ingrediant' component={AddIngrediant} />
      <Stack.Screen name='Update Recipe' component={UpdateRecipe} />
      <Stack.Screen name='Sort Screen' component={SortScreen} />
      <Stack.Screen
        name='IngredientsDetails'
        component={IngredientsDetailsScreen}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250,
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchCategories());
  //   dispatch(fetchIngredients());
  //   dispatch(fetchRecipes());
  // }, []);
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}

console.disableYellowBox = true;
