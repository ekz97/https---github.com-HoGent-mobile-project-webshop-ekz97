import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { fetchProducts } from '../firebase/firestoreService';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Picker } from '@react-native-picker/picker'; 

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      const loadedProducts = await fetchProducts();
      setProducts(loadedProducts);
      setFilteredProducts(loadedProducts);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === 'All' || product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  }, [search, products, selectedCategory]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Zoek producten"
        value={search}
        onChangeText={setSearch}
      />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Alle Categorieën" value="All" />
        <Picker.Item label="Parfum" value="Parfum" />
        <Picker.Item label="Eau de Toilette" value="Eau de Toilette" />
        <Picker.Item label="Aftershave" value="Aftershave" />
        <Picker.Item label="Deodorant" value="Deodorant" />
      </Picker>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>€{item.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
                  <Text style={styles.buttonText}>Voeg toe aan winkelmandje</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10
  },
  infoContainer: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  searchBar: {
    fontSize: 18,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  button: {
    backgroundColor: '#6f61e8',
    padding: 10,
    borderRadius: 5,
    marginTop: 5
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  picker: {
    width: '100%',
    height: 44,
    marginBottom: 20,
  }
});

export default ProductListScreen;
