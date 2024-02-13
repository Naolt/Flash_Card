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

const SignUp = () => {
  const navigation = useNavigation();
  const [form, setForm] = React.useState({
    email: {value: '', error: ''},
    password: {value: '', error: ''},
    confirmPassword: {value: '', error: ''},
  });

  const handleSignUp = () => {
    if (form.confirmPassword.value !== form.password.value) {
      setForm(prev => {
        let newState = {
          ...prev,
          confirmPassword: {
            ...prev.confirmPassword,
            error: 'Password does not match',
          },
        };
        return {...newState};
      });
      return;
    }
    auth()
      .createUserWithEmailAndPassword(form.email.value, form.password.value)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      })
      .catch(error => {
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
        }

        console.error(error);
      });
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Signup</Text>

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
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <CustomNormalTextInput
            style={{width: 300}}
            placeHolder=""
            state={form.confirmPassword}
            setForm={setForm}
            name="confirmPassword"
          />
          <Text style={styles.error}>{form.confirmPassword.error}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={
          !form.password.value ||
          !form.email.value ||
          !form.confirmPassword.value
            ? styles.btnDisabled
            : styles.btn
        }
        disabled={
          !form.password.value ||
          !form.email.value ||
          !form.confirmPassword.value
        }
        onPress={handleSignUp}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
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

export default SignUp;
