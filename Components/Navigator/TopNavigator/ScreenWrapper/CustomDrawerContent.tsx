import React from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props: any) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
      </View>

      {/* Default Drawer Items */}
      <DrawerItemList {...props} />

      {/* Custom Drawer Items */}
      <DrawerItem 
        label="Go to Home" 
        onPress={() => navigation.navigate('Home')} 
      />
      <DrawerItem 
        label="Open Settings" 
        onPress={() => navigation.navigate('Settings')} 
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
