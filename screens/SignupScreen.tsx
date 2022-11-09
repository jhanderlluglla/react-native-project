import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import CheckBox from 'react-native-check-box'
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { setAccountInfo, resetRegisterFlag } from '../actions/authActions';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import PhoneInput from "react-native-phone-number-input";


const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 10,
    marginTop: 0
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    justifyContent: 'flex-start',
  },
  helpText: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  socialButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
  },
  signupButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
    color: "#FFF"
  },
  fieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 30,
    width: '100%'
  },
  fieldCheckboxWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginTop: 10
  },
  fieldLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '800',
    paddingBottom: 5,
  },
  fieldDescription: {
    fontSize: 14,
    fontWeight: 'normal',
    paddingBottom: 10,
    marginLeft: 30,
    paddingRight: 30,
    marginTop: 12,
    lineHeight: 20,
  },
  iconStyle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
  },
  fieldInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 16,
    padding: 10,
    color: '#2CAF4D',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 40,
  },
  fieldInputPhone: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 16,
    color: '#2CAF4D',
    flex: 1,
    width: '100%',
    height: 40
  },
  errorMessageAlert: {
    fontSize: 10,
    color: '#cc3300',
    fontStyle: 'italic',
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center'
  },
  fieldInputCheckbox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 16,
    padding: 10,
    color: '#2CAF4D',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginLeft: 50
  },
  signupButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7B61FF",
    padding: 16,
    fontSize: 15,
    fontWeight: "700",
    height: 50,
    borderRadius: 14,
    width: "85%",
    marginTop: 16,
  },
  iconImage: {
    width: 30,
    height: 30
  },
  greenButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CAF4D',
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderWidth: 0,
    borderColor: '#fff',
    borderRadius: 50,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  },
  textLinkWrapper: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
  textLink: {
    textDecorationStyle: 'solid',
    color: '#7B61FF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'right'
  },
  textLinkStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textLinkArrow: {
    textDecorationStyle: 'solid',
    color: '#7B61FF',
    fontWeight: '600',
    fontSize: 25,
  },
});

interface ISignupScreenProps {
  navigation: NavigationProp<any>;
}

const SignupScreen: React.FC<ISignupScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;


  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [formattedValue, setFormattedValue] = useState("");

  const phoneInput = useRef(null);

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)
  const bgColor = useThemeColor({}, 'background');

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const validateEmail = (email: string) => {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }  

  const validateForm = () => {
    let flag = true;
    if (firstName.length === 0) {
      flag = false;
      setValidationError(true);
    }
    if (lastName.length === 0) {
      flag = false;
      setValidationError(true);
    }
    if (email.length === 0 || !validateEmail(email)) {
      flag = false;
      setValidationError(true);
    }
    if (phone.length === 0) {
      flag = false;
      setValidationError(true);
    }
    if (phone.length < 8) {
      flag = false;
    }
    return flag;
  }

  const signup = () => {
    if (validateForm()) {
      dispatch(setAccountInfo({
        firstName,
        lastName,
        email,
        phone,
      }));
      navigation.navigate('PasswordSetupScreen');
    } else {
      if (firstName.length === 0) {
        setValidationErrorMessage('first name is required field');
      }
      else if (lastName.length === 0) {
        setValidationErrorMessage('last name is required field');
      }
      else if (email.length === 0 || !validateEmail(email)) {
        setValidationErrorMessage('Please recheck your email info');
      }
      else if (phone.length === 0) {
        setValidationErrorMessage('Please fill your phone number!');
      }
      else if (!phone.startsWith('+')) {
        setValidationErrorMessage('Your phone number should be started with +');
      }
      else if (phone.length < 10) {
        setValidationErrorMessage('The length of your phone number should be larger than 10');
      }
      else {
        setValidationErrorMessage('There are some thing wrong in your input values!');
      }
    }
  };

  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const gotoPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicyScreen');
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(resetRegisterFlag());  
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.headerWrapper}>
          <Pressable style={styles.textLinkWrapper} onPress={goBack}>
            <Icon2 style={styles.textLinkArrow} name="arrow-back"/>
          </Pressable>
        </View>
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.title}>Create your account</Text>
          </View>
          <View style={styles.fieldWrapper}>
            <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
            <TextInput
              style={styles.fieldInput}
              placeholder="Enter your first name"
              onChangeText={(text) => setFirstName(text)}
              autoFocus
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
            <TextInput
              style={styles.fieldInput}
              placeholder="Enter your last name"
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Icon3 style={styles.iconStyle} name="mail" size={20} color="#000" />
            <TextInput
              style={styles.fieldInput}
              placeholder="Enter your email"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {/* <View style={styles.fieldWrapper}>
            <Icon4 style={styles.iconStyle} name="phone" size={20} color="#000" />
            <TextInput
              style={styles.fieldInput}
              placeholder="Enter your phone"
              onChangeText={(text) => setPhone(text)}
            />
          </View> */}
          <View style={styles.fieldWrapper}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phone}
              defaultCode="US"
              layout="first"
              onChangeText={(text) => {
                setFormattedValue(text);
              }}
              onChangeFormattedText={(text) => {
                setPhone(text);
              }}
              containerStyle={styles.fieldInputPhone}
              textContainerStyle={{ paddingVertical: 0 }}
              withDarkTheme            
            />
          </View>
          

          <View style={styles.fieldCheckboxWrapper}>
            <CheckBox
              style={{ flex: 1, padding: 10 }}
              onClick={() => {
                setToggleCheckBox(!toggleCheckBox);
              }}
              isChecked={toggleCheckBox}
              leftText={"CheckBox"}
            />
            <Text style={styles.fieldDescription}>
              By creating an account means you agree to the terms and conditions, and
              <Pressable onPress={gotoPrivacyPolicy}>
                <Text style={styles.textLinkStyle}> our privacy policy. </Text>
              </Pressable>
            </Text>
          </View>

          {validationError && (
            <Text style={styles.errorMessageAlert}>
              {validationErrorMessage}
            </Text>
          )}

          <Pressable style={styles.signupButton} onPress={signup}>
            <Text style={styles.signupButtonText}>Create Account</Text>
          </Pressable>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};

export default SignupScreen;
