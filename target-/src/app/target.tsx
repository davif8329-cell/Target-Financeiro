import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { colors } from '@/theme/colors'

export default function Target() {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Meta</Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Valor"
        style={styles.input}
        keyboardType="numeric"
        value={goal}
        onChangeText={setGoal}
      />

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.secondary]}
        onPress={() => router.back()}
      >
        <Text style={{ color: colors.primary }}>Voltar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  secondary: {
    backgroundColor: '#EEF0FF',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
})