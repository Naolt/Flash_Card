import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomNormalTextInput from '../components/CustomTextInput/CustomNormalTextInput';
import {colors} from '../config/color';
import firestore from '@react-native-firebase/firestore';
import * as ImagePicker from 'react-native-image-picker';

const includeExtra = true;
const actions = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Image or Video\n(mixed)',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];

const AddFlashCard = () => {
  const [form, setForm] = React.useState({
    title: {value: '', error: ''},
    question: {value: '', error: ''},
    answer: {value: '', error: ''},
    tags: [],
  });
  const [response, setResponse] = React.useState(null);

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);
  const [flashCardId, setFlashCardId] = useState('');
  const [tags, setTags] = useState([]);
  useEffect(() => {
    firestore()
      .collection('tags')
      .get()
      .then(snapShot => {
        let titles = snapShot._docs.map(data => {
          return data?._data?.title;
        });
        setTags([...titles]);
      });
    console.log(tags);
  }, []);

  const [step, setStep] = React.useState(1);
  const addTitle = () => {
    firestore()
      .collection('flashCards')
      .add({
        title: form.title.value,
        desc: 'kdfjkdjfkf',
        likes: 0,
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: 'VJPpz6xC34bD827LSLnp',
        visibility: 'private',
        imgUrl: 'kdkd',
      })
      .then(newAdded => {
        console.log(newAdded.id);
        setFlashCardId(newAdded.id);
        setStep(2);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addCard = () => {
    firestore()
      .collection('cards')
      .add({
        question: form.question.value,
        answer: form.answer.value,
        flashCard: flashCardId,
      })
      .then(newAdded => {
        console.log('added', newAdded.id);
        setForm(prev => {
          let newState = {
            ...prev,
            question: {value: '', error: ''},
            answer: {value: '', error: ''},
          };
          return {...newState};
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (step == 1) {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.container}>
          <ScrollView>
            <View style={{width: '100%'}}>
              {actions.map(({title, type, options}) => {
                return (
                  <TouchableOpacity
                    onPress={() => onButtonPress(type, options)}>
                    <Text>{title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text>{response}</Text>

            {response?.assets &&
              response?.assets.map(({uri}: {uri: string}) => (
                <View key={uri} style={{width: '100%', height: 200}}>
                  <Image
                    resizeMode="cover"
                    resizeMethod="scale"
                    style={{width: '100%', height: '100%'}}
                    source={{uri: uri}}
                  />
                </View>
              ))}
          </ScrollView>
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              What is the name of you new flash card?
            </Text>
            <CustomNormalTextInput
              style={{width: 300}}
              placeHolder=""
              state={form.title}
              setForm={setForm}
              name="title"
            />
            <Text style={styles.error}>{form.title.error}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={addTitle}>
          <Text style={styles.btnText}>Create New Flash Card</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.container}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Question</Text>
            <CustomNormalTextInput
              style={{width: 300}}
              placeHolder=""
              state={form.question}
              setForm={setForm}
              name="question"
            />
            <Text style={styles.error}>{form.question.error}</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Answer</Text>
            <CustomNormalTextInput
              style={{width: 300}}
              placeHolder=""
              state={form.answer}
              setForm={setForm}
              name="answer"
            />
            <Text style={styles.error}>{form.answer.error}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={addCard}>
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  header: {
    fontSize: 36,
    color: colors.secondary.default,
    fontWeight: '600',
    marginBottom: 100,
  },
  formGroup: {
    gap: 10,
    margin: 10,
  },
  label: {
    fontSize: 15,
    color: colors.secondary.default,
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
    backgroundColor: colors.secondary.lighter,
    borderRadius: 8,
  },
  btnDisabled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 300,
    backgroundColor: colors.secondary.lighter + '88',
    borderRadius: 8,
  },
  btnText: {
    color: colors.background.lighter,
    fontSize: 14,
    fontWeight: '500',
  },
  dontHaveAccount: {
    color: colors.text.default,
    fontSize: 14,
    marginTop: 10,
  },
  signUpBtn: {
    color: colors.secondary.default,
    fontWeight: '600',
  },
  error: {
    fontSize: 13,
    color: '#ff9494',
  },
});

export default AddFlashCard;
