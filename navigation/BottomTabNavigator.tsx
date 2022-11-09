import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import { BottomTabParamList } from '../types';
import { IRootState } from '../reducers';
import { Image, Text, View } from 'react-native';

import ContactListScreen from '../screens/ContactListScreen';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import SelectCategoryScreen from '../screens/SelectCategoryScreen';
import SelectTemplateScreen from '../screens/SelectTemplateScreen';
import MessageScreen from '../screens/MessageScreen';
import PreviewGiftScreen from '../screens/PreviewGiftScreen';
import ResumePaymentScreen from '../screens/ResumePaymentScreen';
import FinishSendingGiftScreen from '../screens/FinishSendingGiftScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ThanksScreen from '../screens/ThanksScreen';
import AddNewContactScreen from '../screens/AddNewContactScreen';
import EditContactScreen from '../screens/EditContactScreen';
import ReceivedGiftScreen from '../screens/ReceivedGiftScreen';
import EventListScreen from '../screens/EventListScreen';
import AddNewEventScreen from '../screens/AddNewEventScreen';
import ThanksEventScreen from '../screens/ThanksEventScreen';
import InviteMembersScreen from '../screens/InviteMembersScreen';
import CalendarScreen from '../screens/CalendarScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import NotificationScreen from '../screens/NotificationScreen';
import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import FaqScreen from '../screens/FaqScreen';
import StripeAccountScreen from '../screens/StripeAccountScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import AddPaymentScreen from '../screens/AddPaymentScreen';
import PaymentMethodDetailScreen from '../screens/PaymentMethodDetailScreen';
import TransactionScreen from '../screens/TransactionScreen';
import FinalPaymentScreen from '../screens/FinalPaymentScreen';
import TutorialFirstScreen from '../screens/TutorialFirstScreen';
import TutorialSecondScreen from '../screens/TutorialSecondScreen';
import TutorialThirdScreen from '../screens/TutorialThirdScreen';
import QRCodeScreen from '../screens/QRCodeScreen';
import EventQRCodeScreen from '../screens/EventQRCodeScreen';


const HomeStackNavigator: React.FC = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStackNavigator: React.FC = () => {
  const ProfileStack = createStackNavigator();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
        animationEnabled: true,
      }}
      mode='modal'
      headerMode='none'
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false
        }}
      />
      <ProfileStack.Screen
        name="PersonalInfo"
        component={PersonalInfoScreen}
      />
      <ProfileStack.Screen
        name="Notification"
        component={NotificationScreen}
      />
      <ProfileStack.Screen
        name="TermsAndCondition"
        component={TermsAndConditionScreen}
      />
      <ProfileStack.Screen
        name="ContactUs"
        component={ContactUsScreen}
      />
      <ProfileStack.Screen
        name="Faq"
        component={FaqScreen}
      />
      <ProfileStack.Screen
        name="StripeAccount"
        component={StripeAccountScreen}
      />
      <ProfileStack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen}
      />
      <ProfileStack.Screen
        name="TutorialFirst"
        component={TutorialFirstScreen}
      />
      <ProfileStack.Screen
        name="TutorialSecond"
        component={TutorialSecondScreen}
      />
      <ProfileStack.Screen
        name="TutorialThird"
        component={TutorialThirdScreen}
      />
      <ProfileStack.Screen
        name="AddPayment"
        component={AddPaymentScreen}
      />
      <ProfileStack.Screen
        name="PaymentMethodDetail"
        component={PaymentMethodDetailScreen}
      />
    </ProfileStack.Navigator>
  );
};

const GiftStackNavigator: React.FC = () => {
  const GiftStack = createStackNavigator();
  return (
    <GiftStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
        animationEnabled: true,
      }}
      mode='modal'
      headerMode='none'
    >
      <GiftStack.Screen
        name="ReceivedGift"
        component={ReceivedGiftScreen}
      />
    </GiftStack.Navigator>
  );
};

const EventStackNavigator: React.FC = () => {
  const EventStack = createStackNavigator();
  return (
    <EventStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
        animationEnabled: true,
      }}
      mode='modal'
      headerMode='none'
    >
      <EventStack.Screen
        name="EventList"
        component={EventListScreen}
      />
    </EventStack.Navigator>
  );
};

const CreateEventStackNavigator: React.FC = () => {
  const CreateEventStack = createStackNavigator();
  return (
    <CreateEventStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
        animationEnabled: true,
      }}
      mode='modal'
      headerMode='none'
    >
      <CreateEventStack.Screen
        name="AddNewEventScreen"
        component={AddNewEventScreen}
      />
      <CreateEventStack.Screen
        name="InviteMembersScreen"
        component={InviteMembersScreen}
      />
      <CreateEventStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
      />
      <CreateEventStack.Screen
        name="ThanksEventScreen"
        component={ThanksEventScreen}
      />
      <CreateEventStack.Screen
        name="QRCodeScreen"
        component={QRCodeScreen}
      />
    </CreateEventStack.Navigator>
  );
};

const AddEventStackNavigator: React.FC = () => {
  const AddEventStack = createStackNavigator();
  return (
    <AddEventStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
        animationEnabled: true,
      }}
      mode='modal'
      headerMode='none'
    >
      <AddEventStack.Screen
        name="ContactListScreen"
        component={ContactListScreen}
      />
      <AddEventStack.Screen
        name="AddNewContactScreen"
        component={AddNewContactScreen}
      />
      <AddEventStack.Screen
        name="EditContactScreen"
        component={EditContactScreen}
      />
      <AddEventStack.Screen
        name="SendMoneyScreen"
        component={SendMoneyScreen}
      />
      <AddEventStack.Screen
        name="SelectCategoryScreen"
        component={SelectCategoryScreen}
      />
      <AddEventStack.Screen
        name="SelectTemplateScreen"
        component={SelectTemplateScreen}
      />
      <AddEventStack.Screen
        name="MessageScreen"
        component={MessageScreen}
      />
      <AddEventStack.Screen
        name="PreviewGiftScreen"
        component={PreviewGiftScreen}
      />
      <AddEventStack.Screen
        name="ResumePaymentScreen"
        component={ResumePaymentScreen}
      />
      <AddEventStack.Screen
        name="FinishSendingGiftScreen"
        component={FinishSendingGiftScreen}
      />
      <AddEventStack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
      />
      <AddEventStack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
      />
      <AddEventStack.Screen
        name="FinalPaymentScreen"
        component={FinalPaymentScreen}
      />
      <AddEventStack.Screen
        name="ThanksScreen"
        component={ThanksScreen}
      />
    </AddEventStack.Navigator>
  )
}

const DetailEventStackNavigator: React.FC = () => {
  const DetailEventStack = createStackNavigator();
  return (
    <DetailEventStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
        animationEnabled: true,
      }}
      mode='modal'
      headerMode='none'
    >
      <DetailEventStack.Screen
        name="EventDetailScreen"
        component={EventDetailScreen}
      />
      <DetailEventStack.Screen
        name="EventQRCodeScreen"
        component={EventQRCodeScreen}
      />
    </DetailEventStack.Navigator>
  )
}

const BottomTabNavigator: React.FC = () => {
  const BottomStack = createBottomTabNavigator<BottomTabParamList>();

  const equityData = useSelector((state: IRootState) => state.equity);

  return (
    <BottomStack.Navigator initialRouteName="Home" tabBarOptions={{
      showLabel: false,
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    >
      <BottomStack.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/home.png')}
              style={{ width: 24, height: 24, tintColor: '#111111' }}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name="Calendar"
        component={EventStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/calendar.png')}
              style={{ width: 24, height: 24, tintColor: '#111111' }}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name="PlusIcon"
        component={AddEventStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddEventScreen')
            //=> navigation.navigate('Search', { screen: 'Search' }); This works but the shared element transition gets jumpy
            //=> navigation.popToTop(); This works but the next time you click it, it fails because there is no screen in the stack to pop up to.
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                height: 58,
                width: 58,
                borderRadius: 21,
                backgroundColor: '#5a95ff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/images/plus.png')}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: '#f1f6f9',
                  alignContent: 'center',
                }}
              />
            </View>
          ),
          unmountOnBlur: true
        }}
      />
      <BottomStack.Screen
        name="Gift"
        component={GiftStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/gift.png')}
              style={{ width: 24, height: 24, tintColor: '#111111' }}
            />
          ),
        }}
      />
      <BottomStack.Screen
        name="Person"
        component={ProfileStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('ProfileScreen')
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/images/person.png')}
              style={{ width: 24, height: 24, tintColor: '#111111' }}
            />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

const RootNavigator: React.FC = () => {
  const RootStack = createStackNavigator()
  return (
    <RootStack.Navigator
      headerMode='none'
    >
      <RootStack.Screen
        name='BottomNav'
        component={BottomTabNavigator}
      />
      <RootStack.Screen
        name='AddEventScreen'
        component={AddEventStackNavigator}
      />
      <RootStack.Screen
        name='ProfileScreen'
        component={ProfileStackNavigator}
      />
      <RootStack.Screen
        name='CreateEventScreen'
        component={CreateEventStackNavigator}
      />
      <RootStack.Screen
        name='EventDetailScreen'
        component={DetailEventStackNavigator}
      />
    </RootStack.Navigator>
  )
}

export default RootNavigator;
