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

export default function MyListScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <ScrollView></ScrollView>
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
  },
});
