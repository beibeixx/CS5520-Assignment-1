import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, SafeAreaView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';


export default function StartScreen({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });

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

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsChecked(false);
    setErrors({ name: '', email: '', phone: '' });
    setTouched({ name: false, email: false, phone: false });
  };

  const handleRegister = () => {
    const newTouched = { name: true, email: true, phone: true };
    setTouched(newTouched);
    
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone)
    };
    setErrors(newErrors);

    if (!name || !email || !phone || !isChecked || newErrors.name || newErrors.email || newErrors.phone) {
      Alert.alert('Invalid Input', 'Please fill all fields correctly and accept the terms.');
    } else {
      onRegister({ name, email, phone });
    }
  };

  return (

    <LinearGradient
      colors={styles.gradientColors}
      style={styles.gradient}
    > 
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.card}>
        <Text style={styles.hint}>Name</Text>
        <TextInput 
          style={styles.input}
          value={name}         
          onChangeText={handleNameChange}
          onBlur={() => handleBlur('name')}
        />
        <Text style={styles.errorText}>{errors.name}</Text>

        <Text style={styles.hint}>Email address</Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          onBlur={() => handleBlur('email')}
        />
        <Text style={styles.errorText}>{errors.email}</Text>

        <Text style={styles.hint}>Phone Number</Text>
        <TextInput 
          style={styles.input}
          value={phone}
          onChangeText={handlePhoneChange}
          onBlur={() => handleBlur('phone')}
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
          <Button title="Reset" color="red" onPress={handleReset} />
          <Button
            title="Register"
            onPress={handleRegister}
            disabled={!isChecked}
          />
        </View>
      </View>
    </SafeAreaView>
    </LinearGradient>
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
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
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