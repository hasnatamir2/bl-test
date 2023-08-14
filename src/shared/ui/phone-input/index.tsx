import React from 'react';
import {StyleSheet, View} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {HelperText} from 'react-native-paper';

interface PhoneTextInputProps {
  placeholder?: string;
  value?: string;
  onChangePhoneNumber: (phoneNumber: string) => void;
  error?: boolean;
  errorMessage?: string;
}

const PhoneTextInput = ({
  placeholder,
  onChangePhoneNumber,
  error,
  errorMessage,
}: PhoneTextInputProps) => {
  return (
    <View>
      <PhoneInput
        initialCountry="ae"
        style={styles.input}
        textStyle={[styles.textField, error && styles.error]}
        flagStyle={styles.flag}
        textProps={{placeholder}}
        onChangePhoneNumber={onChangePhoneNumber}
      />
      <HelperText type="error" visible={error}>
        {errorMessage}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    paddingVertical: 8,
    height: 40,
  },
  textField: {
    padding: 8,
    height: 40,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  flag: {
    padding: 8,
    borderBottomWidth: 1,
  },
  error: {
    borderBottomColor: 'red',
  },
});

export default PhoneTextInput;
