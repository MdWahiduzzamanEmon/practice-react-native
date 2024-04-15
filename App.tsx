import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';

const App = () => {
  const [todo, setTodo] = React.useState<any>({
    value: '',
  });

  const [todos, setTodos] = React.useState<any[]>([]);

  const [mode, setMode] = React.useState('add');

  const addTodo = () => {
    if (todo === '') {
      Alert.alert('Please enter a todo');
      return;
    }

    setTodos([
      ...todos,
      {
        value: todo.value,
        todoImage: 'https://picsum.photos/200/300',
      },
    ]);

    setTodo('');
    setMode('add');
  };

  const handleEdit = (item: any) => {
    setTodo({
      id: item.id,
      value: item.value,
    });
    const updatedTodos = todos.filter(todo => todo.value !== item.value);
    setTodos(updatedTodos);
    setMode('edit');
  };

  const editTodo = () => {
    if (todo === '') {
      Alert.alert('Please enter a todo');
      return;
    }

    setTodos([
      ...todos,
      {
        value: todo.value,
        todoImage: 'https://picsum.photos/200/300',
      },
    ]);

    setTodo('');
    setMode('add');
  };

  const deleteTodo = (item: any) => {
    const confirmDelete = Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        {
          text: 'Yes',
          onPress: () => {
            const updatedTodos = todos.filter(
              todo => todo.value !== item.value,
            );
            setTodos(updatedTodos);
            Alert.alert('Todo deleted successfully');
          },
        },
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
        },
      ],
    );

    return confirmDelete;
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.todoContainer}>
        <Image
          style={{width: 200, height: 200}}
          source={{
            uri: item?.todoImage,
          }}
        />
        <Text style={styles.todoText}>{item?.value}</Text>
        <View style={styles.deleteButtonBox}>
          <Text
            style={styles.deleteButton}
            onPress={() => {
              deleteTodo(item);
            }}>
            Delete
          </Text>
          <Text
            style={styles.editButton}
            onPress={() => {
              handleEdit(item);
            }}>
            Edit
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Todo App</Text>
        {/* //text input  */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Text"
            value={todo?.value}
            onChangeText={text => {
              if (text === '') {
                setTodo({
                  value: '',
                });
                setMode('add');
              } else {
                setTodo({
                  value: text,
                });
              }
            }}
          />
          <TouchableOpacity onPress={mode === 'add' ? addTodo : editTodo}>
            <Text style={styles.deleteButton}>
              {mode === 'add' ? 'Add' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* //button */}
        <View>
          {/* //todo container */}

          <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.todoList}
          />
        </View>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },

  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10,
    borderRadius: 5,
    width: '80%',
  },

  todoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'lightblue',
  },
  todoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  deleteButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  deleteButton: {
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 5,
    backgroundColor: 'red',
    padding: 5,
  },
  editButton: {
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 5,
    backgroundColor: 'green',
    padding: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  todoList: {
    marginTop: 20,
  },
});
