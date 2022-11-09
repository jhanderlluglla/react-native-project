//import liraries
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SocialIcon } from 'react-native-elements';
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from '../components/Themed';

import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/FontAwesome5';

interface IWelcomeScreenProps {
  navigation: NavigationProp<any>;
}

const WelcomeScreen: React.FC<IWelcomeScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [enableMask, setEnableMask] = React.useState(false);
  const toggleMask = () => setEnableMask((f) => !f);

  const gotoLogin = () => {
    setModalVisible(true)
  };

  const gotoSignup = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity style={styles.centeredView} onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <View style={styles.fieldWrapper}>
              <TextInput
                style={styles.fieldInput}
                placeholder="Enter your phone"
                autoCompleteType="off"
              />
            </View>

            <View style={styles.fieldWrapper}>
              <TextInput
                style={styles.fieldInput}
                placeholder="Password"
                autoCompleteType="off"
              />
              <Text style={styles.toggle} onPress={toggleMask}>
                {enableMask ? (
                  <Icon6 name="eye-slash" size={20} color="#D4D4D4" />
                ) : (
                  <Icon6 name="eye" size={20} color="#D4D4D4" />
                )}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.signinButtonModal}
              onPress={gotoLogin}
            >
              <Text style={styles.signinButtonText}>Sign in</Text>
            </TouchableOpacity>
            <View style={styles.socialButtonList}>
              <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={styles.socialButtonIcon}>
                  <Image
                    source={require('../assets/images/Google.png')}
                    style={styles.socialIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'column' }}>
                <SocialIcon
                  type="github"
                  onPress={() => {
                    alert('github');
                  }}
                />
              </View>

              <View style={{ flexDirection: 'column' }}>
                <SocialIcon
                  type="facebook"
                  onPress={() => {
                    alert('facebook');
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/bg.png')} resizeMode="cover" />
        <View style={styles.headerContent}>
          <View style={styles.iconView}>
            <Image
              source={require('../assets/images/splash_logo.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.signinButton} onPress={gotoLogin}>
            <Text style={styles.signinButtonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={gotoSignup}>
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    width: '100%',
    flexDirection: 'column',
  },
  socialButtonList: {
    flex: 1, 
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 150,
  },
  socialButtonIcon: {
    paddingVertical: 16, 
    paddingHorizontal: 32, 
    borderColor: '#0D151C', 
    borderWidth: 1, 
    borderStyle: "solid", 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 56, 
    width: 93
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'transparent',
    paddingTop: 100,
    paddingLeft: 32,
    paddingRight: 32,
  },
  iconView: {
    width: '100%',
    height: 100,
    borderRadius: 20,
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signinButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderRadius: 14,
    width: '100%',
    marginTop: 'auto',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFF',
  },
  signinButtonModal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D151C',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderRadius: 8,
    width: '100%',
    marginTop: 70,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFF',
  },
  signupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderRadius: 14,
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FFF',
    marginBottom: 70,
  },
  logo_img: {
    height: '45%',
    width: '45%',
    top: 0,
  },
  socialButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
  },
  signinButtonText: {
    paddingHorizontal: 20,
    color: '#FFF',
  },
  socialButton: {
    borderColor: 'black',
    padding: 30,
  },
  signinText: {
    marginTop: 40,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    color: '#FFF',
  },
  signupButtonText: {
    paddingHorizontal: 20,
    color: '#0D151C',
  },
  headerContainer: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  slideContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    padding: 0,
  },
  textContainer: {
    width: '85%',
    textAlign: 'left',
  },
  slideImage: {
    width: '80%',
    height: '90%',
  },
  title: {
    marginTop: 20,
    color: '#FFF',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    marginTop: 30,
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'rgba(17, 17, 17, 0.4)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitle: {
    color: '#111',
    fontSize: 18,
    lineHeight: 40,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  fieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 24,
    width: '100%',
  },
  fieldLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '800',
    paddingBottom: 5,
  },
  fieldInput: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderBottomColor: '#D4D4D4',
    fontSize: 16,
    padding: 10,
    color: '#D4D4D4',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
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
});

//make this component available to the app
export default WelcomeScreen;
