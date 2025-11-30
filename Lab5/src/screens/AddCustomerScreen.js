import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { addCustomer } from '../services/serviceAPIs';

export default function AddCustomerScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAdd = async () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please fill all fields!');
      return;
    }

    const res = await addCustomer(name, phone);
    if (res.error) {
      alert('Add customer failed!');
      return;
    }

    alert('Customer added successfully!');
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content
          title="Add Customer"
          titleStyle={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}
        />
      </Appbar.Header>

      <View style={styles.form}>
        <TextInput
          label="Customer Name"
          mode="outlined"
          value={name}
          onChangeText={setName}
          style={styles.input}
          outlineColor="#ef7da3ff"
          activeOutlineColor='#f3417cff'
        />

        <TextInput
          label="Phone"
          mode="outlined"
          value={phone}
          onChangeText={setPhone}
          keyboardType="number-pad"
          style={styles.input}
          outlineColor="#ef7da3ff"
          activeOutlineColor='#f3417cff'
        />

        <Button
          mode="contained"
          onPress={handleAdd}
          style={styles.btn}
          buttonColor="#f3417cff"
        >
          Add Customer
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { backgroundColor: '#f3417cff' },

  form: {
    padding: 20,
    marginTop: 20,
  },

  input: {
    marginBottom: 20,
  },

  btn: {
    paddingVertical: 8,
    borderRadius: 8,
  },
});
