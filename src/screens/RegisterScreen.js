import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { registerUser } from '../firebase/authServices'; 
import { setAuthState } from '../store/authSlice';  
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (email !== confirmEmail) {
      Alert.alert("Error", "E-mails do not match!");
      return;
    }

    try {
      const user = await registerUser(email, password);
      if (user) {
        dispatch(setAuthState({
          isLoggedIn: true,
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || ''
          }
        }));
        navigation.navigate('Home'); 
      } else {
        throw new Error("Registration succeeded but no user data found.");
      }
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Confirm Email"
        value={confirmEmail}
        onChangeText={setConfirmEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Register"
        onPress={handleRegister}
        containerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
};

export default RegisterScreen;
