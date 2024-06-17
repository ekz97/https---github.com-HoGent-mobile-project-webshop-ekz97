
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import OrderFormScreen from '../screens/OrderFormScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

const ShoppingCartStack = createStackNavigator();

const ShoppingCartNavigator = () => (
  <ShoppingCartStack.Navigator>
    <ShoppingCartStack.Screen 
      name="ShoppingCart" 
      component={ShoppingCartScreen} 
      options={{ headerTitle: 'Winkelmandje' }} 
    />
    <ShoppingCartStack.Screen 
      name="OrderForm" 
      component={OrderFormScreen} 
      options={{ headerTitle: 'Afrekenen' }} 
    />
    <ShoppingCartStack.Screen 
      name="Confirmation" 
      component={ConfirmationScreen} 
      options={{ headerTitle: 'Bestelling Bevestigd' }} 
    />
  </ShoppingCartStack.Navigator>
);

export default ShoppingCartNavigator;
