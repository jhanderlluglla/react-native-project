import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Linking, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLoginUser, clearAuthState, generateStripeAccessLink, sendVerificationCode } from '../actions/authActions';
import { IRootState } from '../reducers';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/FontAwesome5';


const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    height: 130
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 30, 
    paddingRight: 30,
    paddingTop: 50,
    marginTop: 0
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 20,
    marginTop: 90
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    justifyContent: 'flex-start',
  },
  iconStyleRight: {
    position: 'absolute',
    zIndex: 99,
    width: 24,
  },
  helpText: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  signinButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
    color: "#FFF"
  },
  fieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 24,
    width: '100%'
  },
  fieldLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '800',
    paddingBottom: 5,
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
  signinButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7B61FF",
    padding: 16,
    fontSize: 15,
    fontWeight: "700",
    height: 50,
    borderRadius: 14,
    width: "85%",
    marginTop: 111,
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
  textLinkArrow: {
    textDecorationStyle: 'solid',
    color: '#7B61FF',
    fontWeight: '600',
    fontSize: 25,
  },
  iconStyle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
  },
  toggle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 10,
  },
  iconImage: {
    width: 30,
    height: 30
  },
  flex: {
    flex: 1,
  },

});

interface ILoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<ILoginScreenProps> = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');

  const bgColor = useThemeColor({}, 'background');

  const [enableMask, setEnableMask] = React.useState(true);
  const toggleMask = () => setEnableMask((f) => !f);

  const { stripeUrl } = useSelector((state: IRootState) => state.auth);

  const continueLogin = () => {
    if (email.length > 0 && password.length > 0) {
      dispatch(authLoginUser(email, password));
    }
  };

  const gotoSignup = () => {
    props.navigation.navigate('SignupScreen');
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const gotoReset = () => {
    props.navigation.navigate('ResetScreen');
  };

  React.useEffect(() => {
    if (stripeUrl) {
      Linking.openURL(stripeUrl)
    }
  }, [stripeUrl])

  React.useEffect(() => {
    dispatch(clearAuthState());
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
          {/* <Pressable style={styles.textLinkWrapper} onPress={gotoSignup}>
            <Text style={styles.textLink}>SIGN UP</Text>
          </Pressable> */}
        </View>
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Log In</Text>
          </View>

          <View style={styles.fieldWrapper}>
            <Icon3 style={styles.iconStyle} name="mail" size={20} color="#000" />
            <TextInput
              style={styles.fieldInput}
              placeholder="Enter your email"
              onChangeText={(text) => setEmail(text)}
              autoCompleteType="off"
            />
          </View>

          <View style={styles.fieldWrapper}>
            <Icon5 style={styles.iconStyle} name="lock-outline" size={20} color="#000" />
            <TextInput
              style={styles.fieldInput}
              secureTextEntry={enableMask}
              placeholder="Enter your password"
              onChangeText={(text) => setPass(text)}
              autoCompleteType="off"
            />
            <Text style={styles.toggle} onPress={toggleMask}>
              {enableMask ?
                <Icon6 name="eye-slash" size={20} color="#000" />
                :
                <Icon6 name="eye" size={20} color="#000" />
              }
            </Text>
          </View>

          <Pressable style={styles.textLinkWrapper} onPress={gotoReset}>
            <Text style={styles.textLink}>RECOVER PASSWORD</Text>
          </Pressable>

          <Pressable style={styles.signinButton} onPress={continueLogin}>
            <Text style={styles.signinButtonText}>Login</Text>
          </Pressable>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
