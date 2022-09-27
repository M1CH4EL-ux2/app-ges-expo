import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { insertElementsInHTML } from './utils/createElements';
import { useForm, Controller } from 'react-hook-form';
import Radio from './components/Radio';
let tempt = []

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)

  // const [selectedLanguage, setSelectedLanguage] = useState();
  // const [values, setValues] = useState('');
  const [valueList, setValueList] = useState([]);
  const [option, setOption] = useState('Dinheiro')
  const [selected, setSelected] = useState(0)

  let elementsHTML = ''

  const handleSetValue = data => {
    if(!data.values) {
      alert('Por favor Mocinha, preencha o campo com o valor')
    }
    data.options = option
    tempt.push(data)
    // console.log(tempt)
  }

  // const setValuesInList = () => {
    
  // }

  const saveValuesInList = () => {
    elementsHTML = insertElementsInHTML(tempt)
    // console.log('ELEMENTS', elementsHTML)
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
          name='values'
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

        <Radio 
          selected={selected}
          options={['PIX', 'Cartão', 'Dinheiro']}
          horizontal={true}
          onChangeSelect={(opt, i) => {
            setOption(opt)
            setSelected(i)
          }}
        />
        
        <View style={styles.buttonsContainer}>
          <Button color='#40de4d' title='adicionar' onPress={handleSubmit(handleSetValue)} />
        </View>
        <View style={styles.buttonsContainer}>
          <Button color='#40de4d' title='salvar' onPress={saveValuesInList} />
        </View>
        <View style={styles.buttonsContainer}>
          <Button color='#40de4d' title='limpar' onPress={() => setValueList([])} />
        </View>
        <View style={styles.buttonsContainer}>
          <Button color='#40de4d' title='gerar PDF' onPress={generatePdf} />
        </View>
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
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#888',
    borderRadius: 5
  },
  buttonsContainer: {
    marginTop: '5%',
  }
});
