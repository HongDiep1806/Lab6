import React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { getAllServices, getAService } from '../services/serviceAPIs';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Item({ item, navigation }) {
  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  // item.price = formatPrice(item.price);
  const handleDetailService = async () => {
    navigation.replace('DetailService', { serviceId: item._id });
  };
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={handleDetailService}>
      <Text style={styles.textItemName}>{item.name}</Text>
      <Text style={styles.textPrice}>{formatPrice(item.price)}</Text>
    </TouchableOpacity>
  );
}
function HomeScreen({navigation}) {
  const [services, setServices] = useState([]);4
  const [user, setUser] = useState(null);
  const loadServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddService = () => {
    navigation.replace('AddService');
  };
  useEffect(() => {
    loadServices();
    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={user ? user.name : ''} titleStyle={styles.textUserName}></Appbar.Content>
        <Appbar.Action icon="account-circle" color="white" />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/logo.png')}
          />
          <Text style={styles.nameTitle}>KAMI SPA</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.textTitleService}>Danh sách dịch vụ</Text>
          <TouchableOpacity onPress={handleAddService}>
            <Text style={styles.plusButton}>+</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={services}
          renderItem={({ item }) => <Item item={item} navigation={navigation} />}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textUserName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  }
  ,
  contentContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 1,
  },

  titleContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    //borderWidth: 1,
    // borderColor: '#f3417cff',
    marginBottom: 10,
  },
  nameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#f3417cff',
  },
  textTitleService: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#f3417cff',
  },

  tinyLogo: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  plusButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f3417cff',
    borderWidth: 1,
    borderColor: '#f3417cff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  textPrice: {
    color: 'grey',
  },
  textItemName: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'black',
  },
});
