import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, SafeAreaView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import ConfirmScreen from './ConfirmScreen'
import Card from '../components/Card';
import Background from '../components/Background';


export default function StartScreen({ onStartGame }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const validateName = (name) => {
    if (name.length <= 1 || name.match(/\d/)) {
      return 'Please enter a valid name';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(emailRegex)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const validatePhone = (phone) => {
    if (phone.length !== 10 || !phone.match(/^\d{10}$/) || ['0', '1'].includes(phone[9])) {
      return 'Please enter a valid phone number';
    }
    return '';
  };

  const handleNameChange = (text) => {
    setName(text);
    setErrors(prev => ({ ...prev, name: validateName(text) }));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setErrors(prev => ({ ...prev, email: validateEmail(text) }));
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
    setErrors(prev => ({ ...prev, phone: validatePhone(text) }));
  };



  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsChecked(false);
    setErrors({ name: '', email: '', phone: '' });
  };

  const handleRegister = () => {
    
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone)
    };
    setErrors(newErrors);

    if (!name || !email || !phone || !isChecked || newErrors.name || newErrors.email || newErrors.phone) {
      Alert.alert('Invalid Input', 'Please fill all fields correctly and accept the terms.');
    } else {
      setIsConfirmVisible(true);
    }
  };

  const handleConfirmGoBack = () => {
    setIsConfirmVisible(false);
  };

  const handleConfirmContinue = () => {
    setIsConfirmVisible(false);
    onStartGame({ name, email, phone });
  };

  return (

    <Background>
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.card}>
        <Text style={styles.hint}>Name</Text>
        <TextInput 
          style={styles.input}
          value={name}         
          onChangeText={handleNameChange}
        />
        <Text style={styles.errorText}>{errors.name}</Text>

        <Text style={styles.hint}>Email address</Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
        />
        <Text style={styles.errorText}>{errors.email}</Text>

        <Text style={styles.hint}>Phone Number</Text>
        <TextInput 
          style={styles.input}
          value={phone}
          onChangeText={handlePhoneChange}
        />
        <Text style={styles.errorText}>{errors.phone}</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
          />
          <Text style={styles.label}>I am not a robot</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Reset" color="#B10050" onPress={handleReset} />
          <Button
            title="Register"
            color="#0013FF"
            onPress={handleRegister}
            disabled={!isChecked}
          />
        </View>
      </View>
    </SafeAreaView>
    <ConfirmScreen
      visible={isConfirmVisible}
      userData={{ name, email, phone }}
      onGoBack={handleConfirmGoBack}
      onContinue={handleConfirmContinue} 
    />
    </Background>  
);
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientColors: ['#77c8f0', '#7482bc'],
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
    color: "#2E06A3",
  },
  card: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#959295',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hint: {
    color: '#33009F',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#33009F',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#33009F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#3A3A37',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    margin: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});