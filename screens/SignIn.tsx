import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../config/color';
import CustomNormalTextInput from '../components/CustomTextInput/CustomNormalTextInput';
import auth from '@react-native-firebase/auth';
const SignIn = () => {
  const navigation = useNavigation();
  const [form, setForm] = React.useState({
    email: {value: '', error: ''},
    password: {value: '', error: ''},
  });

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(form.email.value, form.password.value)
      .then(() => {
        console.log('USER SIGNED INNNN!');
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      })
      .catch(error => {
        console.log('ERRRORRRR!! LOGIN ');
        //setError(true);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setForm(prev => {
            let newState = {
              ...prev,
              email: {
                ...prev.email,
                error: 'That email address is already in use!',
              },
            };
            return {...newState};
          });
        }
        if (error.code === 'auth/user-not-found') {
          console.log('That email address is not found!');
          setForm(prev => {
            let newState = {
              ...prev,
              email: {
                ...prev.email,
                error: 'Email incorrect!',
              },
            };
            return {...newState};
          });
        } else {
          setForm(prev => {
            let newState = {
              ...prev,
              email: {
                ...prev.email,
                error: '!',
              },
            };
            return {...newState};
          });
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setForm(prev => {
            let newState = {
              ...prev,
              email: {
                ...prev.email,
                error: 'That email address is invalid!',
              },
            };
            return {...newState};
          });
        } else {
          setForm(prev => {
            let newState = {
              ...prev,
              email: {
                ...prev.email,
                error: '',
              },
            };
            return {...newState};
          });
        }
        if (error.code === 'auth/wrong-password') {
          console.log(
            'The password is invalid or the user does not have a password.',
          );
          setForm(prev => {
            let newState = {
              ...prev,
              password: {
                ...prev.password,
                error: 'Password incorrect!',
              },
            };
            return {...newState};
          });
        } else {
          setForm(prev => {
            let newState = {
              ...prev,
              password: {
                ...prev.password,
                error: '',
              },
            };
            return {...newState};
          });
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Sign In</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <CustomNormalTextInput
            style={{width: 300}}
            placeHolder=""
            state={form.email}
            setForm={setForm}
            name="email"
          />
          <Text style={styles.error}>{form.email.error}</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <CustomNormalTextInput
            style={{width: 300}}
            placeHolder=""
            state={form.password}
            setForm={setForm}
            name="password"
          />
          <Text style={styles.error}>{form.password.error}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={
          !form.password.value || !form.email.value
            ? styles.btnDisabled
            : styles.btn
        }
        onPress={handleSignIn}
        disabled={!form.password.value || !form.email.value}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.dontHaveAccount}>
        Dont have an account?{' '}
        <Text
          style={styles.signUpBtn}
          onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
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
    marginBottom: 10,
  },
  formGroup: {
    gap: 3,
    margin: 10,
  },
  label: {
    fontSize: 15,
    color: colors.text.default,
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

export default SignIn;
