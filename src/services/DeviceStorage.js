import AsyncStorage from '@react-native-community/async-storage';

// caution, all DeviceStorage methods are asynchronous 
// and should be used as such, awaiting return values
// with async/await pairs when called

const DeviceStorage = {
  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
      return false;
    }
  },

  async delete(key) {
    try{
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
      return false;
    }
  },

  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
      return null;
    }
  },
};

export default DeviceStorage;