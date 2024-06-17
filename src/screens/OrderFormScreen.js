
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native'; 
import { useSelector } from 'react-redux';  

const OrderSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
});

const OrderFormScreen = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);


  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', name: '', address: '' }}
        validationSchema={OrderSchema}
        onSubmit={(values) => {
          const orderDetails = {
            ...values,
            id: 'ORD' + Math.floor(Math.random() * 1000000), 
            total: calculateTotal(),  
          };
          console.log(orderDetails);
          navigation.navigate('Confirmation', { orderDetails });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.inputField}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Name"
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              style={styles.inputField}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={styles.inputField}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              placeholder="Address"
            />
            {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

            <Button onPress={handleSubmit} title="Submit Order" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default OrderFormScreen;
