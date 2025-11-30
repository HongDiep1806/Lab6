import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Icon, MD3Colors } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { login } from '../services/serviceAPIs';
const LoginScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async () => {
      const result = await login(userName, password);
      if(result.error){
        alert(result.message);
      }
      else{
        alert('Login successful!');
        navigation.replace('Home')
      }
    


  }
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.input}>
          <TextInput
            mode="outlined"
            label="Username"
            placeholder="Username"
            right={<TextInput.Affix text="/100" />}
            value={userName}
            onChangeText={setUserName}
            style={styles.textInput}
            placeholderTextColor="#ffffffff"
            outlineColor="#c6c6c6ff"
            activeOutlineColor="#f3417cff"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry={!showPassword}
            outlineColor="#c6c6c6"
            activeOutlineColor="#f3417ccf"
            theme={{ colors: { primary: '#f3417cff' } }}
            onChangeText={setPassword}
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#f3417cff"
                  />
                )}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    // margin: 10
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f3417cff',
  },
  input: {
    marginTop: 10,
    // borderColor: '#f1769fff',
    borderRadius: 5,
    // borderWidth: 1,
    // backgroundColor: '#f8c5d6ff',
  },
  textInput: {
    // color: '#ffffffff',
    borderColor: '#f1769fff',
  },
  loginContainer: {
    // borderWidth: 1,
    // borderColor: 'black',
    flex: 2,
    marginHorizontal: 50,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#f3417cff',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default LoginScreen;
