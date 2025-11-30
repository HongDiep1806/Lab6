import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Appbar, Card } from "react-native-paper";
import { getAllTransactions } from "../services/serviceAPIs";

export default function TransactionScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    const data = await getAllTransactions();
    if (data) setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, [navigation]);

  const formatMoney = (money) =>
    Number(money || 0).toLocaleString("vi-VN") + " đ";

  const formatDateTime = (dateStr) => {
    const d = new Date(dateStr);
    return (
      d.toLocaleDateString("vi-VN") +
      " " +
      d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getStatusColor = (status) => {
    if (!status) return {};
    switch (status.toLowerCase()) {
      case "cancelled":
        return { color: "red" };
      case "active":
        return { color: "#ff9800" }; 
      case "available":
        return { color: "green" };
      default:
        return { color: "#555" };
    }
  };

  const renderItem = ({ item }) => (
<Card
  style={styles.card}
  onPress={() =>
    navigation.navigate("TransactionDetail", {
      transactionId: item._id,
    })
  }
>
      <Card.Content style={styles.cardContent}>
        <View style={{ flex: 1 }}>
          <View >
            <Text style={styles.transId}>
              {item.id || "HD" + item._id.slice(-8)} -{" "}
              {formatDateTime(item.createdAt)}
            </Text>

            <Text style={[styles.status, getStatusColor(item.status)]}>
              {item.status}
            </Text>
          </View>

          {item.services?.map((sv) => (
            <Text key={sv._id} style={styles.serviceLine}>
              - {sv.name}
            </Text>
          ))}

          <Text style={styles.customerLine}>
            Customer: {item.customer?.name ?? "Unknown"}
          </Text>
        </View>

        <Text style={styles.totalPrice}>
          {formatMoney(item.priceAfterPromotion ?? item.priceBeforePromotion)}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Transaction" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: { backgroundColor: "#f3417cff" },
  headerTitle: { color: "white", fontWeight: "bold", fontSize: 22 },

  card: {
    marginBottom: 15,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  transId: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#222",
  },

  status: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 13,
    textTransform: "capitalize",
  },

  serviceLine: {
    fontSize: 13,
    color: "#555",
    marginTop: 3,
  },

  customerLine: {
    marginTop: 6,
    color: "#777",
    fontStyle: "italic",
  },

  totalPrice: {
    color: "#f3417cff",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
    marginLeft: 10,
  },
});
