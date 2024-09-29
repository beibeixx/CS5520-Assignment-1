// import React, { useState } from 'react';
// import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function GameScreen({ userData, onRestart }) {
//   const [gameStarted, setGameStarted] = useState(false);
//   const [targetNumber, setTargetNumber] = useState(null);

//   const generateTargetNumber = () => {
//     const lastDigit = parseInt(userData.phone.slice(-1));
//     const possibleNumbers = [];
//     for (let i = lastDigit; i <= 100; i += lastDigit) {
//       possibleNumbers.push(i);
//     }
//     const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
//     return possibleNumbers[randomIndex];
//   };


//   const startGame = () => {
//     setTargetNumber(generateTargetNumber());
//     setGameStarted(true);
//   };

//   return (
//     <LinearGradient
//       colors={['#77c8f0', '#7482bc']}
//       style={styles.gradient}
//     >
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Number Guessing Game</Text>
//           <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
//             <Text style={styles.restartButtonText}>Restart</Text>
//           </TouchableOpacity>
//         </View>
//         {!gameStarted ? (
//           <View style={styles.card}>
//             <Text style={styles.cardText}>
//               You have 60 seconds and 4 attempts to guess a number that is a multiple of the last digit of your phone number between 1 and 100.
//             </Text>
//             <TouchableOpacity onPress={startGame} style={styles.startButton}>
//               <Text style={styles.startButtonText}>Start</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.gameContainer}>
//             <Text style={styles.infoText}>Game Started!</Text>
//           </View>
//         )}
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#2E06A3',
//   },
//   restartButton: {
//     padding: 10,
//     backgroundColor: '#B10050',
//     borderRadius: 5,
//   },
//   restartButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   card: {
//     backgroundColor: '#959295',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   cardText: {
//     fontSize: 16,
//     color: '#33009F',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   startButton: {
//     backgroundColor: '#0013FF',
//     padding: 10,
//     borderRadius: 5,
//   },
//   startButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   gameContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   infoText: {
//     fontSize: 18,
//     color: '#33009F',
//   },
// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GameScreen() {
  return (
    <View>
      <Text>GameScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})