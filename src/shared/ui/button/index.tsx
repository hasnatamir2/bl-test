import React from 'react';
import {Button as PaperButton} from 'react-native-paper';

interface ButtonProps {
  children: React.ReactNode;
  onPress: any;
  disabled?: boolean;
  buttonColor?: string;
  textColor?: string;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  loading?: boolean;
  icon?: any;
}

const Button = (props: ButtonProps) => {
  return (
    <PaperButton
      mode={props.mode || 'contained'}
      buttonColor={props.buttonColor}
      onPress={props.onPress}
      disabled={props.disabled}
      icon={props.icon}
      loading={props.loading}>
      {props.children}
    </PaperButton>
  );
};

export default Button;
