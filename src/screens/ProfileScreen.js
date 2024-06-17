import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';  
import { logoutUser } from '../firebase/authServices';  
import { useNavigation } from '@react-navigation/native'; 

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();  

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigation.replace('Login');  
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text h4>Profiel Pagina</Text>
      <Button
        title="Uitloggen"
        onPress={handleLogout}
        buttonStyle={{ backgroundColor: '#2089dc', marginTop: 20 }}
      />
      <Button
        title="Terug naar Home"
        onPress={() => navigation.goBack()}
        type="clear"
      />
    </View>
  );
};

export default ProfileScreen;
