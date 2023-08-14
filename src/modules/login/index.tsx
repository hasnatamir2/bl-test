import React, {useMemo} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import LoginForm from './login-form';
import Guard from '../../infra/utils/guard';
import PhoneInput from 'react-native-phone-input';
import useAuth from '../../infra/hooks/useAuth';
import useLoading from '../../infra/hooks/useLoading';
import {useAppSelector} from '../../infra/hooks/useRTK';
import Button from '../../shared/ui/button';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';

const Login = () => {
  const {loginUser, logoutUser, setAuth} = useAuth();
  const {loading} = useLoading();
  const {token} = useAppSelector(state => state.user);

  const [form, setForm] = React.useState({
    email: '',
    name: '',
    password: '',
    phone: '',
  });
  const [errorMessage, setErrorMessage] = React.useState({
    email: '',
    name: '',
    password: '',
    phone: '',
  });
  const [disabled, setDisabled] = React.useState(true);

  // to check if there is no error
  useMemo(() => {
    if (Object.values(form).every(x => x !== '')) {
      setDisabled(!Object.values(errorMessage).every(x => x === ''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  const onChange = (name: string, value: string) => {
    setForm({...form, [name]: value});
    validate(name, value);
  };

  const validate = (name: string, value: string) => {
    const err = Guard.againstNullOrUndefined(value, name);

    setErrorMessage({
      ...errorMessage,
      [name]: err.message,
    });
    // to validate email
    if (name === 'email' && value) {
      const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
      const invalid = emailRegex.test(value);
      setErrorMessage({
        ...errorMessage,
        email: invalid ? '' : 'Invalid email',
      });
    }

    // to validate phone
    if (name === 'phone' && value) {
      const isValid = new PhoneInput({initialValue: value}).isValidNumber();
      if (!isValid) {
        setErrorMessage({
          ...errorMessage,
          phone: 'Invalid phone number',
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!disabled) {
      // call api
      await loginUser({username: form.name, password: form.password});
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setAuth(userInfo.user, userInfo.idToken);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error);
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  const onFacebookLogin = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile']);

    if (result.isCancelled) {
      Alert.alert('Something went wrong!');
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      Alert.alert('Something went wrong!');
    }

    const user = await Profile.getCurrentProfile();
    if (user && data) {
      setAuth(user, data.accessToken);
    }
  };

  return (
    <Card style={styles.cardContainer}>
      <Card.Title title="Login" titleStyle={styles.title} />
      <Card.Content>
        {token ? (
          <Button onPress={logoutUser} mode="contained">
            Log out
          </Button>
        ) : (
          <LoginForm
            form={form}
            errorMessage={errorMessage}
            onSubmit={handleSubmit}
            onChange={onChange}
            loading={loading}
            disabled={disabled}
            onGoogleLogin={handleGoogleLogin}
            onFacebookLogin={onFacebookLogin}
          />
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Login;
