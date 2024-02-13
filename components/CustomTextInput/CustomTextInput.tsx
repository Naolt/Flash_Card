import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {AdjustmentsHorizontalIcon} from 'react-native-heroicons/outline';
import {colors} from '../../config/color';

const CustomTextInput = ({style}) => {
  const [searchText, setSearchText] = React.useState('');
  return (
    <View style={{...styles.inputContainer, ...style}}>
      <TextInput
        placeholder="Search"
        onChangeText={newText => setSearchText(searchText)}
        defaultValue={searchText}
        style={styles.textInput}
      />
      <AdjustmentsHorizontalIcon color={colors.icon.lighter} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.icon.lighter,
    borderRadius: 26,
    //width: 200,
    paddingHorizontal: 18,
    //paddingVertical: ,
  },
  textInput: {
    fontSize: 15,
  },
});

export default CustomTextInput;
