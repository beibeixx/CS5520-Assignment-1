import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GameScreen({ userData, onRestart }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [targetNumber, setTargetNumber] = useState(null);

  const generateTargetNumber = () => {
    const lastDigit = parseInt(userData.phone.slice(-1));
    const possibleNumbers = [];
    for (let i = lastDigit; i <= 100; i += lastDigit) {
      possibleNumbers.push(i);
    }
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    return possibleNumbers[randomIndex];
  };


  const startGame = () => {
    setTargetNumber(generateTargetNumber());
    setGameStarted(true);
  };

  return (
    <LinearGradient
      colors={['#77c8f0', '#7482bc']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.restartButton}>
            <Button title="Restart" onPress={onRestart} />
          </View>
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                Guess a number between 1 & 100 that is multiply of {userData.phone[9]} within 60 seconds and 4 attempts.
              </Text>
              <Button title="Start" onPress={startGame} color="#0013FF" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  restartButton: {
    paddingBottom: 30,
  },
  card: {
    width: '80%',
    backgroundColor: '#959295',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#33009F',
    textAlign: 'center',
    marginBottom: 20,
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#33009F',
  },
});

