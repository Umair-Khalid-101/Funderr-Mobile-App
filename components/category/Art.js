import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Art() {
  return (
    <View style={styles.container}>
      <Text>Art</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})