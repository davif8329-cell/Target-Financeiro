import { View, Text, Pressable, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/theme/colors'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Target</Text>

      <Pressable
        style={styles.button}
        onPress={() => router.navigate('/target')}
      >
        <Text style={styles.buttonText}>Nova Meta</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.navigate('/progress')}
      >
        <Text style={styles.buttonText}>Ver Progresso</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
})