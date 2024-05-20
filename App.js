import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
} from 'react-native';
import {
  db,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from './firebaseConfig';
import NoteModal from './noteModal';

export default function App() {
  const [text, setText] = useState('');
  const [readText, setNote] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    readData();
  }, []);

  const addData = async () => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Please enter a non-empty note.');
      return; 
    }
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        text: text,
      });
      console.log('Document written with ID: ', docRef.id);
      setText('');
      readData();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  

  const readData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'notes'));
      const notelist = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNote(notelist);
    } catch (e) {
      console.error('Error reading documents: ', e);
    }
  };

  const renderData = ({ item }) => (
    <TouchableOpacity
      style={styles.noteContainer}
      onPress={() => {
        setSelectedNote(item.text);
        setModalVisible(true);
      }}
    >
      <View style={styles.noteTextContainer}>
        <Text style={styles.noteText}>{truncateText(item.text)}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => showAlert(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const showAlert = (id) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteData(id),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
      console.log('Document deleted with ID: ', id);
      readData();
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  const truncateText = (text) => {
    const maxLength = 40;
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Notes App</Text>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Add a note"
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={addData}>
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
        <FlatList
          data={readText}
          renderItem={renderData}
          keyExtractor={(item) => item.id}
        />
        <NoteModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          noteText={selectedNote}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    height: 40,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#bacfce',
  },
  buttonAdd: {
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#175c91',
    padding: 10,
  },
  textButton: {
    color: '#fff',
  },
  noteContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ebeef0',
  },
  noteTextContainer: {
    flex: 1,
  },
  noteText: {
    flex: 1,
  },
  deleteButton: {
    borderRadius: 5,
    backgroundColor: 'red',
    padding: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
  },
});