import { StyleSheet } from "react-native";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import React, { useState } from "react";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [userData, setUserData] = useState(null);

  const handleStartGame = (data) => {
    setUserData(data);
    setCurrentScreen("game");
  };

  const handleRestart = () => {
    setUserData(null);
    setCurrentScreen("start");
  };

  return (
    <>
      {currentScreen === "start" && (
        <StartScreen onStartGame={handleStartGame} />
      )}
      {currentScreen === "game" && (
        <GameScreen userData={userData} onRestart={handleRestart} />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
