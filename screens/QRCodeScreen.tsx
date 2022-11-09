import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import ImageView from "react-native-image-viewing";


interface IQRCodeScreenProps {
    navigation: NavigationProp<any>;
}

const QRCodeScreen: React.FC<IQRCodeScreenProps> = (props) => {

    const dispatch = useDispatch();

    const closeModal = () => {
        props.navigation.goBack();
    };

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno-Regular': require('../assets/fonts/Italianno-Regular.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    const [visible, setIsVisible] = useState(false);

    const downloadQRCode = () => {
        setIsVisible(true);
    };

    const { latestEvent } = useSelector((state: IRootState) => state.giftApp)  
    const qrImages = [latestEvent.qr_code_url];
    console.log(qrImages) 
    

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
                    <Text style={styles.headerTitle}>QR CODE</Text>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.imageContentContainer}>
                    <Image
                        source={{
                            uri: latestEvent.qr_code_url,
                        }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.buttonContainer} >
                    <Pressable style={styles.sendButton} onPress={downloadQRCode}>
                        <Text style={styles.sendButtonText}>Download QR Code</Text>
                    </Pressable>
                </View>
            </View>

            <ImageView
                images={qrImages}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 30,
        maxHeight: '95%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 12
    },
    mainContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
        justifyContent: 'center'
    },
    thanksContainer: {
        width: '100%',
        marginTop: 30
    }, 
    headerTitleContainer: {
        width: 220,
        height: 50,
        textAlign: 'center',
        paddingTop: 3,
    },
    descriptionContainer: {
        width: '100%',
        marginTop: 20
    },
    descriptionText: {
        color: '#111',
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center'
    },
    thanksText: {
        textAlign: 'center',
        color: '#7B61FF',
        fontSize: 28,
        fontWeight: 'bold'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: 'transparent'
    },
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF",
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
        textAlign: 'center'
    },
    imageContentContainer: {
        marginTop: 50,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center'
    },
    image: {
        width: 119,
        height: 119,
    },
    iconImage: {
        width: 30,
        height: 30
    },
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
        marginTop: 50
    },
    textLink: {
        textDecorationStyle: 'solid',
        color: '#7B61FF',
        fontWeight: '800',
        fontSize: 14,
        textAlign: 'center',
        textTransform: "uppercase",
        paddingHorizontal: 20,
    }
});

export default QRCodeScreen;
