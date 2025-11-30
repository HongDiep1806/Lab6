import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './src/screens/LoginScreen';
import HomeTabs from './src/navigation/HomeTabs';
import AddService from './src/screens/AddService';
import DetailServiceScreen from './src/screens/DetailServiceScreen';
import UpdateService from './src/screens/UpdateService';
import CustomerScreen from './src/screens/CustomerScreen';
import AddCustomerScreen from './src/screens/AddCustomerScreen';
import TransactionScreen from './src/screens/TransactionScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';
import SettingScreen from './src/screens/SettingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider
      // settings={{
      //   icon: props => <MaterialCommunityIcons {...props} />,
      // }}
    >
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen name="AddService" component={AddService} />
            <Stack.Screen name="DetailService" component={DetailServiceScreen} />
            <Stack.Screen name="UpdateService" component={UpdateService} />
            <Stack.Screen name="Customer" component={CustomerScreen} />
            <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
            <Stack.Screen name="Transaction" component={TransactionScreen} />
            <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
