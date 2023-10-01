
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View, StyleSheet,ImageBackground,Text } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Todo from './todo';

function App() {
  const [todo, setTodo] = React.useState('');
  const [ loading, setLoading ] = React.useState(true);
  const [ todos, setTodos ] = React.useState([]);
  const ref = firestore().collection('todos');
  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

 // mục đích useEffect để quản lý vòng đời của của một component voi react-hood
  React.useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  });

  if (loading) {
    return null; // or a spinner
  }

  return (
<ImageBackground source={require("./img/eef16750915a90f94cd86845653d90f1.jpg")} style={styles.backgroundImage}>
    <View style={[styles.container]}>
      <Appbar>
        <Appbar.Content title={'Tất cả việc cần làm!'} />
      </Appbar>
      <FlatList 
    style={{flex: 1, color: 'white', }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item}/> }
      />
      <TextInput label={'Thêm việc...'} value={todo} onChangeText={(text) => setTodo(text)} style={{
        width:"90%",
        borderRadius:10,
        marginLeft:15,
      }} />
      <Button onPress={addTodo}><Text style={styles.buttonText}>Thêm ghi chú</Text></Button> 
    </View>
    </ImageBackground>

  );
}
export default App;
const styles = StyleSheet.create({
  container :{
      flex : 1,
  },
  backgroundImage: {
    flex: 1, // Để nói rằng `ImageBackground` sẽ chiếm toàn bộ không gian của cha nó
    resizeMode: 'cover', // Để phù hợp với kích thước màn hình và che đậy toàn bộ không gian
  },
  buttonText: {
    color: 'white', // Đặt màu chữ của nút thành màu trắng
    fontSize: 16,
    textAlign: 'center',
  },

})
