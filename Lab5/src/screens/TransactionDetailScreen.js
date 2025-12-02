import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card, Divider } from 'react-native-paper';
import { getTransactionById } from '../services/serviceAPIs';

export default function TransactionDetailScreen({ route, navigation }) {
  const { transactionId } = route.params;
  const [transaction, setTransaction] = useState(null);

  const loadDetail = async () => {
    const data = await getTransactionById(transactionId);
    setTransaction(data);
  };

  useEffect(() => {
    loadDetail();
  }, []);

  const formatMoney = money =>
    Number(money || 0).toLocaleString('vi-VN') + ' đ';

  const formatDateTime = dateStr => {
    const d = new Date(dateStr);
    return (
      d.toLocaleDateString('vi-VN') +
      ' ' +
      d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    );
  };

  if (!transaction) return null;

  // const totalServicePrice =
  //   transaction.price;

  // const discount =
  //   (transaction.priceBeforePromotion) -
  //   (transaction.price );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Transaction detail" color="white" titleStyle={{ color: 'white', fontSize: 22, fontWeight: 'bold' }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.body}>
        <Card style={styles.card}>
          <Card.Title
            title="General information"
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Transaction code</Text>
              <Text style={styles.value}>{transaction.id}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.label}>Customer</Text>
              <Text style={styles.value}>
                {transaction.customer?.name || 'Unknown'} -{' '}
                {transaction.customer?.phone || 'Unknown'}
              </Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.label}>Creation time</Text>
              <Text style={styles.value}>
                {formatDateTime(transaction.createdAt)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Services list" titleStyle={styles.cardTitle} />
          <Card.Content>
            {transaction.services?.map(sv => (
              <View key={sv._id} style={{ marginBottom: 10 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.svName}>• {sv.name}</Text>
                  <Text style={styles.svQty}>x{sv.quantity || 1}</Text>
                  <Text style={styles.svPrice}>{formatMoney(sv.price)}</Text>
                </View>

                {sv.description && (
                  <Text style={styles.svDescription}>{sv.description}</Text>
                )}

                <Divider style={{ marginVertical: 6 }} />
              </View>
            ))}

            <View style={styles.rowBetween}>
              <Text style={styles.label}>Total</Text>
              <Text style={styles.bold}>{formatMoney(transaction.price)}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Cost" titleStyle={styles.cardTitle} />
          <Card.Content>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Amount of money</Text>
              <Text>{formatMoney(transaction.priceBeforePromotion)}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.label}>Discount</Text>
              <Text style={{ color: 'red' }}>{formatMoney(transaction.priceBeforePromotion - transaction.price)}</Text>
            </View>

            <Divider style={{ marginVertical: 10 }} />

            <View style={styles.rowBetween}>
              <Text style={styles.totalLabel}>Total payment</Text>
              <Text style={styles.totalPay}>
                {formatMoney(transaction.price)}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#f3417cff' },
  body: { padding: 16 },

  card: {
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f3417cff',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  value: { fontSize: 14 },

  svName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  svQty: {
    color: '#444',
    width: 30,
    textAlign: 'right',
  },
  svPrice: {
    color: '#444',
    textAlign: 'right',
    width: 90,
  },

  svDescription: {
    marginLeft: 18,
    color: '#777',
    fontSize: 13,
  },

  bold: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalPay: {
    color: '#f3417cff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
