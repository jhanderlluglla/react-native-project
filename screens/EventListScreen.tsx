import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { clearEventState, getEventList, getFilteredEventList, setEventInfo } from '../actions/giftAppAction';
import { IRootState, Event} from '../reducers';
import Icon2 from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 0,
        width: "100%",
        flexDirection: 'column'
    },
    textContainer: {
        width: '85%',
        textAlign: 'left'
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 60
    },
    eventContainer: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
        borderRadius: 12,
        overflow: 'hidden'
    },
    headerContent: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'transparent'
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
        paddingLeft: 20,
        paddingRight: 20
    },
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
    },
    image: {
        width: '100%',
        height: 190
    },
    textLink: {
        textDecorationStyle: 'solid',
        color: '#7B61FF',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'right'
    },
    eventTitleInfo: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left',
        position: 'absolute',
        bottom: 15,
        left: 15,
        zIndex: 10
    },
    eventsContainer: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 22
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
        padding: 16,
        fontSize: 15,
        fontWeight: "700",
        height: 50,
        borderRadius: 14,
        width: "100%",
    },
    blankContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150
    },
    blankText: {
        color: 'rgba(17, 17, 17, 0.4)',
        marginTop: 30,
        fontSize: 14
    },
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 30,
        width: '100%'
    },
    iconStyle: {
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

});

interface IEventListScreenProps {
    navigation: NavigationProp<any>;
}

const EventListScreen: React.FC<IEventListScreenProps> = (props) => {
    const dispatch = useDispatch();


    const gotoAddNewEventScreen = () => {
        props.navigation.navigate('CreateEventScreen');
    };

    useEffect(() => {
        dispatch(getEventList())
        dispatch(clearEventState())
    }, [])
   

    const handleSearchChange = (value: string) => {
        dispatch(getFilteredEventList(value))
    }

    const { eventList } = useSelector((state: IRootState) => state.giftApp)

    let [fontsLoaded] = useFonts({
        'Merriweather-Light': require('../assets/fonts/Merriweather-Light.ttf'),
    });

    const gotoEventDetailScreen = (eventInfo: Event) => {
        dispatch(setEventInfo(eventInfo));
        props.navigation.navigate('EventDetailScreen');
    };

    return (
        <View
            style={styles.scrollContainer}
        >
            <View style={styles.headerWrapper}>
                <Text style={styles.textLink}>Events</Text>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.fieldWrapper}>
                    <Icon2 style={styles.iconStyle} name="search" size={20} color="#000" />
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Search"
                        onChangeText={(text) => handleSearchChange(text)}
                    />
                </View>
                <View style={styles.buttonContainer} >
                    <Pressable style={styles.sendButton} onPress={gotoAddNewEventScreen}>
                        <Text style={styles.sendButtonText}>New event</Text>
                    </Pressable>
                </View>
                <ScrollView style={styles.eventsContainer}>
                    {
                        eventList.length > 0 ? (
                            eventList.map((eventInfo, index) => {
                                return (
                                    <Pressable onPress={() => gotoEventDetailScreen(eventInfo)}>
                                        <View style={styles.eventContainer} key={index}>
                                            <Image
                                                source={require("../assets/images/card11.jpeg")}
                                                style={styles.image}
                                                resizeMode="cover"
                                            />
                                            {fontsLoaded && (
                                                <Text style={styles.eventTitleInfo}>{eventInfo.name}</Text>
                                            )}
                                        </View>
                                    </Pressable>
                                )
                            })
                        ) : (
                            <View style={styles.blankContainer}>
                                <Image
                                    source={require("../assets/images/address_book.png")}
                                    style={{width: 90, height: 90}}
                                    resizeMode="cover"
                                />
                                <Text style={styles.blankText}>Don't have events</Text>
                            </View>
                            
                        )
                    }

                    
                </ScrollView>
            </View>
        </View>
    );
};

export default EventListScreen;
