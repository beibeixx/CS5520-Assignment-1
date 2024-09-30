import { StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colorHelper } from "../helper/colorHelper";

export default function Background({ children, isTransparent = false }) {
  const colors = isTransparent
    ? [
        colorHelper.backgroundTransparent.start,
        colorHelper.backgroundTransparent.end,
      ]
    : [colorHelper.background.start, colorHelper.background.end];

  return (
    <LinearGradient colors={colors} style={styles.gradient}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
