import React, { useState } from 'react';
import { Appbar, Text } from 'react-native-paper';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { addService } from '../services/serviceAPIs';

function AddService({ navigation }) {
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const handleBackAction = () => {
    navigation.replace('Home');
  };
  const handleAddService = async () => {
    const result = await addService(serviceName, servicePrice);
    if (result.error) {
      alert(result.message);
    } else {
      alert('Service added successfully!');
      navigation.replace('Home');
    }
  };
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={handleBackAction} color="white" />
        <Appbar.Content title="Service" titleStyle={styles.title} />
      </Appbar.Header>
      <View>
        <View>
         <Text style={styles.textLabel}>Service name*</Text>
          <TextInput
            value={serviceName}
            onChangeText={setServiceName}
            style={styles.input}
            keyboardType="default"
          />
        </View>
        <View>
          <Text style={styles.textLabel}>Price*</Text>
          <TextInput
            value={servicePrice}
            onChangeText={setServicePrice}
            style={styles.input}
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddService}>
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default AddService;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appBar: {
    backgroundColor: '#f3417cff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#f1769fff',
    padding: 13,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fad7e3ff',
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#f3417cff',
    color: 'white',
    padding: 10,
    margin: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
