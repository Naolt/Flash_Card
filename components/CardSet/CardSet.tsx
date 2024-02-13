import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {colors} from '../../config/color';
import {ScrollView} from 'react-native/Libraries/Components/ScrollView/ScrollView';
import Tag from './Tag';
import {HeartIcon} from 'react-native-heroicons/outline';

let tags = ['computer', 'history', 'biology', 'technology'];

const CardSet = ({
  id,
  title,
  likes,
  dateCreated,
  dateUpdated,
  imgUrl,
  visibility,
  
}) => {
  return 
    <View key={id} style={styles.cardContainer}>
      <Image source={{uri: imgUrl}} style={styles.image} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <ScrollView horizontal contentContainerStyle={styles.tagsContainer}>
          {tags.map(tag => {
            return <Tag tag={tag} />;
          })}
        </ScrollView>
      </View>
    </View>
  
    
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.background.default,
    gap: 20,
    borderRadius: 8,
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
 
});
export default CardSet;
