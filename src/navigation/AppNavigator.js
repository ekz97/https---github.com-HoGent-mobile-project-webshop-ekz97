import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductStackNavigator from './ProductStackNavigator';
import ShoppingCartNavigator from './ShoppingCartNavigator';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Home' }} />
      <Tab.Screen name="Products" component={ProductStackNavigator} options={{ headerTitle: 'Producten' }} />
      <Tab.Screen name="Cart" component={ShoppingCartNavigator} options={{ headerTitle: 'Winkelmandje' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: 'Profiel' }} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
