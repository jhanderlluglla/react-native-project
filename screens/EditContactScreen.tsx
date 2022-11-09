import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput, Switch, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import { addContact, updateContact } from '../actions/giftAppAction';
import { IRootState } from '../reducers';


interface IEditContactScreenProps {
    navigation: NavigationProp<any>;
}

const EditContactScreen: React.FC<IEditContactScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { contactInfo } = useSelector((state: IRootState) => state.giftApp);

    const [contactId, setContactId] = React.useState(contactInfo.id);
    const [firstName, setFirstName] = React.useState(contactInfo.first_name);
    const [lastName, setLastName] = React.useState(contactInfo.last_name);
    const [email, setEmail] = React.useState(contactInfo.email);
    const [phone, setPhone] = React.useState(contactInfo.phone);
    const [isFavourite, setIsFavourite] = React.useState(false);
   
    

    React.useEffect(() => {
        if (contactInfo) {
            setContactId(contactInfo.id);
            setFirstName(contactInfo.first_name);
            setLastName(contactInfo.last_name);
            setEmail(contactInfo.email);
            setPhone(contactInfo.phone);   
            if (contactInfo.is_favourite == "1") {
                setIsFavourite(true);
            }         
        }
    }, [contactInfo])

    const toggleSwitch = () => setIsFavourite(previousState => !previousState);


    const closeModal = () => {
        props.navigation.goBack();
    };

    const [validationError, setValidationError] = React.useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

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
            dispatch(updateContact(contactId, firstName, lastName, email, phone, isFavourite));
            props.navigation.navigate('ContactListScreen');
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
                            <Text style={styles.headerTitle}>Edit contact</Text>
                        </View>
                    </View>
                    <View style={styles.mainContainer}>
                        <View style={styles.fieldWrapper}>
                            <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Enter your first name"
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                            />
                        </View>
                        <View style={styles.fieldWrapper}>
                            <Icon2 style={styles.iconStyle} name="person-outline" size={20} color="#000" />
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Enter your last name"
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                            />
                        </View>
                        <View style={styles.fieldWrapper}>
                            <Icon3 style={styles.iconStyle} name="mail" size={20} color="#000" />
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <View style={styles.fieldWrapper}>
                            <Icon4 style={styles.iconStyle} name="phone" size={20} color="#000" />
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Enter your phone"
                                value={phone}
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
                            <Text style={styles.sendButtonText}>Save</Text>
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
        paddingLeft: 10,
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 20
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

export default EditContactScreen;
