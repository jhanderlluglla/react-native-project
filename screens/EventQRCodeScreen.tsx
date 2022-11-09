import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { IRootState } from '../reducers';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { getEventDetail, setEventInfo } from '../actions/giftAppAction';

interface IEventQRCodeScreenProps {
    navigation: NavigationProp<any>;
}

const EventQRCodeScreen: React.FC<IEventQRCodeScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { eventInfo } = useSelector((state: IRootState) => state.giftApp);
    const { eventDetailInfo } = useSelector((state: IRootState) => state.giftApp);

    useEffect(() => {
        if (eventInfo) {
            const event_id = eventInfo.id;
            dispatch(getEventDetail(event_id))
        }
    }, [eventInfo])


    const closeModal = () => {
        props.navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer} >
                <Image
                    source={require("../assets/images/detail-main.png")}
                    resizeMode="cover"
                />
                <Pressable onPress={closeModal} style={styles.iconDiv}>
                    <Image
                        source={require("../assets/images/close-white.png")}
                        style={styles.iconImage}
                        resizeMode="cover"
                    />
                </Pressable>
            </View>
            <View style={styles.mainContainer}>
                {
                    eventDetailInfo && (
                        <View style={styles.qrImageContainer}>
                            <Image
                                source={{
                                    uri: eventDetailInfo.qr_code_url,
                                }}
                                style={styles.qrImage}
                                resizeMode="cover"
                            />
                        </View>
                        
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        overflow: 'hidden',
        height: '55%',
    },
    mainContainer: {
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -100,
        paddingTop: 30,
        height: 460
    },
    qrImageContainer: {
        width: '100%',
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrImage: {
        width: 250,
        height: 250
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    iconDiv: {
        position: 'absolute',
        top: 60,
        left: 30
    },
    detailInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 18
    }, 
    eventTitle: {
        fontSize: 24,
        textAlign: 'left',
        color: '#111',
        fontWeight: '700',
    },
    calendarInfo: {
        color: 'rgba(17, 17, 17, 0.4)',
        fontSize: 16,
        paddingLeft: 10
    },
    labelInfo: {
        fontSize: 16,
        color: '#111',
        fontWeight: '600'
    },
    descriptionInfo: {
        marginTop: 12,
        color: 'rgba(17, 17, 17, 0.4)',
        fontSize: 14,
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{
            translateX: -185
        }],
        margin: 0,
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

});

export default EventQRCodeScreen;
