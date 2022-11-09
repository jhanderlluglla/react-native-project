import * as React from 'react';
import { StyleSheet, Image, Text, Pressable, TextInput, Switch, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import { addContact, setGiftInfo } from '../actions/giftAppAction';
import { IRootState } from '../reducers';
import { useEffect } from 'react';


interface IAddNewContactScreenProps {
    navigation: NavigationProp<any>;
}

const AddNewContactScreen: React.FC<IAddNewContactScreenProps> = (props) => {

    const dispatch = useDispatch();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [isFavourite, setIsFavourite] = React.useState(false);

    const toggleSwitch = () => setIsFavourite(previousState => !previousState);


    const closeModal = () => {
        props.navigation.goBack();
    };

    const [validationError, setValidationError] = React.useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

    const { contactInfo, isAddContactSuccess } = useSelector((state: IRootState) => state.giftApp)

    const validateEmail = (email: string) => {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

    const validatePhone = (phone: string) => {
        let isnum = /^\d+$/.test(phone.substring(1));
        return isnum
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
        if (!phone.startsWith('+')) {
            flag = false;
            setValidationError(true);
        }
        if (phone.length < 10) {
            flag = false;
            setValidationError(true);
        }
        if (!validatePhone(phone)) {
            flag = false;
            setValidationError(true);
        }
        return flag;
    }

    const sendInvite = () => {
        if (validateForm()) {
            dispatch(addContact(firstName, lastName, email, phone, isFavourite));
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
              else if (!validatePhone(phone)) {
                setValidationErrorMessage('Please fill only numbers like +1800999998');
              }
              else {
                setValidationErrorMessage('There are some thing wrong in your input values!');
              }
        }
    };

    useEffect(() => {
        if (contactInfo.id > 0 && isAddContactSuccess) {
            console.log(isAddContactSuccess);
            console.log(contactInfo);
            dispatch(setGiftInfo({
                gift_contact: contactInfo,
            }));
            props.navigation.navigate('SendMoneyScreen');
        }
    }, [contactInfo, isAddContactSuccess])

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    const [message, setMessage] = React.useState('');

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.flex}
        >
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={[styles.scrollContainer]}
                    keyboardShouldPersistTaps='handled'
                >
                    
                        <View style={styles.headerContainer} >
                            <Pressable onPress={closeModal}>
                                <Image
                                    source={require("../assets/images/close.png")}
                                    style={styles.iconImage}
                                    resizeMode="cover"
                                />
                            </Pressable>
                            <View style={styles.headerTitleContainer}>
                                <Text style={styles.headerTitle}>Add new contact</Text>
                            </View>
                        </View>
                        <View style={styles.mainContainer}>
                            <View style={styles.fieldWrapper}>
                                <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
                                <TextInput
                                    style={styles.fieldInput}
                                    placeholder="First name"
                                    onChangeText={(text) => setFirstName(text)}
                                />
                            </View>
                            <View style={styles.fieldWrapper}>
                                <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
                                <TextInput
                                    style={styles.fieldInput}
                                    placeholder="Last name"
                                    onChangeText={(text) => setLastName(text)}
                                />
                            </View>
                            <View style={styles.fieldWrapper}>
                                <Icon3 style={styles.iconStyle} name="mail" size={20} color="#000" />
                                <TextInput
                                    style={styles.fieldInput}
                                    placeholder="Enter Address"
                                    onChangeText={(text) => setEmail(text)}
                                />
                            </View>
                            <View style={styles.fieldWrapper}>
                                <Icon4 style={styles.iconStyle} name="phone" size={20} color="#000" />
                                <TextInput
                                    style={styles.fieldInput}
                                    placeholder="Phone Number"
                                    onChangeText={(text) => setPhone(text)}
                                />
                            </View>
                            <View style={styles.fieldWrapper}>
                                <Text style={{marginRight: 20}}>Favorite</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isFavourite ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isFavourite}
                                />
                            </View>
                            {validationError && (
                                <Text style={styles.errorMessageAlert}>
                                    {validationErrorMessage}
                                </Text>
                            )}
                        </View>
                        
                        <View style={styles.buttonContainer} >
                            <Pressable style={styles.sendButton} onPress={sendInvite}>
                                <Text style={styles.sendButtonText}>ADD</Text>
                            </Pressable>
                        </View>
                
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
       
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 30,
        height: '92%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        textAlign: 'center',
    },
    headerTitleContainer: {
        width: 220,
        height: 50,
        textAlign: 'center',
        paddingTop: 3,        
    },
    headerContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerTitle: {
        color: '#7B61FF',
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 80
    },
    errorMessageAlert: {
        fontSize: 10,
        color: '#cc3300',
        fontStyle: 'italic',
        marginTop: 4,
    },
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 24,
        width: '100%',
    },
    iconStyle: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fieldInput: {
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#2F80ED',
        fontSize: 16,
        color: '#2CAF4D',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 40,
    },
    image: {
        width: '100%',
    },
    iconImage: {
        width: 30,
        height: 30
    },
    fieldCheckboxWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginBottom: 50,
        marginTop: 25,
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
    },
    fieldDescription: {
        fontSize: 14,
        fontWeight: 'normal',
        paddingBottom: 5,
        marginLeft: 10,
        paddingRight: 30,
        marginTop: 5
    },
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF"
    },
    sendButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7B61FF",
        fontSize: 15,
        fontWeight: "700",
        height: 50,
        borderRadius: 14,
        width: 250,
    },
});

export default AddNewContactScreen;
