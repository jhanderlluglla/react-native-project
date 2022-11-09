import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, Modal, ScrollView } from 'react-native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import { getTransactionDetail } from '../actions/giftAppAction';

const TransactionDetailModal = ({
    transactionId,
    visible,
    onHide
}: {
    transactionId: number,
    visible: boolean,
    onHide: () => void
}) => {

    const dispatch = useDispatch();

    const { transactionDetail } = useSelector((state: IRootState) => state.giftApp)

    const closeModal = () => {
        onHide()
    };

    React.useEffect(() => {
        if (transactionId) {
            dispatch(getTransactionDetail(transactionId));
        }
    }, [dispatch, transactionId])
    
    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    return (
        <Modal 
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer} >
                    <Pressable onPress={closeModal}>
                        <Image
                            source={require("../assets/images/close.png")}
                            style={styles.iconImage}
                            resizeMode="cover"
                        />
                    </Pressable>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Transaction Detail</Text>
                    </View>
                </View>
                {
                    fontsLoaded && transactionDetail && transactionDetail.id > 0 && (
                        <>
                            <View style={styles.BlockContainer}>
                                <View style={styles.imageContentContainer}>
                                    <Image
                                        source={require("../assets/images/sample-image1.png")}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                    <Image
                                        source={{
                                            uri: transactionDetail.gift_picture,
                                        }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={styles.textContentContainer}>
                                    <Text style={styles.contactTextInfo}>{transactionDetail.gift_category}</Text>
                                    <Text style={styles.normalTextInfo}>To: {transactionDetail.colleague_name}</Text>
                                </View>
                                {
                                    transactionDetail.amount > 0 ? (
                                        <Text style={styles.priceInfoNeg}>-${transactionDetail.amount}</Text>
                                    ) : (
                                        <Text style={styles.priceInfo}>${transactionDetail.amount}</Text>
                                    )
                                }
                                
                            </View>
                            <View style={styles.imageBlockContainer}>
                                <View style={styles.giftImageContainer}>
                                    <Image
                                        source={{
                                            uri: transactionDetail.gift_picture,
                                        }}
                                        style={styles.giftImage}
                                        resizeMode="cover"
                                    />
                                    <Text style={[styles.giftImageText, { fontFamily: transactionDetail.gift_primary_font, color: transactionDetail.gift_hex_color }]}> {transactionDetail.gift_category} </Text>
                                </View>
                                <View style={styles.giftTextContentContainer}>
                                    <Text style={styles.description}>
                                        {transactionDetail.message}
                                    </Text>
                                    <Text style={[styles.giftPriceInfo, {fontFamily: transactionDetail.gift_primary_font }]}>
                                        ${transactionDetail.amount}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.subTotalContainer}>
                                <Text style={styles.title}>Subtotal</Text>
                                <Text style={styles.value}>${transactionDetail.amount}</Text>
                            </View>
                            <View style={styles.feeContainer}>
                                <Text style={styles.title}>Fee</Text>
                                <Text style={styles.value}>${transactionDetail.application_fee_amount}</Text>
                            </View>
                            <View style={styles.totalContainer}>
                                <Text style={styles.boldTextInfo}>Total</Text>
                                {
                                    transactionDetail.amount > 0 ? (
                                        <Text style={[styles.priceInfoNeg, {marginLeft: 'auto'}]}>-${transactionDetail.amount + transactionDetail.application_fee_amount}</Text>
                                    ) : (
                                        <Text style={[styles.priceInfo, {marginLeft: 'auto'}]}>${transactionDetail.amount + transactionDetail.application_fee_amount}</Text>
                                    )
                                }
                            </View>
                        </>
                    )
                }
                
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 180,
        maxHeight: '95%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 20,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 3, height: 3},
        shadowRadius: 3,
    },
    headerTitleContainer: {
        width: 220,
        height: 30,
        textAlign: 'center',
        paddingTop: 3,
    },
    messageContentContainer: {        
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30  
    },
    imageBlockContainer: {        
        width: '100%',
        marginTop: 24,  
        overflow: 'hidden',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30, 
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 3, height: 3},
        shadowRadius: 3,
        elevation: 3,     
    },
    BlockContainer: {        
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 24,    
        height: 90,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 3, height: 3},
        shadowRadius: 3,
        elevation: 3,
    },
    subTotalContainer: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10 ,
        marginTop: 24,    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    feeContainer: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10 ,
        marginTop: 24,    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    totalContainer: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10 ,
        marginTop: 24,    
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 50
    },
    giftImage: {
        width: '100%', 
        height: 180,       
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
    priceInfoNeg: {
        fontSize: 20,
        fontFamily: 'WorkSans-Medium',
        color: '#FF6C6C',
        fontWeight: '600',
        marginLeft: 'auto'
    },
    giftPriceInfo: {
        fontSize: 60,
        textAlign: 'center',
        color: '#111111',
    },
    imageText: {
        color: '#FFF',
        fontSize: 50,
        fontWeight: 'normal',
        marginTop: -90,
        textAlign: 'center',
        fontFamily: 'Italianno-Regular',
    },
    giftImageText: {
        color: '#FFF',
        fontSize: 50,
        fontWeight: 'normal',
        marginTop: -90,
        textAlign: 'center',
        textTransform: 'capitalize'
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
    giftImageContainer: {
        width: '100%',
        height: 190,        
    },
    textContentContainer: {
        padding: 15
    },
    giftTextContentContainer: {
        width: '100%',
        padding: 15,
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
        bottom: 10,
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
    TextContentContainer: {
        width: '100%',
        height: 380,
        backgroundColor: '#E7EAD9',
        padding: 15,
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

export default TransactionDetailModal;
