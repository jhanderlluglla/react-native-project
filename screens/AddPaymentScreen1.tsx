import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { addPaymentMethods, clearPaymentMethodState, generateToken, getMyProfile } from '../actions/giftAppAction';
import { useFonts } from 'expo-font';
import { CreditCardInput } from "react-native-vertical-input-credit-card";
import { ScrollView } from 'react-native-gesture-handler';
import { IRootState } from '../reducers';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30
    },
    mainScrollContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        marginTop: -24,
    },
    AboveWrapper: {
        width: '100%',
        height: 120,
        backgroundColor: '#7B61FF',
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 50,
        backgroundColor: '#7B61FF',
    },
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
    },
    successMessageAlert: {
        fontSize: 10,
        color: '#7B61FF',
        fontStyle: 'italic',
        paddingTop: 4,
        paddingBottom: 4,
        textAlign: 'center'
    },
    textLinkStyle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    mainTitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600',
        paddingTop: 8,
        textTransform: 'uppercase',
        justifyContent: 'center'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: 50,
        backgroundColor: 'transparent'
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
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 30,
        width: '100%'
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
        paddingLeft: 10,
    },
    iconStyle: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },
});

interface IAddPayment1ScreenProps {
    navigation: NavigationProp<any>;
}

const AddPayment1Screen: React.FC<IAddPayment1ScreenProps> = (props) => {
    const dispatch = useDispatch();
    
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

    const { cardToken, isPaymentTokenGeneratedSuccess, isAddingPaymentMethodSuccess } = useSelector((state: IRootState) => state.giftApp)

    const [cardNumber, setCardNumber] = React.useState('');
    const [expMonth, setExpMonth] = React.useState('');
    const [expYear, setExpYear] = React.useState('');
    const [cvc, setCVC] = React.useState('');

    const [validationSuccessMessage, setValidationSuccessMessage] = React.useState('');

    const goBack = () => {
        navigation.navigate('PaymentMethod');
    };

    const setCardValues = (cardInfo: any) => {
        const cardValues = cardInfo.values;
        const expiryInfo = cardValues.expiry;
        const expMonthInfo = expiryInfo.split('/')[0];
        const expYearInfo = '20' + expiryInfo.split('/')[1];
        if (cardInfo.valid) {
            setExpMonth(expMonthInfo);
            setExpYear(expYearInfo);
            setCVC(cardValues.cvc);
            setCardNumber(cardValues.number.replaceAll(' ', ''));
        } 
    };

    const save = () => {
        dispatch(generateToken(cardNumber, expMonth, expYear, cvc));
    };

    useEffect(() => {
        if (isAddingPaymentMethodSuccess) {
            setValidationSuccessMessage('The new payment method has been created successfully.')
            setCardNumber('');
            setExpMonth('');
            setExpYear('');
            setCVC('');
            dispatch(clearPaymentMethodState())
            navigation.navigate('TutorialFirst');
        }
    }, [isAddingPaymentMethodSuccess])

    useEffect(() => {
        if (isPaymentTokenGeneratedSuccess) {
            dispatch(addPaymentMethods(cardToken));
        }
    }, [isPaymentTokenGeneratedSuccess])

    return (
        <View
            style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        >
            <View style={styles.AboveWrapper}>
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon3 name="arrowleft" size={25} color="#FFF" />
                    </Pressable>
                    <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]} >
                        Add Payment method
                    </Text>
                    <Pressable style={styles.textLinkWrapper}>
                    </Pressable>
                </View>
            </View>
            <ScrollView style={styles.mainScrollContainer}>
                {fontsLoaded && (
                    <View style={styles.mainContainer}>
                        <View style={styles.fieldWrapper}>
                            <TextInput
                            style={styles.fieldInput}
                            placeholder="Enter card number"
                            onChangeText={(text) => setCardNumber(text)}
                            autoFocus
                            />
                        </View>
                        <View style={styles.fieldWrapper}>
                            <TextInput
                            style={styles.fieldInput}
                            placeholder="Expiration Month"
                            onChangeText={(text) => setExpMonth(text)}
                            autoFocus
                            />
                        </View>
                        <View style={styles.fieldWrapper}>
                            <TextInput
                            style={styles.fieldInput}
                            placeholder="Expiration Year"
                            onChangeText={(text) => setExpYear(text)}
                            autoFocus
                            />
                        </View>
                        <View style={styles.fieldWrapper}>
                            <TextInput
                            style={styles.fieldInput}
                            placeholder="CVC"
                            onChangeText={(text) => setCVC(text)}
                            autoFocus
                            />
                        </View>
                    </View>
                )}
            </ScrollView>

            {isAddingPaymentMethodSuccess && cardToken !== '' && (
                <Text style={styles.successMessageAlert}>
                    {validationSuccessMessage}
                </Text>
            )}

            <View style={styles.buttonContainer}>
                <Pressable style={styles.sendButton} onPress={save}>
                    <Text style={styles.sendButtonText}>Save</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default AddPayment1Screen;


