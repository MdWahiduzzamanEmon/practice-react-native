import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const App = () => {
  const [text, setText] = React.useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {'Welcome to React Native with TypeScript!'}
      </Text>

      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: 200,
          margin: 10,
        }}
        onChangeText={text => setText(text)}
        value={text}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  text: {
    color: 'black',
  },
});
