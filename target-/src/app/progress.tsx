import { View, Text, Pressable, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/theme/colors'

export default function Progress() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progresso</Text>

      <Text>R$ 500 / R$ 1000</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.navigate('/transaction/1')}
      >
        <Text style={styles.buttonText}>Nova Transação</Text>
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