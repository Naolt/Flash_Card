import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../config/color';

const SingleTab = ({name, active, setActiveTab}) => {
  return (
    <TouchableOpacity
      style={active ? styles.activeTab : styles.tab}
      onPress={() => setActiveTab(name)}>
      <Text style={active ? styles.activeText : styles.tabText}>{name}</Text>
    </TouchableOpacity>
  );
};

const Tab = ({tabs, activeTab, setActiveTab}) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map(name => {
        return (
          <SingleTab
            name={name}
            active={activeTab == name}
            setActiveTab={setActiveTab}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
    elevation: 1,
    //backgroundColor: colors.text.default,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.background.default,
  },
  activeTab: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.secondary.default,
  },
  tabText: {
    display: 'flex',
    fontSize: 16,
  },
  activeText: {
    display: 'flex',
    fontSize: 16,
    color: colors.background.lighter,
  },
});

export default Tab;
