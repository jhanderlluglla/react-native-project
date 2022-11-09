import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { IRootState } from '../reducers';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { getEventDetail, setEventInfo } from '../actions/giftAppAction';
import { AntDesign } from '@expo/vector-icons';

interface IEventDetailScreenProps {
    navigation: NavigationProp<any>;
}

const EventDetailScreen: React.FC<IEventDetailScreenProps> = (props) => {

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

    const gotoEventQRCodeScreen = () => {
        props.navigation.navigate('EventQRCodeScreen');
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
                        <>
                            <Text style={styles.eventTitle}>{eventDetailInfo.name}</Text>
                            <View style={styles.detailInfoContainer}>
                                <Icon1 name="calendar" size={20} color="#000" />
                                <Text style={styles.calendarInfo}>{eventDetailInfo.event_date}</Text>
                            </View>
                            <View style={styles.detailInfoContainer}>
                                <Text style={styles.labelInfo}>Invites</Text>
                                <Text style={styles.calendarInfo}>{eventInfo.events_members_count}</Text>
                                {
                                    eventInfo.events_members_count == 0 ? (
                                        <Text style={styles.calendarInfo}>People</Text>
                                    ) : (
                                        <Text style={styles.calendarInfo}>Peoples</Text>
                                    )
                                }

                                <View style={{
                                    flexDirection: "row",
                                    marginTop: 15,
                                    marginBottom: 50
                                }}>
                                    {eventInfo.events_members && eventInfo.events_members.map((member, index) => {
                                        return (
                                            <View 
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    backgroundColor: "#ddd",
                                                    borderColor: "#fff",
                                                    borderRadius: 16,
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    marginLeft: index == 0 ? 0 : -16
                                                }}
                                                key={index}
                                            >
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={styles.detailInfoContainer}>
                                <Text style={styles.labelInfo}>Description</Text>
                            </View>
                            <Text style={styles.descriptionInfo}>{eventDetailInfo.message}</Text>
                        </>
                    )
                }
            </View>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={gotoEventQRCodeScreen}>
                    <Text style={styles.sendButtonText}>View QR Code</Text>
                </Pressable>
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
        paddingLeft: 30,
        paddingRight: 30,
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

export default EventDetailScreen;
