import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Card({ children, style }) {
    return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#959295',
      borderRadius: 10,
      padding: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });