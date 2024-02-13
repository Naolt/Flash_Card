import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  AdjustmentsVerticalIcon,
  HeartIcon,
  ClipboardDocumentIcon,
  UserCircleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {colors} from '../../config/color';

const NavBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={styles.singleNav}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <View style={styles.navIconActive}>
          <HomeIcon color={colors.icon.lighter} />
        </View>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.singleNav}
        onPress={() => navigation.navigate('Cards')}>
        <View style={styles.navIcon}>
          <ClipboardDocumentIcon color={colors.icon.lighter} />
        </View>
        <Text>Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.singleNav}
        onPress={() => navigation.navigate('Discover')}>
        <View style={styles.navIcon}>
          <MagnifyingGlassIcon color={colors.icon.lighter} />
        </View>
        <Text> Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleNav}>
        <View style={styles.navIcon}>
          <HeartIcon color={colors.icon.lighter} />
        </View>
        <Text>My List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleNav}>
        <View style={styles.navIcon}>
          <UserCircleIcon color={colors.icon.lighter} />
        </View>
        <Text> Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: 10,
    flexDirection: 'row',
    paddingHorizontal: 24,
    backgroundColor: colors.background.lighter,
  },
  singleNav: {
    position: 'relative',
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },
  navIcon: {
    borderRadius: 50,
    padding: 5,
  },
  navIconActive: {
    borderRadius: 50,
    padding: 5,
  },
  navText: {
    fontSize: 1,
  },
});

export default NavBar;
