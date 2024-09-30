import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import Checkbox from "expo-checkbox";
import ConfirmScreen from "./ConfirmScreen";
import Card from "../components/Card";
import Background from "../components/Background";
import { colorHelper } from "../helper/colorHelper";
import CardText from "../components/CardText";
import Input from "../components/Input";
import ButtonRow from "../components/ButtonSet";

export default function StartScreen({ onStartGame }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const validateName = (name) => {
    if (name.length <= 1 || name.match(/\d/)) {
      return "Please enter a valid name";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(emailRegex)) {
      return "Please enter a valid email";
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (
      phone.length !== 10 ||
      !phone.match(/^\d{10}$/) ||
      ["0", "1"].includes(phone[9])
    ) {
      return "Please enter a valid phone number";
    }
    return "";
  };

  const handleNameChange = (text) => {
    setName(text);
    setErrors((prev) => ({ ...prev, name: validateName(text) }));
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setErrors((prev) => ({ ...prev, email: validateEmail(text) }));
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
    setErrors((prev) => ({ ...prev, phone: validatePhone(text) }));
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setIsChecked(false);
    setErrors({ name: "", email: "", phone: "" });
  };

  const handleRegister = () => {
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
    };
    setErrors(newErrors);

    if (
      !name ||
      !email ||
      !phone ||
      !isChecked ||
      newErrors.name ||
      newErrors.email ||
      newErrors.phone
    ) {
      Alert.alert(
        "Invalid Input",
        "Please fill all fields correctly and accept the terms."
      );
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
        <Card style={styles.card}>
          <CardText>Name</CardText>
          <Input
            style={styles.input}
            value={name}
            onChangeText={handleNameChange}
          />
          <Text style={styles.errorText}>{errors.name}</Text>

          <CardText>Email address</CardText>
          <Input
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
          />
          <Text style={styles.errorText}>{errors.email}</Text>

          <CardText>Phone Number</CardText>
          <Input
            style={styles.input}
            value={phone}
            onChangeText={handlePhoneChange}
          />
          <Text style={styles.errorText}>{errors.phone}</Text>

          <View style={styles.checkboxContainer}>
            <Checkbox value={isChecked} onValueChange={setIsChecked} />
            <Text style={styles.label}>I am not a robot</Text>
          </View>

          <ButtonRow>
            <View style={styles.buttonContainer}>
              <Button
                title="Reset"
                color={colorHelper.secondary}
                onPress={handleReset}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Register"
                color={colorHelper.primary}
                onPress={handleRegister}
                disabled={!isChecked}
              />
            </View>
          </ButtonRow>
        </Card>
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
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: colorHelper.title,
  },
  card: {
    width: "80%",
  },
  errorText: {
    color: colorHelper.text.secondary,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    margin: 8,
  },
  buttonContainer: {
    width: "40%",
    margin: 5,
  },
});
