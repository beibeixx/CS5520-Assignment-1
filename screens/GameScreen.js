import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, TextInput, Alert, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Background from '../components/Background';

export default function GameScreen({ userData, onRestart }) {
  const [gameState, setGameState] = useState('initial');
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timer, setTimer] = useState(60);
  const [hintUsed, setHintUsed] = useState(false);
  const [guessResult, setGuessResult] = useState(null);
  const intervalRef = useRef(null);

  const generateTargetNumber = () => {
    const lastDigit = parseInt(userData.phone.slice(-1));
    const possibleNumbers = [];
    for (let i = lastDigit; i <= 100; i += lastDigit) {
      possibleNumbers.push(i);
    }
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    console.log(possibleNumbers[randomIndex]);
    return possibleNumbers[randomIndex];
  };


  const startGame = () => {
    setTargetNumber(generateTargetNumber());
    setGameState('playing');
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(intervalRef.current);
          Alert.alert("Time's up!", "You ran out of time.");
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleSubmitGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      Alert.alert("Invalid Input", "Please enter a number between 1 and 100.");
      return;
    }


    setAttempts(prev => prev - 1);

    if (guessNum === targetNumber) {
      clearInterval(intervalRef.current);
      setGameState('won');
    } else if (attempts === 1) {
      endGame('attempts');
    } else {
      setGuessResult(guessNum > targetNumber ? "lower" : "higher");
      setGameState('guessing');
    }

    setGuess('');
  };

  const useHint = () => {
    if (!hintUsed) {
      Alert.alert("Hint", `The number is ${targetNumber % 2 === 0 ? "even" : "odd"}.`);
      setHintUsed(true);
    } else {
      Alert.alert("Hint Already Used", "You've already used your hint!");
    }
  };

  const tryAgain = () => {
    setGameState('playing');
  };

  const endGame = (reason) => {
    clearInterval(intervalRef.current);
    setGameState('over');
    setGuessResult(reason);
  };

  const newGame = () => {
    setTargetNumber(generateTargetNumber());
    setAttempts(4);
    setTimer(60);
    setHintUsed(false);
    setGuessResult(null);
    setGameState('playing');
    startGame();
  };

  useEffect(() => {
    if (timer === 0) {
      endGame('timer');
    }
  }, [timer]);


  const renderCard = () => {
    switch (gameState) {
      case 'initial':
        return (
          <>
            <Text style={styles.cardText}>
              Guess a number between 1 & 100 that is multiply of {userData.phone[9]} within 60 seconds and 4 attempts.
            </Text>
            <Button title="Start" onPress={startGame} color="#0013FF" />
          </>
        );
      case 'playing':
        return (
          <>
            <Text style={styles.cardText}>
              Guess a number between 1 & 100 that is multiply of {userData.phone[9]} within 60 seconds and 4 attempts.
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setGuess}
              value={guess}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Attempts left: {attempts}</Text>
              <Text style={styles.infoText}>Timer: {timer}s</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Use a Hint" color="#0013FF" onPress={useHint} disabled={hintUsed} />
              <Button title="Submit guess" color="#0013FF" onPress={handleSubmitGuess} />
            </View>
          </>
        );
      case 'guessing':
        return (
          <>
            <Text style={styles.cardText}>You did not guess correct!
              You should guess lower.</Text>
            <View style={styles.buttonContainer}>
              <Button title="Try Again" onPress={tryAgain} />
              <Button title="End the game" onPress={() => endGame('gaveUp')} />
            </View>
          </>
        );
      case 'won':
        return (
          <>
            <Text style={styles.cardText}>You guessed correct!
              Attempts used: {4 - attempts}</Text>
            <Image 
              source={{uri: "https://picsum.photos/id/${targetNumber}/100/100"}}
              style={styles.image}
            />
            <Button title="New Game" onPress={newGame} />
          </>
        );
      case 'over':
        return (
          <>
            <Text style={styles.cardText}>The game is over</Text>
            <Image source={require('../assets/sad-smiley.png')} style={styles.image} />
            <Text style={styles.cardText}>
              {guessResult === 'timer' ? "You are out of time" : guessResult === 'attempts' ? "you are out of attempts" : "You end the game"}
            </Text>
            <Button title="New Game" onPress={newGame} />
          </>
        );
    }
  };


  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.restartButton}>
          <Button title="Restart" onPress={onRestart} />
        </View>
        <View style={styles.content}>
          <View style={styles.card}>
            {renderCard()}
          </View>
        </View>
      </SafeAreaView>
    </Background>
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
  cardText: {
    fontSize: 20,
    color: '#33009F',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomColor: '#33009F',
    height: 40,
    width: '25%',
    borderBottomWidth: 2,
    marginBottom: 40,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#3A3A37',
    marginVertical: 4,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

