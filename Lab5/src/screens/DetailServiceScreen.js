import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { getAService } from '../services/serviceAPIs';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { deleteService } from '../services/serviceAPIs';

function DetailServiceScreen({ navigation, route }) {
  const { serviceId } = route.params;
  const [service, setService] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const fetchServiceDetails = async () => {
    const response = await getAService(serviceId);
    if (!response.error) {
      setService(response.data);
    } else {
      console.log('Error:', response.message);
    }
  };

  const handleBackAction = () => {
    navigation.replace('Home');
  };

  const handleDateTimeFormat = dateString => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };
   const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleDelete = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to remove this service? This operation cannot be returned",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const result = await deleteService(serviceId);
            if (result.error) {
              alert(result.message);
            } else {
              alert("Service deleted successfully!");
              navigation.replace("Home");
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  if (!service) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={handleBackAction} color="white" />
        <Appbar.Content title="Service Detail" titleStyle={styles.title} />

        <View style={{ position: "absolute", top: 0, right: 0 }}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                color="white"
                onPress={openMenu}
              />
            }
            contentStyle={{ borderRadius: 10 }}
          >
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigation.navigate('UpdateService', { serviceId });
              }}
              title="Update"
            />

            <Menu.Item
              onPress={() => {
                closeMenu();
                handleDelete();
              }}
              title="Delete"
              titleStyle={{ color: 'red' }}
            />
          </Menu>
        </View>
      </Appbar.Header>

      <View style={styles.content}>
        <Text style={{ fontWeight: 'bold' }}>Service name:</Text>
        <Text>{service.name}</Text>

        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Price:</Text>
        <Text>{formatPrice(service.price)}</Text>

        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Creator:</Text>
        <Text>{service.user.name}</Text>

        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Time:</Text>
        <Text>{handleDateTimeFormat(service.createdAt)}</Text>

        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Final update:</Text>
        <Text>{handleDateTimeFormat(service.updatedAt)}</Text>
      </View>
    </View>
  );
}

export default DetailServiceScreen;

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
  content: {
    margin: 10,
  },
});
