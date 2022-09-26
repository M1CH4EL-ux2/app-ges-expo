import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { insertElementsInHTML } from './utils/createElements';
import { useForm, Controller } from 'react-hook-form';
let tempt = []

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)

  // const [selectedLanguage, setSelectedLanguage] = useState();
  // const [values, setValues] = useState('');
  const [valueList, setValueList] = useState([]);
  let elementsHTML = ''

  const handleSetValue = data => {
    tempt.push(data)
    console.log(tempt)
  }

  // const setValuesInList = () => {
    
  // }

  const saveValuesInList = () => {
    elementsHTML = insertElementsInHTML(tempt)
    console.log('ELEMENTS', elementsHTML)
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

        <Controller
          control={control}
          name='name'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder='valor aqui'
            />
          )}
        />

        <Button style={styles.buttons} title='adicionar' onPress={handleSubmit(handleSetValue)} />
        <Button style={styles.buttons} title='salvar' onPress={saveValuesInList} />
        <Button style={styles.buttons} title='limpar' onPress={() => setValueList([])} />
        <Button style={styles.buttons} title='gerar PDF' onPress={generatePdf} />
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
    justifyContent: 'center'
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
  },
  input: {
    padding: 10,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#000000'
  },
  buttons: {
    marginHorizontal: 10,
  }
});
