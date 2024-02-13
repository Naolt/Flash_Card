import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Card from '../components/Card/Card';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {colors} from '../config/color';
import {PlusCircleIcon} from 'react-native-heroicons/solid';

let cards = [
  {question: 'What is your name?', answer: 'Sifen'},
  {question: 'Capital City of America', answer: 'Addis Ababa'},
  {question: 'What is your name?', answer: 'Sifen'},
  {question: 'Capital City of America', answer: 'Addis Ababa'},
];

const FlashCards = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <ArrowLeftIcon color={colors.icon.default} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {cards.map(({question, answer}) => {
          return (
            <Card
              question={question}
              answer={answer}
              width="100%"
              height={200}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  backBtn: {
    marginVertical: 15,
    paddingLeft: 15,
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 10,
  },
});

export default FlashCards;
