import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar/NavBar';
import {colors} from '../config/color';
import {SafeAreaView} from 'react-native-safe-area-context';
import CardSet from '../components/CardSet/CardSet';
import Tag from '../components/CardSet/Tag';
import CardSets from '../components/CardSet/CardSets';
import Tab from '../components/Tab/Tab';
import {PlusCircleIcon} from 'react-native-heroicons/solid';

//let cards = [
//  {
//    id: 1,
//    title: 'Construction of Molecule',
//    tags: ['computer', 'software', 'chemistry'],
//    likes: 20,
//    dateCreated: '1/2/2012',
//    dateUpdated: '1/2/2022',
//    imgUrl: '../../assets/artturi-jalli-gYrYa37fAKI-unsplash.jpg',
//    visibility: 'private',
//  },
//  {
//    id: 2,
//    title: 'History of Ethiopia',
//    tags: ['computer', 'software', 'chemistry'],
//    likes: 20,
//    dateCreated: '1/2/2012',
//    dateUpdated: '1/2/2022',
//    imgUrl: '../../assets/mads-eneqvist-9E1WN-8DtoQ-unsplash.jpg',
//    visibility: 'private',
//  },
//  {
//    id: 3,
//    title: 'Life is hard',
//    tags: ['computer', 'software', 'chemistry'],
//    likes: 40,
//    dateCreated: '1/2/2012',
//    dateUpdated: '1/2/2022',
//    imgUrl: '../../assets/national-cancer-institute-L7en7Lb-Ovc-unsplash.jpg',
//    visibility: 'private',
//  },
//  {
//    id: 4,
//    title: 'Today is the day',
//    tags: ['computer', 'software', 'chemistry'],
//    likes: 70,
//    dateCreated: '1/2/2012',
//    dateUpdated: '1/2/2022',
//    imgUrl: '../../assets/oc-gonzalez-xg8z_KhSorQ-unsplash.jpg',
//    visibility: 'private',
//  },
//  {
//    id: 5,
//    title: 'Yes Please',
//    tags: ['computer', 'software', 'chemistry'],
//    likes: 20,
//    dateCreated: '1/2/2012',
//    dateUpdated: '1/2/2022',
//    imgUrl: '../../assets/pexels-eberhard-grossgasteiger-2310641.jpg',
//    visibility: 'private',
//  },
//];

export default function CardsScreen() {
  const [cardSets, setCardSets] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.screenContainer}>
        <Tab
          tabs={['All', 'Private', 'Public']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TouchableOpacity
          style={styles.addIcon}
          onPress={() => navigation.navigate('Add Flash Card')}>
          <PlusCircleIcon color={colors.secondary.default} size={64} />
        </TouchableOpacity>
        <View style={styles.screenBody}>
          <ScrollView contentContainerStyle={styles.cardSetsContainer}>
            {cardSets
              .filter(cardSet => {
                console.log(cardSet);
                if (activeTab == 'All') {
                  return true;
                } else {
                  if (activeTab == 'Private') {
                    if (!cardSet.visibility) {
                      return true;
                    }
                  } else {
                    if (cardSet.visibility) {
                      return true;
                    }
                  }
                }
                return false;
              })
              .map(
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
                      }}
                    />
                  );
                },
              )}
          </ScrollView>
        </View>
        <View style={styles.navContainer}>
          <NavBar />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  screenContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: colors.background.default,
    display: 'flex',
    alignItems: 'center',
  },
  navContainer: {},
  cardSetsContainer: {
    display: 'flex',
    gap: 20,
    backgroundColor: colors.background.default,
    paddingHorizontal: 20,
  },
  screenBody: {
    position: 'relative',
    flex: 1,
    width: '100%',
  },
  addIcon: {
    position: 'absolute',
    bottom: 100,
    //right: 10,
    zIndex: 2,
  },
});
