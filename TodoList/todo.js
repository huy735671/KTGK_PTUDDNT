/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';


function Todo({ id, title, complete }) {
  async function toggleComplete() {
    await firestore()
      .collection('todos')
      .doc(id)
      .update({
        complete: !complete,
    });
}
return (

  <List.Item
  style={{
    borderBottomWidth: 1,
    borderBottomColor: 'white', 
  }}
    title={title}
    onPress={() => toggleComplete()}
    left={props => (
      <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
    )}
/>
);
}

export default Todo;

