import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';

// ================= THEME =================
const colors = {
  primary: '#3D44CD',
  secondary: '#7E85FF',
  dark: '#1E1F5A',
  white: '#FFF',
  gray: '#888',
  light: '#F5F6FA',
  green: '#22C55E',
  red: '#EF4444',
};

// ================= COMPONENTS =================
function Button({ title, onPress, variant = 'primary' }) {
  return (
    <Pressable
      style={[
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'secondary' && { color: colors.primary },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

function Progress({ value }) {
  const safe = Math.max(0, Math.min(value, 100));
  return (
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${safe}%` }]} />
    </View>
  );
}

// ================= APP =================
export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedId, setSelectedId] = useState(null);

  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('input');

  const [targets, setTargets] = useState([
    { id: '1', name: 'Apple Watch', current: 580, goal: 1790 },
  ]);

  const [transactions, setTransactions] = useState({
    '1': [
      { id: 't1', type: 'input', value: 300 },
      { id: 't2', type: 'output', value: 20 },
    ],
  });

  const total = targets.reduce((acc, t) => acc + t.current, 0);

  const totalInput = Object.values(transactions)
    .flat()
    .filter((t) => t.type === 'input')
    .reduce((acc, t) => acc + t.value, 0);

  const totalOutput = Object.values(transactions)
    .flat()
    .filter((t) => t.type === 'output')
    .reduce((acc, t) => acc + t.value, 0);

  // ================= HOME =================
  if (screen === 'home') {
    return (
      <View style={{ flex: 1, backgroundColor: colors.light }}>
        <View style={styles.header}>
          <Text style={styles.headerLabel}>Total que você possui</Text>
          <Text style={styles.headerValue}>R$ {total.toFixed(2)}</Text>

          <View style={styles.summaryRow}>
            <Text style={{ color: colors.green }}>
              ↑ R$ {totalInput}
            </Text>
            <Text style={{ color: colors.red }}>
              ↓ R$ {totalOutput}
            </Text>
          </View>
        </View>

        <FlatList
          data={targets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => {
            const percent = (item.current / item.goal) * 100;

            return (
              <Pressable
                style={styles.card}
                onPress={() => {
                  setSelectedId(item.id);
                  setName(item.name);
                  setGoal(String(item.goal));
                  setScreen('progress');
                }}
              >
                <Text style={styles.cardTitle}>{item.name}</Text>

                <Text style={styles.cardValue}>
                  R$ {item.current} / R$ {item.goal}
                </Text>

                <Progress value={percent} />

                <Text style={styles.percent}>
                  {Math.floor(percent)}%
                </Text>
              </Pressable>
            );
          }}
        />

        <View style={{ padding: 20 }}>
          <Button title="+ Nova Meta" onPress={() => setScreen('new')} />
        </View>
      </View>
    );
  }

  // ================= NOVA META =================
  if (screen === 'new') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nova Meta</Text>

        <TextInput
          placeholder="Nome da meta"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Valor alvo"
          style={styles.input}
          keyboardType="numeric"
          value={goal}
          onChangeText={setGoal}
        />

        <Button
          title="Salvar"
          onPress={() => {
            if (!name || !goal) return;

            setTargets([
              ...targets,
              {
                id: Date.now().toString(),
                name,
                goal: Number(goal),
                current: 0,
              },
            ]);

            setName('');
            setGoal('');
            setScreen('home');
          }}
        />

        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => setScreen('home')}
        />
      </View>
    );
  }

  // ================= PROGRESSO =================
  if (screen === 'progress') {
    const target = targets.find((t) => t.id === selectedId);
    const list = transactions[selectedId] || [];

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{target.name}</Text>

        <Text style={styles.cardValue}>
          R$ {target.current} / R$ {target.goal}
        </Text>

        <Progress value={(target.current / target.goal) * 100} />

        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text
                style={{
                  color:
                    item.type === 'input'
                      ? colors.green
                      : colors.red,
                }}
              >
                {item.type === 'input' ? '+ ' : '- '}R$ {item.value}
              </Text>
            </View>
          )}
        />

        <Button
          title="+ Nova Transação"
          onPress={() => setScreen('transaction')}
        />

        <Button
          title="Editar Meta"
          onPress={() => setScreen('edit')}
        />

        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => setScreen('home')}
        />
      </View>
    );
  }

  // ================= EDITAR META =================
  if (screen === 'edit') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Editar Meta</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          value={goal}
          keyboardType="numeric"
          onChangeText={setGoal}
        />

        <Button
          title="Salvar alterações"
          onPress={() => {
            const updated = targets.map((t) => {
              if (t.id === selectedId) {
                return {
                  ...t,
                  name: name || t.name,
                  goal: goal ? Number(goal) : t.goal,
                };
              }
              return t;
            });

            setTargets(updated);
            setScreen('progress');
          }}
        />

        <Button
          title="Excluir Meta"
          onPress={() => {
            const filtered = targets.filter(
              (t) => t.id !== selectedId
            );
            setTargets(filtered);
            setScreen('home');
          }}
        />

        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => setScreen('progress')}
        />
      </View>
    );
  }

  // ================= TRANSAÇÃO =================
  if (screen === 'transaction') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nova Transação</Text>

        <View style={styles.toggleRow}>
          <Pressable
            style={[
              styles.toggle,
              type === 'input' && styles.toggleActive,
            ]}
            onPress={() => setType('input')}
          >
            <Text style={{ color: type === 'input' ? '#fff' : '#000' }}>
              Guardar
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.toggle,
              type === 'output' && styles.toggleActive,
            ]}
            onPress={() => setType('output')}
          >
            <Text style={{ color: type === 'output' ? '#fff' : '#000' }}>
              Resgatar
            </Text>
          </Pressable>
        </View>

        <TextInput
          placeholder="Valor"
          style={styles.input}
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />

        <Button
          title="Salvar"
          onPress={() => {
            const val = Number(value);
            if (!val) return;

            const updated = targets.map((t) => {
              if (t.id === selectedId) {
                return {
                  ...t,
                  current:
                    type === 'input'
                      ? t.current + val
                      : Math.max(0, t.current - val),
                };
              }
              return t;
            });

            setTargets(updated);

            const newList = transactions[selectedId] || [];

            setTransactions({
              ...transactions,
              [selectedId]: [
                ...newList,
                {
                  id: Date.now().toString(),
                  type,
                  value: val,
                },
              ],
            });

            setValue('');
            setScreen('progress');
          }}
        />
      </View>
    );
  }
}

// ================= STYLES =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },

  header: {
    backgroundColor: colors.primary,
    padding: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerLabel: {
    color: colors.white,
    opacity: 0.8,
  },

  headerValue: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  cardValue: {
    marginTop: 5,
    color: colors.gray,
  },

  percent: {
    marginTop: 8,
    fontWeight: 'bold',
    color: colors.primary,
  },

  progressBg: {
    height: 8,
    backgroundColor: colors.light,
    borderRadius: 10,
    marginTop: 10,
  },

  progressFill: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonSecondary: {
    backgroundColor: '#EEF0FF',
  },

  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  transactionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },

  toggleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },

  toggle: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },

  toggleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});