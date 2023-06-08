import React from "react";
import { TouchableHighlight, Image, Text, View,StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function ViewIngredientsButton(props) {
  return (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={props.onPress}
      style={styles.container}
    >
      <View>
        <Text style={styles.text}>View Ingredients</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    width: 270,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    borderColor: '#2cd18a',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: '#2cd18a'
  }
});

ViewIngredientsButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
