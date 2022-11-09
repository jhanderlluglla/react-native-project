import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import { addGift } from '../actions/giftAppAction';


interface IResumePaymentScreenProps {
    navigation: NavigationProp<any>;
}

const ResumePaymentScreen: React.FC<IResumePaymentScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { giftInfo, newGiftId } = useSelector((state: IRootState) => state.giftApp)

    console.log(giftInfo);
    
    // console.log('==========giftInfo=================');
    // console.log(giftInfo.gift_category.id);
    // console.log(giftInfo.gift_picture.id);
    // console.log(giftInfo.gift_color.id);
    // console.log(giftInfo.gift_primary_font.id);
    // console.log(giftInfo.gift_secondary_font.id);
    // console.log(giftInfo.amount);    
    // console.log(giftInfo.message);
    // console.log(giftInfo.gift_contact.id);
    // console.log('=============newGiftId===============');
    // console.log(newGiftId);

    const closeModal = () => {
        props.navigation.goBack();
    };

    const gotoNextScreen = () => {
        if (giftInfo && giftInfo.gift_primary_font && giftInfo.gift_secondary_font) {
            dispatch(addGift(
                giftInfo.gift_category.id, 
                giftInfo.gift_picture.id, 
                giftInfo.gift_color.id, 
                giftInfo.gift_primary_font.id,
                giftInfo.gift_secondary_font.id,
                giftInfo.amount,
                giftInfo.gift_contact.id,
                giftInfo.message
            ));
        }
        
        props.navigation.navigate('TransactionScreen');
    };

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer} >
                <Pressable onPress={closeModal}>
                    <Image
                        source={require("../assets/images/close.png")}
                        style={styles.iconImage}
                        resizeMode="cover"
                    />
                </Pressable>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>REVIEW</Text>
                </View>
            </View>
            <View style={styles.BlockContainer}>
                <View style={styles.imageContentContainer}>
                    <Image
                        source={require("../assets/images/sample-image1.png")}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.textContentContainer}>
                    <Text style={styles.contactTextInfo}>{giftInfo.gift_category.description}</Text>
                    <Text style={styles.normalTextInfo}>To: {giftInfo.gift_contact.first_name} {giftInfo.gift_contact.last_name}</Text>
                </View>
                <Text style={styles.priceInfo}>${giftInfo.amount}</Text>
            </View>
            <View style={styles.subTotalContainer}>
                <Text style={styles.title}>Subtotal</Text>
                <Text style={styles.value}>${giftInfo.amount}</Text>
            </View>
            <View style={styles.feeContainer}>
                <Text style={styles.title}>Fee</Text>
                <Text style={styles.value}>$5</Text>
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.boldTextInfo}>Total</Text>
                <Text style={[styles.priceInfo, {marginLeft: 'auto'}]}>${giftInfo.amount + 5}</Text>
            </View>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={gotoNextScreen}>
                    <Text style={styles.sendButtonText}>Send now</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 180,
        height: '92%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerTitleContainer: {
        width: 220,
        height: 30,
        textAlign: 'center',
        justifyContent: 'center',
        marginLeft: 100
    },
    messageContentContainer: {        
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30  
    },
    BlockContainer: {        
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30 ,
        marginTop: 24,    
        height: 90,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    subTotalContainer: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30 ,
        marginTop: 24,    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    feeContainer: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30 ,
        marginTop: 24,    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    totalContainer: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30 ,
        marginTop: 24,    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 50
    },
    title: {
        color: '#111111',
        fontSize: 14,
        fontWeight: '500',
    },
    value: {
        color: '#111111',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 'auto'
    },
    priceInfo: {
        fontSize: 20,
        fontFamily: 'WorkSans-Medium',
        color: '#111111',
        fontWeight: '600',
        marginLeft: 'auto'
    },
    imageText: {
        color: '#FFF',
        fontSize: 50,
        fontWeight: 'normal',
        marginTop: -90,
        textAlign: 'center',
        fontFamily: 'Italianno-Regular',
    },
    italicText: {
        color: '#111111',
        fontSize: 34,   
        fontFamily: 'Italianno-Regular',
        textAlign: 'center'     
    },
    description: {
        color: '#111111',
        fontSize: 14,   
        fontFamily: 'Merriweather-Light',
        textAlign: 'center'     
    },
    imageContentContainer: {
        width: 70,
        height: 70,        
    },
    textContentContainer: {
        padding: 15
    },
    boldTextInfo: {
        fontSize: 14,
        color: '#111',
        fontWeight: '500'
    },
    contactTextInfo: {
        fontSize: 14,
        color: '#111',
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    normalTextInfo: {
        fontSize: 12,
        color: '#111',
        fontWeight: '400'
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
        paddingLeft: 0
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        left: '50%',
        transform: [{
            translateX: -180
        }],
        margin: 0,
        backgroundColor: 'transparent'
    },
    image: {
        width: '100%',
    },
    iconImage: {
        width: 30,
        height: 30
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

export default ResumePaymentScreen;
