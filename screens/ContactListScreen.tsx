import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import { clearContactState, getContactList, getFavoriteContactList, getFilteredContactList, setContactInfo } from '../actions/giftAppAction';
import { Contact, IRootState } from '../reducers';
import { setGiftInfo } from '../actions/giftAppAction';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/EvilIcons';

interface IContactListScreenProps {
  navigation: NavigationProp<any>;
}

const ContactListScreen: React.FC<IContactListScreenProps> = (props) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    props.navigation.goBack();
  };

  const gotoSendMoneyScreen = (contact: Contact) => {
    dispatch(setGiftInfo({
      gift_contact: contact,
    }));
    props.navigation.navigate('SendMoneyScreen');
  };

  const gotoEditContactScreen = (contact: Contact) => {
    dispatch(setContactInfo(contact));
    props.navigation.navigate('EditContactScreen');
  };

  useEffect(() => {
    dispatch(clearContactState());
    dispatch(getContactList())
    dispatch(getFavoriteContactList())
  }, [])

  const gotoNewContact = () => {
    props.navigation.navigate('AddNewContactScreen');
  };

  const handleSearchChange = (value: string) => {
    dispatch(getFilteredContactList(value))
  }

  const { contactList, favoriteList } = useSelector((state: IRootState) => state.giftApp)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable  onPress={closeModal}>
          <Image
            source={require("../assets/images/close.png")}
            style={styles.iconCloseImage}
            resizeMode="cover"
          />
        </Pressable>
        <View style={styles.fieldWrapper}>
            <Icon2 style={styles.iconStyle1} name="search" size={20} color="#000" />
            <TextInput
                style={styles.fieldInput}
                placeholder="Search contact"
                onChangeText={(text) => handleSearchChange(text)}
            />
        </View>
      </View>
        
      {
        contactList.length > 0 ? (
          <>
            <View style={styles.buttonContainer}>
              <View style={styles.newContactContainer}>
                <Pressable style={styles.newContactButtonBlank} onPress={gotoNewContact}>
                  <Image
                    source={require("../assets/images/plus-circle-white.png")}
                    style={styles.iconImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.buttonTitleInfoBlank}>
                    Add New Contact
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.favoritesContainer}>
              <Text style={styles.favoriteTitleInfo}>
                Favorites
              </Text>
              <ScrollView style={styles.favoriteInfoListContainer} horizontal>
              {
                favoriteList.map((favorite, index) => {
                  return (
                    <Pressable onPress={() => gotoSendMoneyScreen(favorite)} key={index}>
                      <View style={styles.favoriteInfoContainer}>
                        <View style={styles.photoInfoContainer}>
                          <Text style={styles.photoInfo}>
                            IE
                          </Text>
                        </View>
                        <View style={styles.favoriteFullNameInfoContainer}>
                          <Text style={styles.fullNameInfo}>
                            {favorite.first_name}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  )
                })
              }
              </ScrollView>
            </View>
            <ScrollView style={styles.mainContainer}>
              <View
                style={styles.movementsContainer}
              >
                <View style={styles.movementListContainer}>
                  <Text style={styles.dateInfo}>
                    Contacts
                  </Text>
                  {
                    contactList.map((contact, index) => {
                      return (
                        <View style={styles.eventInfoContainer} key={index}>
                          <Pressable style={styles.nameInfoContainer} onPress={() => gotoSendMoneyScreen(contact)} >
                            <Text style={styles.nameInfo}>
                              IE
                            </Text>
                          </Pressable>
                          <Pressable style={styles.fullNameInfoContainer} onPress={() => gotoSendMoneyScreen(contact)}>
                            <Text style={styles.fullNameInfo}>
                              {contact.first_name} {contact.last_name}
                            </Text>
                            <Text style={styles.emailInfo}>
                              {contact.email}
                            </Text>
                          </Pressable>
                          <Pressable style={styles.editIconContainer} onPress={() => gotoEditContactScreen(contact)}>
                            <Icon1 style={styles.iconStyle} name="dots-three-vertical" size={20} color="#000" />
                          </Pressable>
                        </View>
                      )
                    })
                  }
                  
                </View>
              </View>
            </ScrollView>
          </>
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <View style={styles.newContactContainerSingle}>
                <Pressable style={styles.newContactButtonBlank} onPress={gotoNewContact}>
                  <Image
                    source={require("../assets/images/plus-circle-white.png")}
                    style={styles.iconImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.buttonTitleInfoBlank}>
                    Add New Contact
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.blankContainer}>
              {/* <Image
                  source={require("../assets/images/address_book.png")}
                  style={{width: 90, height: 90}}
                  resizeMode="cover"
              /> */}
              <Text style={styles.blankText}>Your contacts will be shown here</Text>
            </View>
          </>
        )
      }
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 30,
    maxHeight: '95%',
    marginTop: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  textContainer: {
    width: '85%',
    textAlign: 'left'
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  movementListContainer: {
    width: '100%',
    paddingTop: 20
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30
  },
  buttonTitleInfo: {
    fontSize: 14,
    color: '#7B61FF',
    fontWeight: '600'
  },
  buttonTitleInfoBlank: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 10
  },
  newContactContainer: {
    width: '100%',
  },
  newContactContainerSingle: {
    width: '100%',
    paddingRight: 10
  },
  newContactButton: {
    backgroundColor: 'rgba(123, 97, 255, 0.3)',
    borderRadius: 10,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },
  newContactButtonBlank: {
    backgroundColor: '#7B61FF',
    borderRadius: 10,
    height: 90,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scanQrButton: {
    backgroundColor: 'rgba(123, 97, 255, 0.3)',
    borderRadius: 10,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanQrContainer: {
    width: '50%',
    paddingLeft: 10
  },
  headerTitleInfo: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: 20,
    marginTop: 60
  },
  headerPriceInfo: {
    fontSize: 60,
    color: '#FFF',
    marginLeft: 20,
    marginTop: 24
  },
  mainContainer: {
    width: '100%',
  },
  favoritesContainer: {
    height: 100,
    width: '100%',
    overflow: "hidden",
    marginTop: 20
  },
  eventsContainer: {
    width: '100%',
    overflow: "hidden"
  },
  movementsContainer: {
    width: '100%',
    overflow: "hidden"
  },
  favoriteInfoListContainer: {
    width: '100%',
    display: "flex",
    flexDirection: 'row',
  },
  image: {
    width: "100%",
    height: "100%"
  },
  eventImage: {
    width: "100%",
    height: "100%"
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 20,
    marginTop: 30
  },
  title: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    fontWeight: '600',
    justifyContent: 'flex-start',
  },
  dateInfo: {
    fontSize: 16,
    color: '#111111',
    fontStyle: 'normal',
    fontWeight: '600'
  },
  favoriteTitleInfo: {
    fontSize: 16,
    color: '#111111',
    fontStyle: 'normal',
    fontWeight: '600',
    paddingBottom: 10
  },
  helpText: {
    fontSize: 16,
  },
  iconImage: {
    width: 30,
    height: 30
  },
  iconCloseImage: {
    width: 30,
    height: 30,
    marginTop: 5
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
  signinButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
    color: "#FFF"
  },
  fieldWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 10
  },
  fieldCheckboxWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: 5,
    marginLeft: 10,
    paddingRight: 30
  },
  iconStyle: {
    padding: 10
  },
  iconStyle1: {
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
  slideContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    padding: 0
  },
  slideImage: {
    width: '80%',
    height: '90%',
  },
  eventImageContainer: {
    height: 280,
    overflow: 'hidden'
  },
  eventInfoContainer: {
    height: 70,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D8D8D8',
  },
  favoriteInfoContainer: {
    height: 32,
    width: 80,
  },
  nameInfoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(123, 97, 255, 0.3)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoInfoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(123, 97, 255, 0.3)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteFullNameInfoContainer: {
    width: 80,
    textAlign: 'center'
  },
  fullNameInfoContainer: {
    width: '60%',
    paddingLeft: 12
  },
  fullNameInfo: {
    fontSize: 14,
    color: '#111',
  },
  nameInfo: {
    fontSize: 12,
    color: '#7B61FF',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  photoInfo: {
    fontSize: 12,
    color: '#7B61FF',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  emailInfo: {
    fontSize: 12,
    color: '#111',
    opacity: 0.5
  },
  editIconContainer: {
    marginLeft: 'auto'
  },
  priceInfo: {
    fontSize: 18,
    color: '#111'
  },
  blankContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80
  },
  blankText: {
      color: 'rgba(17, 17, 17, 0.4)',
      marginTop: '50%',
      fontSize: 14
  }

});

export default ContactListScreen;
