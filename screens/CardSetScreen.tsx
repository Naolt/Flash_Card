import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
} from 'react-native-heroicons/outline';
import {colors} from '../config/color';
import {HeartIcon} from 'react-native-heroicons/solid';
import Card from '../components/Card/Card';

let cards = [
  {question: 'What is your name?', answer: 'Naol'},
  {question: 'Capital City of America', answer: 'Addis Ababa'},
  {question: 'What is your name?', answer: 'Naol'},
  {question: 'Capital City of America', answer: 'Addis Ababa'},
];
const CardSetScreen = () => {
  const {
    params: {id, title, likes, createdAt, updatedAt, imgUrl, visibility},
  } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color={colors.background.default} />
        </TouchableOpacity>
        <Image
          source={{
            uri: imgUrl,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.bodyText} ellipsizeMode="tail" numberOfLines={4}>
          Learn basic Spanish vocabulary words with this flashcard set. The set
          includes flashcards for common words and phrases, such as numbers,
          colors, and basic conversation starters. Perfect for beginners who are
          just starting to learn Spanish
        </Text>
        <View style={styles.ownerContainer}>
          <View style={styles.owner}>
            <Image
              source={{
                uri: imgUrl,
              }}
              style={styles.ownerImage}
            />
            <Text style={styles.ownerName}>Sam Alisson</Text>
          </View>
          <View style={styles.like}>
            <HeartIcon color={colors.icon.default} />
            <Text>{likes}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flashCardsHeader}>
        <Text style={styles.headerText}>Flash Cards</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('FlashCards', {
              id,
              title,
              likes,
              createdAt,
              updatedAt,
              imgUrl,
              visibility,
            });
          }}>
          <Text style={styles.btnText}>Open</Text>
          <ArrowUpRightIcon size={16} color={colors.secondary.lighter} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flashCardsContainer}>
        {cards.map(({question, answer}, index) => {
          if (index == 0)
            return <View style={{width: 10, height: '100%'}}></View>;
          return (
            <Card
              width={200}
              height={200}
              question={question}
              answer={answer}
            />
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'red',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  arrowContainer: {
    position: 'absolute',
    top: 14,
    left: 10,
    backgroundColor: colors.icon.default + '44',
    padding: 8,
    borderRadius: 50,
    zIndex: 2,
  },
  contentContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text.default,
    //marginBottom: 6,
  },
  bodyText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.icon.lighter,
    marginBottom: 5,
    lineHeight: 20,
    //fontFamily: 'poppins',
  },
  ownerContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  owner: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ownerName: {
    color: colors.icon.lighter,
    fontSize: 13,
  },
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  like: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  flashCardsHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.text.default,
    flex: 1,
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: colors.secondary.lighter,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnText: {
    fontSize: 14,
    color: colors.secondary.lighter,
  },
  flashCardsContainer: {
    display: 'flex',
    gap: 10,
    paddingVertical: 10,
  },
  date: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});

export default CardSetScreen;
