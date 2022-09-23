import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { insertElementsInHTML } from './utils/createElements';
let tempt = []

export default function App() {
  const [values, setValues] = useState('');
  const [valueList, setValueList] = useState([]);
  let elementsHTML = ''
  
  const setValuesInList = () => {
    tempt.push(values)
    console.log(tempt)
  }
  
  const saveValuesInList = () => { 
    elementsHTML = insertElementsInHTML(tempt)
    console.log(elementsHTML)
  }


  const generatePdf = async () => {
    const file = await printToFileAsync({
      html: elementsHTML,
      base64: false
    });

    await shareAsync(file.uri)
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Gerenciamento de Estoque</Text>
      </View>
      <View>
        <TextInput
          value={values}
          onChangeText={(value) => setValues(value)}
          placeholder='valor aqui'
          keyboardType='numeric'
        />

        <Button title='adicionar' onPress={setValuesInList}/>
        <Button title='salvar' onPress={saveValuesInList}/>
        <Button title='limpar' onPress={() => setValueList([])}/>
        <Button title='gerar PDF' onPress={generatePdf}/>
      </View>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: '10%',
  },
  containerHeader: {
    width: '100%'
  },
  title: {
    fontSize: 24,
    paddingVertical: '5%',
    width: '100%',
    textAlign: 'center',
    color: '#ffffff'
  }
});
