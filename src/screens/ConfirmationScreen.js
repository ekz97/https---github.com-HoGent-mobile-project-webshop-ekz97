import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';   

const ConfirmationScreen = ({ route, navigation }) => {
  const { orderDetails } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    // Winkelwagen wordt geleegd na het plaatsen van de bestelling
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bedankt voor uw bestelling!</Text>
      <Text style={styles.details}>Order ID: {orderDetails.id || 'N/A'}</Text>
      <Text style={styles.details}>Totale Kosten: €{orderDetails.total || '0.00'}</Text>
      <Button
        title="Terug naar Home"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ConfirmationScreen;
