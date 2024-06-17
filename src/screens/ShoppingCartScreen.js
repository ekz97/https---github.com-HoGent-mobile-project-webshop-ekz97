import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../store/cartSlice';
import { saveOrder } from '../firebase/firestoreService';

const ShoppingCartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const handleCheckout = async () => {
    try {
      const order = {
        items: cartItems,
        totalAmount: totalAmount,
        date: new Date().toISOString(),
      };
      const orderId = await saveOrder(order);
      dispatch(clearCart());
      Alert.alert("Bestelling voltooid", `Je bestelling met ID: ${orderId} is succesvol opgeslagen.`);
      navigation.navigate('Home');  
    } catch (error) {
      Alert.alert("Bestelling mislukt", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>€{item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => dispatch(addToCart(item))} style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Totaal: €{totalAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.checkoutButtonContainer}>
        <Button title="Afrekenen" onPress={handleCheckout} color="#1E90FF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10
  },
  infoContainer: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 5
  },
  price: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 5
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#dedede',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: 'bold'
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  checkoutButtonContainer: {
    marginTop: 20
  }
});

export default ShoppingCartScreen;
