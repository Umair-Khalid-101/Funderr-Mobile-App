import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Illustration() {
  return (
    <View style={styles.container}>
      <Text>Illustration</Text>
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