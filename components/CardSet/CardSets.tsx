import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../config/color';
import Tag from './Tag';
import {HeartIcon} from 'react-native-heroicons/outline';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Gradient from '../LinearGradient/Gradient';
import {LinearGradient} from 'expo-linear-gradient';

let tags = ['computer', 'history', 'biology', 'technology'];
const CardSets = ({
  id,
  title,
  likes,
  createdAt,
  updatedAt,
  imgUrl,
  visibility,
  cards,
}) => {
  const navigation = useNavigation();
  let date = moment(createdAt).format('MMM Do YYYY');

  return !cards ? (
    <TouchableOpacity
      key={id}
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('CardSet', {
          id,
          title,
          likes,
          createdAt,
          updatedAt,
          imgUrl,
          visibility,
        });
      }}>
      <Image source={{uri: imgUrl}} style={styles.image} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <ScrollView horizontal contentContainerStyle={styles.tagsContainer}>
          {tags.map(tag => {
            return <Tag tag={tag} />;
          })}
        </ScrollView>
        <View style={styles.likeDateContainer}>
          <View style={styles.like}>
            <HeartIcon color={colors.icon.default} />
            <Text>{likes}</Text>
          </View>

          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      key={id}
      style={styles.bigCardContainer}
      onPress={() => {
        navigation.navigate('CardSet', {
          id,
          title,
          likes,
          createdAt,
          updatedAt,
          imgUrl,
          visibility,
        });
      }}>
      <View style={styles.ImageContainer}>
        <Image source={{uri: imgUrl}} style={styles.bigImage} />
        <View style={styles.profileAndLikeContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: imgUrl,
              }}
              style={styles.profilePicture}
            />
            <Text style={styles.userName}>Mieraf Jejaw</Text>
          </View>
          <HeartIcon color={colors.background.lighter} />
        </View>
        <View style={styles.titleAndLikes}>
          <Gradient
            fromColor={colors.icon.default}
            toColor={colors.icon.default}
            opacityColor2={1}
            opacityColor1={0}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                width: '100%',
                position: 'absolute',
                bottom: 2,
              }}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.wordLikes}>{likes} Likes</Text>
            </View>
          </Gradient>
        </View>
      </View>
      <View>
        <ScrollView horizontal contentContainerStyle={styles.tagsContainer}>
          {tags.map(tag => {
            return <Tag tag={'#' + tag} />;
          })}
        </ScrollView>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
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
    elevation: 1,
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.text.default,
    marginBottom: 5,
  },
  tagsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    marginBottom: 5,
  },
  like: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  likeDateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 80,
  },
  date: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  bigCardContainer: {
    width: 276,
    padding: 10,
    display: 'flex',
    backgroundColor: colors.background.lighter,
    gap: 10,
    borderRadius: 8,
    elevation: 1,
  },
  ImageContainer: {
    height: 150,
    width: '100%',
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  bigImage: {
    width: '100%',
    height: '100%',
  },
  profileAndLikeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: 10,
    backgroundColor: colors.icon.default + 'CC',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  userName: {
    fontSize: 12,
    color: colors.icon.lighter,
  },
  titleAndLikes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30,
    //padding: 10,
    //margin: 10,
    //backgroundColor: colors.icon.default + '55',
  },
  cardTitle: {
    fontSize: 20,
    color: colors.background.default,
    flex: 1,
  },
  wordLikes: {
    fontSize: 12,
    color: colors.background.lighter + '99',
  },
});

export default CardSets;
