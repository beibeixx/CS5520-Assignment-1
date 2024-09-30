import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, TextInput, Alert, Image} from 'react-native';
import Background from '../components/Background';
import Card from '../components/Card';
import CardText from '../components/CardText';
import Input from '../components/Input';

export default function GameScreen({ userData, onRestart }) {
  const [gameState, setGameState] = useState('initial');
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timer, setTimer] = useState(60);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintText, setHintText] = useState('');
  const [guessResult, setGuessResult] = useState(null);
  const intervalRef = useRef(null);

  const lastDigit = parseInt(userData.phone.slice(-1));

  const generateTargetNumber = () => {
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
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100 || guessNum % lastDigit !== 0) {
      Alert.alert("Invalid Input", `Number has to be a multiply of ${lastDigit} between 1 and 100.`);
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
        const start = targetNumber >= 50 ? '50' : '1';
        const end = targetNumber >= 50 ? '100' : '49';
        setHintText(`The number is between ${start} and ${end}.`);
        setHintUsed(true);
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
    setHintText('');
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
            <CardText style={styles.cardText}>
              Guess a number between 1 & 100 that is multiply of {lastDigit} within 60 seconds and 4 attempts.
            </CardText>
            <Button title="Start" onPress={startGame} color="#0013FF" />
          </>
        );
      case 'playing':
        return (
          <>
            <CardText style={styles.cardText}>
              Guess a number between 1 & 100 that is multiply of {lastDigit} within 60 seconds and 4 attempts.
            </CardText>
            <Input
              style={styles.input}
              onChangeText={setGuess}
              value={guess}
            />
            {hintText !== '' && <Text style={styles.hintText}>{hintText}</Text>}
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
            <CardText style={styles.cardText}>You did not guess correct!
              You should guess {guessResult}.</CardText>
            <View style={styles.buttonContainer}>
              <Button title="Try Again" onPress={tryAgain} />
              <Button title="End the game" onPress={() => endGame('gaveUp')} />
            </View>
          </>
        );
      case 'won':
        return (
          <>
            <CardText style={styles.cardText}>You guessed correct!
              Attempts used: {4 - attempts}</CardText>
            <Image 
              source={{uri: `https://picsum.photos/id/${targetNumber}/100/100`}}
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


        <View style={styles.content}>
          <View style={styles.restartButton}>
            <Button title="Restart" onPress={onRestart} />
          </View>
          <Card style={styles.card}>
            {renderCard()}
          </Card>
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
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
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,    
  },
  card: {
    width: '80%',
    alignItems: 'center',
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  cardText: {
    fontSize: 20,
    color: '#33009F',
    textAlign: 'center',
    marginBottom: 20,
  },
  // input: {
  //   height: 40,
  //   width: '40%',
  // },
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
  hintText:{
    fontSize: 16,
  },
});
