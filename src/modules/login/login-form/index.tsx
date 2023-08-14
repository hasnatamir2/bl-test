import React from 'react';
import {StyleSheet, View} from 'react-native';
import InputField from '../../../shared/ui/input';
import PhoneTextInput from '../../../shared/ui/phone-input';
import Button from '../../../shared/ui/button';
import {Text} from 'react-native-paper';

interface LoginFormProps {
  form: any;
  errorMessage: any;
  onSubmit: () => void;
  onChange: (name: string, value: string) => void;
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  loading?: boolean;
  disabled: boolean;
}

const LoginForm = ({
  form,
  errorMessage,
  onSubmit,
  onChange,
  onGoogleLogin,
  onFacebookLogin,
  loading,
  disabled,
}: LoginFormProps) => {
  return (
    <View style={styles.formContainer}>
      <InputField
        placeholder="Email"
        value={form.email}
        onChangeText={(text: string) => onChange('email', text)}
        error={errorMessage.email !== ''}
        errorMessage={errorMessage.email}
      />
      <InputField
        placeholder="Name"
        value={form.name}
        onChangeText={(text: string) => onChange('name', text)}
        error={errorMessage.name !== ''}
        errorMessage={errorMessage.name}
      />
      <InputField
        placeholder="Password"
        value={form.password}
        onChangeText={(text: string) => onChange('password', text)}
        secureTextEntry={true}
        error={errorMessage.password !== ''}
        errorMessage={errorMessage.password}
      />
      <PhoneTextInput
        onChangePhoneNumber={(phoneNumber: string) =>
          onChange('phone', phoneNumber)
        }
        error={errorMessage.phone !== ''}
        errorMessage={errorMessage.phone}
      />
      <View style={styles.submitContainer}>
        <Button onPress={onSubmit} disabled={disabled} loading={loading}>
          Submit
        </Button>
        <Text style={styles.textCenter}>OR</Text>
        <Button onPress={onGoogleLogin} icon={'google'}>
          Google Login
        </Button>
        <Button onPress={onFacebookLogin} icon={'facebook'}>
          Facebook Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {},
  formContainer: {},
  submitContainer: {
    gap: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default LoginForm;
