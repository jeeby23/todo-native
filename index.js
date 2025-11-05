import React, { useState } from 'react';
import { 
  AppRegistry,
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import Bitmap from './assets/Bitmap.jpg'; // ✅ make sure the file path is correct

const TodoApp = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([
    { id: '1', text: 'Complete online JavaScript course', completed: true },
    { id: '2', text: 'Jog around the park 3x', completed: false },
    { id: '3', text: '10 minutes meditation', completed: false },
    { id: '4', text: 'Read for 1 hour', completed: false },
    { id: '5', text: 'Pick up groceries', completed: false },
    { id: '6', text: 'Complete Todo App on Frontend Mentor', completed: false },
  ]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  const handleAddTodo = () => {
    if (todo.trim() === '') return;
    
    const newTodo = {
      id: Date.now().toString(),
      text: todo.trim(),
      completed: false
    };
    
    setTodos([newTodo, ...todos]);
    setTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(item => !item.completed));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(item => !item.completed);
      case 'completed':
        return todos.filter(item => item.completed);
      default:
        return todos;
    }
  };

  const getItemsLeft = () => {
    return todos.filter(item => !item.completed).length;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderTodoItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.todoItem, 
        darkMode && styles.darkTodoItem
      ]}
      onPress={() => toggleTodo(item.id)}
    >
      <View style={styles.todoContent}>
        
        <View style={[
          styles.checkbox,
          item.completed && styles.checkboxCompleted,
          darkMode && styles.darkCheckbox,
          item.completed && darkMode && styles.darkCheckboxCompleted
        ]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[
          styles.todoText,
          item.completed && styles.todoTextCompleted,
          darkMode && styles.darkTodoText,
          item.completed && styles.todoTextCompleted
        ]}>
          {item.text}
        </Text>
      </View>
      <TouchableOpacity onPress={() => removeTodo(item.id)}>
        <Text style={[
          styles.removeButton,
          darkMode && styles.darkRemoveButton
        ]}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const filteredTodos = getFilteredTodos();
  const itemsLeft = getItemsLeft();

  return (
    <KeyboardAvoidingView 
      style={[
        styles.container, 
        darkMode && styles.darkContainer
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      
      <View style={styles.headerBackground}>
        <Image source={Bitmap} style={styles.headerImage} resizeMode="cover" />
        <View style={styles.headerOverlay} />
      </View>
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>T O D O</Text>
          <TouchableOpacity onPress={toggleDarkMode}>
            <Text style={styles.themeToggle}>{darkMode ? '🌞' : '🌙'}</Text>
          </TouchableOpacity>
        </View>

        {/* Input Section */}
        <View style={[
          styles.inputContainer,
          darkMode && styles.darkInputContainer
        ]}>
          <View style={[
            styles.inputCheckbox,
            darkMode && styles.darkInputCheckbox
          ]} />
          <TextInput
            style={[
              styles.input,
              darkMode && styles.darkInput
            ]}
            placeholder="Create a new todo..."
            placeholderTextColor={darkMode ? '#767992' : '#9495a5'}
            value={todo}
            onChangeText={setTodo}
            onSubmitEditing={handleAddTodo}
            returnKeyType="done"
          />
        </View>

        {/* Todo List */}
        <View style={[
          styles.todoList,
          darkMode && styles.darkTodoList
        ]}>
          <FlatList
            data={filteredTodos}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          
          {/* Footer */}
          <View style={[
            styles.footer,
            darkMode && styles.darkFooter
          ]}>
            <Text style={[
              styles.itemsLeft,
              darkMode && styles.darkItemsLeft
            ]}>
              {itemsLeft} items left
            </Text>
            
            {/* Filter Buttons */}
            <View style={styles.filterButtons}>
              <TouchableOpacity onPress={() => setFilter('all')}>
                <Text style={[
                  styles.filterButton,
                  filter === 'all' && styles.filterButtonActive,
                  darkMode && styles.darkFilterButton
                ]}>
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilter('active')}>
                <Text style={[
                  styles.filterButton,
                  filter === 'active' && styles.filterButtonActive,
                  darkMode && styles.darkFilterButton
                ]}>
                  Active
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilter('completed')}>
                <Text style={[
                  styles.filterButton,
                  filter === 'completed' && styles.filterButtonActive,
                  darkMode && styles.darkFilterButton
                ]}>
                  Completed
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={clearCompleted}>
              <Text style={[
                styles.clearButton,
                darkMode && styles.darkClearButton
              ]}>
                Clear Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Buttons - Mobile */}
        <View style={[
          styles.mobileFilters,
          darkMode && styles.darkMobileFilters
        ]}>
          <TouchableOpacity onPress={() => setFilter('all')}>
            <Text style={[
              styles.filterButton,
              filter === 'all' && styles.filterButtonActive,
              darkMode && styles.darkFilterButton
            ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('active')}>
            <Text style={[
              styles.filterButton,
              filter === 'active' && styles.filterButtonActive,
              darkMode && styles.darkFilterButton
            ]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('completed')}>
            <Text style={[
              styles.filterButton,
              filter === 'completed' && styles.filterButtonActive,
              darkMode && styles.darkFilterButton
            ]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Drag hint */}
        <Text style={[
          styles.dragHint,
          darkMode && styles.darkDragHint
        ]}>
          Drag and drop to reorder list
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // 🔹 all your original styles here — don’t change anything
  // just paste your full styles object from your existing file.
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  darkContainer: {
    backgroundColor: '#171823',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',  
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 12,
    color: '#fff',
  },
  themeToggle: {
    fontSize: 24,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkInputContainer: {
    backgroundColor: '#25273d',
  },
  inputCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e3e4f1',
    marginRight: 12,
  },
  darkInputCheckbox: {
    borderColor: '#393a4b',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#393a4b',
  },
  darkInput: {
    color: '#c8cbe7',
  },
  todoList: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  darkTodoList: {
    backgroundColor: '#25273d',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e4f1',
  },
  darkTodoItem: {
    borderBottomColor: '#393a4b',
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e3e4f1',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkCheckbox: {
    borderColor: '#393a4b',
  },
  checkboxCompleted: {
    backgroundColor: '#3a7bfd',
    borderColor: '#3a7bfd',
  },
  darkCheckboxCompleted: {
    backgroundColor: '#3a7bfd',
    borderColor: '#3a7bfd',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  todoText: {
    fontSize: 16,
    color: '#494c6b',
    flex: 1,
  },
  darkTodoText: {
    color: '#c8cbe7',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#d1d2da',
  },
  removeButton: {
    fontSize: 24,
    color: '#494c6b',
    padding: 5,
  },
  darkRemoveButton: {
    color: '#c8cbe7',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  darkFooter: {
    backgroundColor: '#25273d',
  },
  itemsLeft: {
    fontSize: 14,
    color: '#9495a5',
  },
  darkItemsLeft: {
    color: '#5b5e7e',
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 18,
  },
  filterButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9495a5',
  },
  darkFilterButton: {
    color: '#5b5e7e',
  },
  filterButtonActive: {
    color: '#3a7bfd',
  },
  clearButton: {
    fontSize: 14,
    color: '#9495a5',
  },
  darkClearButton: {
    color: '#5b5e7e',
  },
  mobileFilters: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 18,
  },
  darkMobileFilters: {
    backgroundColor: '#25273d',
  },
  dragHint: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9495a5',
    marginBottom: 40,
  },
  darkDragHint: {
    color: '#5b5e7e',
  },
});

AppRegistry.registerComponent('main', () => TodoApp);