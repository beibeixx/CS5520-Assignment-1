import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorHelper } from '../helper/colorHelper';

export default function CardText({ children, style }) {
    return <Text style={[styles.cardText, style]}>{children}</Text>;

}

const styles = StyleSheet.create({
    cardText: {
        fontSize: 18,
        color: colorHelper.text.primary,
      },
  });