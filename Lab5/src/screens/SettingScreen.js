import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingScreen({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    navigation.replace("Login"); 
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Setting" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <View style={styles.body}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutBtn}
          contentStyle={{ paddingVertical: 6 }}
          buttonColor="#f3417cff"
          labelStyle={{ color: "white", fontSize: 16 }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  header: { backgroundColor: "#f3417cff" },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },

  body: {
    flex: 1,
    padding: 20,
  },

  logoutBtn: {
    borderRadius: 10,
    marginTop: 15,
  },
});
