import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'
import { colorHelper } from '../helper/colorHelper';

export default function Input({ label, value, onChangeText, error }) {
    return (
         <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
          />
      );
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colorHelper.text.primary,
        padding: 10,
        marginBottom: 10,
        color: colorHelper.text.primary,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
    },
})