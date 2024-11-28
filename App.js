import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const addExpense = () => {
    if (expenseName.trim() !== '' && !isNaN(expenseAmount) && Number(expenseAmount) > 0) {
      setExpenses([...expenses, { id: Date.now().toString(), name: expenseName, amount: parseFloat(expenseAmount) }]);
      setExpenseName('');
      setExpenseAmount('');
    }
  };

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Трекер расходов</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.inputName]}
          placeholder="Название расхода"
          value={expenseName}
          onChangeText={setExpenseName}
        />
        <TextInput
          style={[styles.input, styles.inputAmount]}
          placeholder="Стоимость"
          keyboardType="numeric"
          value={expenseAmount}
          onChangeText={setExpenseAmount}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.largeButton} onPress={addExpense}>
          <Text style={styles.buttonText}>Добавить</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.totalText}>Итого: {totalExpenses.toFixed(0)} ₽</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseContainer}>
            <Text style={styles.expenseText}>{item.name}: {item.amount.toFixed(0)} ₽</Text>
            <TouchableOpacity onPress={() => deleteExpense(item.id)}>
              <Text style={styles.deleteText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 120,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 8,
    marginRight: 10,
    width: Dimensions.get('window').width < 420 ? '45%' : '100%',
  },
  inputName: {
    marginRight: 10,
  },
  inputAmount: {
    marginRight: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },  
  buttonContainer: {
    marginBottom: 20,
  },
  largeButton: {
    backgroundColor: '#007BFF', 
    paddingVertical: 20, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold', 
  },  
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  expenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  expenseText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
