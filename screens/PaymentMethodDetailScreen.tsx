import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import { clearPaymentMethodState, deletePaymentMethod } from '../actions/giftAppAction';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        height: '70%',
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
    infoLinkContainer: {
        width: '100%',
        paddingLeft: 24,
        paddingRight: 24,
        marginTop: 15
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    titleInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 3,
    },
    valueInfo: {
        fontSize: 14,
        color: '#111',
        textAlign: 'left',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 5,
        paddingLeft: 15,
        opacity: 0.5
    },
});

interface IPaymentMethodDetailScreenProps {
    navigation: NavigationProp<any>;
}

const PaymentMethodDetailScreen: React.FC<IPaymentMethodDetailScreenProps> = (props) => {
    const dispatch = useDispatch();
    
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

    const goBack = () => {
        navigation.goBack();
    };

    const { selectedPaymentMethod, isDeletePaymentMethodSuccess } = useSelector((state: IRootState) => state.giftApp)

    const removePaymentMethod = () => {
        dispatch(deletePaymentMethod(selectedPaymentMethod.stripe_card_id))        
    };

    useEffect(() => {
        console.log(isDeletePaymentMethodSuccess);
        if (isDeletePaymentMethodSuccess) {
            dispatch(clearPaymentMethodState())
            navigation.navigate('PaymentMethod');
        }
    }, [isDeletePaymentMethodSuccess])


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
                        VISA {selectedPaymentMethod.last4}
                    </Text>
                    <Pressable style={styles.textLinkWrapper}>
                    </Pressable>
                </View>
            </View>
            {fontsLoaded && (
                <View style={styles.mainContainer}>
                    <View style={styles.infoLinkContainer}>
                        <View style={styles.infoWrapper}>
                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                Credit card information
                            </Text>
                        </View>
                        <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                            **** **** **** {selectedPaymentMethod.last4}
                        </Text>
                    </View>
                    <View style={styles.infoLinkContainer}>
                        <View style={styles.infoWrapper}>
                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                Brand
                            </Text>
                        </View>
                        <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                            {selectedPaymentMethod.brand}
                        </Text>
                    </View>
                    <View style={styles.infoLinkContainer}>
                        <View style={styles.infoWrapper}>
                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                Country
                            </Text>
                        </View>
                        <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                            {selectedPaymentMethod.country}
                        </Text>
                    </View>
                    <View style={styles.infoLinkContainer}>
                        <View style={styles.infoWrapper}>
                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                Expiration Year
                            </Text>
                        </View>
                        <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                            {selectedPaymentMethod.exp_year}
                        </Text>
                    </View>
                    <View style={styles.infoLinkContainer}>
                        <View style={styles.infoWrapper}>
                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                Expiration Month
                            </Text>
                        </View>
                        <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                            {selectedPaymentMethod.exp_month}
                        </Text>
                    </View>
                    <View style={styles.infoLinkContainer}>
                        <View style={styles.infoWrapper}>
                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                Funding
                            </Text>
                        </View>
                        <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                            {selectedPaymentMethod.funding}
                        </Text>
                    </View>
                    <View style={styles.infoLinkContainer}>
                        <View style={styles.infoWrapper}>
                            <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                Stripe card id
                            </Text>
                        </View>
                        <Text style={[styles.valueInfo, { fontFamily: 'Work-Sans' }]} >
                            {selectedPaymentMethod.stripe_card_id}
                        </Text>
                    </View>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Pressable style={styles.sendButton} onPress={removePaymentMethod}>
                    <Text style={styles.sendButtonText}>Remove</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default PaymentMethodDetailScreen;


