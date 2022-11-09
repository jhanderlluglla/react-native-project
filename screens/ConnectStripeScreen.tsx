//import liraries
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { goStripeAccessLink } from '../actions/authActions';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { IRootState } from '../reducers';

interface IConnectStripeScreenProps {
  navigation: NavigationProp<any>;
}

const ConnectStripeScreen: React.FC<IConnectStripeScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const { tokenInfo, stripeUrl, userInfo } = useSelector((state: IRootState) => state.auth);

  React.useEffect(() => {
    if (stripeUrl) {
      Linking.openURL(stripeUrl);     
      navigation.navigate('AppReadMeScreen') 
    }
  }, [stripeUrl]);

  const setupStripeAccount = () => {
    dispatch(goStripeAccessLink(userInfo.access_token));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/StripeBk4.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Connect Stripe to send and receive payments
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={styles.notificationWrapper}>
          <Image
              source={require("../assets/images/checkmark.png")}
              style={styles.iconNotificationStyle}
              resizeMode="cover"
          />
          <View style={styles.notificationContentWrapper}>
            <Text style={styles.notificationTitle}>Secure</Text>
            <Text style={styles.description}>Transfer of your bank data</Text>
          </View>
        </View>
        <View style={styles.notificationWrapper}>
          <Image
              source={require("../assets/images/checkmark.png")}
              style={styles.iconNotificationStyle}
              resizeMode="cover"
          />
          <View style={styles.notificationContentWrapper}>
            <Text style={styles.notificationTitle}>Private</Text>
            <Text style={styles.description}>
              This application will never be able to access your credentials
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.warningWrapper}>
        <Text style={styles.warningContent}>
          By selecting “Continue” you agree to the
        </Text>
        <View style={styles.warningBottomWrapper}>
          <Text style={styles.warningContent}>Stripe</Text>
          <Text style={styles.warningBlueContent}>End User Privacy Policy</Text>
          <Text style={styles.warningContent}>and</Text>
          <Text style={styles.warningBlueContent}>SMS terms</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={setupStripeAccount}
      >
        <Text style={styles.signinButtonText}>Next step: Set up stripe</Text>
      </TouchableOpacity>
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
  greenButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CAF4D',
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderRadius: 999,
    width: '100%',
    marginTop: 40,
  },
  signinButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7B61FF',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderRadius: 14,
    width: '85%',
    marginTop: 20,
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
    width: '85%',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#7B61FF',
  },
  socialButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
  },
  signinButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#FFF',
  },
  signupButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#7B61FF',
  },
  headerContainer: {
    height: '45%',
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
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
    color: '#111',
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    marginTop: 10,
    color: '#111',
    fontSize: 14,
    fontWeight: 'normal',
  },
  notificationWrapper: {
    display: 'flex',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 40,
  },
  notificationContentWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  iconNotificationStyle: {
    paddingRight: 5,
  },
  notificationTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  warningWrapper: {
    width: '100%',
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 40,
  },
  warningBottomWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  warningContent: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  warningBlueContent: {
    color: '#7B61FF',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
});

//make this component available to the app
export default ConnectStripeScreen;
