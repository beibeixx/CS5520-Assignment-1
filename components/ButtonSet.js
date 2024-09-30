import { StyleSheet, View } from "react-native";
import React from "react";

export default function ButtonRow({ children }) {
  return <View style={styles.buttonsRow}>{children}</View>;
}

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
