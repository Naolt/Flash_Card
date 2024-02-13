import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../config/color';

const Card = ({width, height, question = '', answer = ''}) => {
  const [isPressed, setPressed] = React.useState(false);

  const handlePress = () => {
    if (isPressed) {
      setPressed(false);
    } else {
      setPressed(true);
      setTimeout(() => {
        setPressed(false);
      }, 4000);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      style={{
        width: width,
        height: height,
        ...styles.container,
        backgroundColor: isPressed
          ? colors.secondary.default
          : colors.background.default,
      }}>
      <Text
        style={{
          ...styles.title,
          color: isPressed ? colors.background.default : colors.text.default,
        }}>
        {isPressed ? answer : question}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.icon.lighter,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Card;
