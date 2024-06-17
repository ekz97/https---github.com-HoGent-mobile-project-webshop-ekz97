import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const ProductStack = createStackNavigator();

function ProductStackNavigator() {
  return (
    <ProductStack.Navigator initialRouteName="ProductList">
      <ProductStack.Screen name="ProductList" component={ProductListScreen} options={{ headerTitle: 'Productlijst' }} />
      <ProductStack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerTitle: 'Productdetails' }} />
    </ProductStack.Navigator>
  );
}

export default ProductStackNavigator;
