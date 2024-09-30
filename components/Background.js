import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';


export default function Background({ children, isTransparent = false }) {
    const colors = isTransparent ? ['rgba(119,200,240,0.8)', 'rgba(116,130,188,0.8)'] : ['#77c8f0', '#7482bc'] ;

    return (
        <LinearGradient
          colors={colors}
          style={styles.gradient}
        >
          {children}
        </LinearGradient>
      );
}

const styles = StyleSheet.create({
    gradient: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });