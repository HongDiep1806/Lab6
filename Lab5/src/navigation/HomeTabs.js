import React from 'react';
import { View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import CustomerScreen from '../screens/CustomerScreen';
import TransactionScreen from '../screens/TransactionScreen';
import SettingScreen from '../screens/SettingScreen';

export default function HomeTabs({ navigation }) {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'transaction', title: 'Transaction', icon: 'receipt' },
    { key: 'customer', title: 'Customer', icon: 'account-multiple' },
    { key: 'setting', title: 'Setting', icon: 'cog' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return (
          <View style={{ flex: 1 }}>
            <HomeScreen navigation={navigation} />
          </View>
        );
      case 'transaction':
        return (
          <View style={{ flex: 1 }}>
            <TransactionScreen navigation={navigation} />
          </View>
        );
      case 'customer':
        return (
          <View style={{ flex: 1 }}>
            <CustomerScreen navigation={navigation} />
          </View>
        );
        case 'setting':
        return (
          <View style={{ flex: 1 }}>
            <SettingScreen navigation={navigation} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#f3417cff' }}
      shifting={false}
      labeled={true}
      renderIcon={({ route, color }) => (
        <MaterialCommunityIcons name={route.icon} size={24} color={color} />
      )}
    />
  );
}
