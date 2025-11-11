import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const Assignments = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Assignments</Text>
    </SafeAreaView>
  )
}

export default Assignments

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})