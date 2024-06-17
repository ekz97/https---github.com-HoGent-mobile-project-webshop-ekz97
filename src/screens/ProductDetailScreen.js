import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchProductDetails } from '../firebase/firestoreService';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProductDetails = async () => {
      const productDetails = await fetchProductDetails(productId);
      setProduct(productDetails);
    };

    loadProductDetails();
  }, [productId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {product ? (
        <>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>€{product.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(addToCart(product))}>
              <Text style={styles.buttonText}>Voeg toe aan winkelmandje</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.notFound}>Product niet gevonden.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#6f61e8',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  notFound: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red'
  }
});

export default ProductDetailScreen;
