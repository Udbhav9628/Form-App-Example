import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');

  const saveData = async () => {
    if (!name || !email || !gender || !country) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const formData = { name, email, gender, country };
    try {
      await AsyncStorage.setItem('formData', JSON.stringify(formData));
      Alert.alert('Success', 'Data saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Gender:</Text>
      <Picker
        selectedValue={gender}
        style={styles.input}
        onValueChange={itemValue => setGender(itemValue)}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <Text style={styles.label}>Country:</Text>
      <Picker
        selectedValue={country}
        style={styles.input}
        onValueChange={itemValue => setCountry(itemValue)}>
        <Picker.Item label="Select Country" value="" />
        <Picker.Item label="United States" value="US" />
        <Picker.Item label="India" value="IN" />
        <Picker.Item label="Canada" value="CA" />
      </Picker>

      <Button title="Save Data" onPress={saveData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default App;
