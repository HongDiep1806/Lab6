import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { getAService, updateService } from '../services/serviceAPIs';

function UpdateService({ navigation, route }) {
  const { serviceId } = route.params;
  
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const loadService = async () => {
    const response = await getAService(serviceId);
    if (!response.error) {
      setServiceName(response.data.name);
      setServicePrice(String(response.data.price));
    }
  };

  useEffect(() => {
    loadService();
  }, []);

  const handleUpdate = async () => {
    const result = await updateService(serviceId, serviceName, servicePrice);
    if (result.error) {
      alert(result.message);
    } else {
      alert("Service updated successfully!");
      navigation.replace("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigation.replace("Home")} color="white" />
        <Appbar.Content title="Update Service" titleStyle={styles.title} />
      </Appbar.Header>

      <View>
        <Text style={styles.textLabel}>Service name*</Text>
        <TextInput
          value={serviceName}
          onChangeText={setServiceName}
          style={styles.input}
        />

        <Text style={styles.textLabel}>Price*</Text>
        <TextInput
          value={servicePrice}
          onChangeText={setServicePrice}
          style={styles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.textButton}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UpdateService;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  appBar: { backgroundColor: "#f3417cff" },
  title: { fontSize: 24, fontWeight: "bold", color: "white" },
  input: {
    padding: 13,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#fad7e3ff",
  },
  textLabel: { fontSize: 16, fontWeight: "bold", marginLeft: 10, marginTop: 10 },
  button: {
    borderRadius: 10,
    backgroundColor: "#f3417cff",
    padding: 10,
    margin: 10,
  },
  textButton: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
