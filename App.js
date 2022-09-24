import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { insertElementsInHTML } from './utils/createElements';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker'
let tempt = []

export default function App() {
  const { control, handleSubmit, formState: { errors }} = useForm()
  const onSubmit = data => console.log(data)

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [values, setValues] = useState('');
  const [valueList, setValueList] = useState([]);
  let elementsHTML = ''

  const handleSetValue = data => {
    console.log(data)
  }
  
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

        <Controller
          control={control}
          name='name'
          render={({ field: {onChange, onBlur, value} }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder='valor aqui'
            />
          )}
        />

        <Controller
          control={control}
          name='typeCash'
          render={({ field: {onChange, onBlur, value}}) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
            >
              <Picker.Item label='PIX' value='pix' />
              <Picker.Item label='Dinheiro' value='dinheiro' />
              <Picker.Item label='Cartão' value='cartao' />
            </Picker>
          )}
        />
        
        <Button title='adicionar' onPress={handleSubmit(handleSetValue)}/>
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
  }
});
