import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const InputField = (props: InputFieldProps) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        underlineStyle={styles.underline}
        contentStyle={styles.content}
        outlineStyle={styles.outline}
        theme={{colors: {primary: '#102654'}}}
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        mode="flat"
      />
      <HelperText type="error" visible={props.error}>
        {props.errorMessage}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    fontSize: 14,
    height: 40,
  },
  underline: {
    borderColor: '#c9c9c9',
  },
  content: {
    paddingLeft: 12,
  },
  outline: {},
});

export default InputField;
