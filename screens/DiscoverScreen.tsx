import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar/NavBar';
import {colors} from '../config/color';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
} from 'react-native-heroicons/outline';
import CustomTextInput from '../components/CustomTextInput/CustomTextInput';
import Tag from '../components/CardSet/Tag';
import Card from '../components/Card/Card';
import CardSets from '../components/CardSet/CardSets';

const categories = ['Popular Flash Cards', 'Recent Flash Cards', 'For You'];
let tags = [
  'computer',
  'history',
  'biology',
  'technology',
  'computer',
  'history',
  'biology',
  'technology',
];
export default function DiscoverScreen() {
  const [cardSets, setCardSets] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    fetch('https://63124ddbb466aa9b03881997.mockapi.io/cardSets')
      .then(res => res.json())
      .then(data => {
        setCardSets(data);
      });
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <CustomTextInput style={{width: 251, marginBottom: 16}} />
        <ScrollView horizontal contentContainerStyle={styles.tagsContainer}>
          {tags.map(tag => {
            return <Tag tag={tag} color={colors.background.lighter} />;
          })}
        </ScrollView>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {categories.map(category => {
            return (
              <View style={styles.categoryContainer}>
                <View style={styles.categoryHeaderContainer}>
                  <Text style={styles.categoryTitle}>{category}</Text>
                  <ArrowRightIcon color={colors.icon.default} />
                </View>
                <ScrollView
                  horizontal
                  contentContainerStyle={styles.tagsContainer}>
                  {cardSets.map(
                    ({
                      id,
                      title,
                      likes,
                      createdAt,
                      updatedAt,
                      imgUrl,
                      visibility,
                    }) => {
                      return (
                        <CardSets
                          {...{
                            id,
                            title,
                            likes,
                            createdAt,
                            updatedAt,
                            imgUrl,
                            visibility,
                            cards: true,
                          }}
                        />
                      );
                    },
                  )}
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.navContainer}>
          <NavBar />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
  },
  screenContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: colors.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  tagsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  contentContainer: {
    //flex: 1,
    display: 'flex',
    backgroundColor: colors.background.default,
    //paddingLeft: 10,
  },
  categoryContainer: {
    display: 'flex',
    paddingHorizontal: 10,
    //backgroundColor: 'red',
  },
  categoryHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 20,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 20,
    color: colors.text.default,
    //fontWeight: '400',
  },
});
