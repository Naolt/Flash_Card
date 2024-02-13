import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {AdjustmentsHorizontalIcon} from 'react-native-heroicons/outline';
import {colors} from '../../config/color';

const CustomNormalTextInput = ({style, placeHolder, state, name, setForm}) => {
  return (
    <View style={{...styles.inputContainer, ...style}}>
      <TextInput
        placeholder={placeHolder}
        onChangeText={newText =>
          setForm(prev => {
            let newState = prev;
            newState[name] = {...newState[name], value: newText};
            console.log(newState);
            return {...newState};
          })
        }
        defaultValue={state.value}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.icon.lighter,
    borderRadius: 8,
    //width: 200,
    paddingHorizontal: 18,
    //paddingVertical: ,
  },
  textInput: {
    fontSize: 15,
  },
});

export default CustomNormalTextInput;
