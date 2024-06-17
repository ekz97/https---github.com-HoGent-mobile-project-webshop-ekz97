import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { loginUser } from '../firebase/authServices';
import { setAuthState } from '../store/authSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
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
        throw new Error("Authentication failed.");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
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
        placeholder="Wachtwoord"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Inloggen"
        onPress={handleLogin}
        containerStyle={{ paddingVertical: 10 }}
      />
      <Button
        title="Registreren"
        onPress={navigateToRegister}
        type="outline"
      />
    </View>
  );
};

export default LoginScreen;
