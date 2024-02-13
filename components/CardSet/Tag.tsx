import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../config/color';

const Tag = ({tag, color = colors.background.default}) => {
  return (
    <View style={{...styles.container, backgroundColor: color}} key={tag}>
      <Text style={styles.text}>{tag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    height: 30,
  },
  text: {
    fontSize: 12,
    color: colors.icon.lighter,
    textTransform: 'capitalize',
  },
});

export default Tag;
