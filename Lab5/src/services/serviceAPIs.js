import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'https://kami-backend-5rs0.onrender.com';
export async function getAllServices() {
  try {
    const res = await fetch(`${BASE_URL}/services`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
export async function login(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: username,
        password: password,
      }),
    });
    if (!res.ok) {
      return {
        error: true,
        message: 'Invalid username or password! Please try again.',
      };
    }
    const user = await res.json();
    await AsyncStorage.setItem('token', user.token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return { error: false, data: user };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message };
  }
}
export async function addService(serviceName, servicePrice) {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('TOKEN SEND:', token);

    const res = await fetch(`https://kami-backend-5rs0.onrender.com/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: serviceName,
        price: Number(servicePrice),
      }),
    });

    console.log('STATUS:', res.status);

    const data = await res.json();
    console.log('DATA:', data);

    if (!res.ok) {
      return { error: true, message: data.message || 'Error' };
    }

    return { error: false, data };
  } catch (error) {
    console.log(error);
    return { error: true, message: error.message };
  }
}
export async function getAService(serviceId) {
  try {
    const res = await fetch(`${BASE_URL}/services/${serviceId}`);
    const data = await res.json();
    return { error: false, data: data };
  } catch (error) {
    console.log(error);
    return { error: true, message: error.message };
  }
}
export async function updateService(serviceId, name, price) {
  try {
    const token = await AsyncStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/services/${serviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        price: Number(price),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: true, message: data.message || "Update failed" };
    }

    return { error: false, data };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

export async function deleteService(serviceId) {
  try {
    const token = await AsyncStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/services/${serviceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: true, message: data.message };
    }

    return { error: false };
  } catch (error) {
    return { error: true, message: error.message };
  }
}
export async function getAllCustomers() {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/customers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function addCustomer(name, phone) {
  try {
    const token = await AsyncStorage.getItem('token');

    const res = await fetch(`${BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, phone }),
    });

    const data = await res.json();
    if (!res.ok) return { error: true, message: data.message };

    return { error: false, data };
  } catch (err) {
    return { error: true, message: err.message };
  }
}


export async function getAllTransactions() {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getTransactionById(id) {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

