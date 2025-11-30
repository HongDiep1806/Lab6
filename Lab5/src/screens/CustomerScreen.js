import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Appbar, Card, Badge } from 'react-native-paper';
import { getAllCustomers } from '../services/serviceAPIs';
import { useFocusEffect } from "@react-navigation/native";


export default function CustomerScreen({ navigation }) {
  const [customers, setCustomers] = useState([]);

  const loadCustomers = async () => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (err) {
      console.log('Error loading customers:', err);
    }
  };

  // useEffect(() => {
  //   loadCustomers();
  // }, []);
  useFocusEffect(
  React.useCallback(() => {
    loadCustomers();
  }, [])
);

  
  

  const formatMoney = money => {
    return Number(money || 0).toLocaleString('vi-VN') + ' đ';
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.phone}>Phone: {item.phone}</Text>
          <Text style={styles.money}>
            Total Money: {formatMoney(item.totalSpent)}
          </Text>
        </View>

        <View style={[styles.badge]}>
          <Text style={styles.loyalty}>{item.loyalty}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content
          title="Customer"
          titleStyle={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}
        />
      </Appbar.Header>

      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={{ padding: 15 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddCustomer')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  header: {
    backgroundColor: '#f3417cff',
  },

  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    color: '#777',
    marginTop: 3,
  },
  money: {
    marginTop: 5,
    color: '#f3417cff',
    fontWeight: 'bold',
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 13,
    borderRadius: 20,
    backgroundColor: '#f3417cff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loyalty: {
    color: 'white',
    fontWeight: 'bold',
  },
  member: {
    backgroundColor: '#ff9800',
  },
  guest: {
    backgroundColor: '#9e9e9e',
  },

  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#f3417cff',
    width: 55,
    height: 55,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
