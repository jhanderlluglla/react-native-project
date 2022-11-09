import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import CustomCheckbox from '../components/CustomCheckbox';
import { useFonts } from 'expo-font';
import { clearEventState, getEventTypes } from '../actions/giftAppAction';
import { IRootState } from '../reducers';
import { addEvent } from '../actions/giftAppAction';
import { AntDesign } from '@expo/vector-icons';


interface IAddNewEventScreenProps {
    navigation: NavigationProp<any>;
}

const AddNewEventScreen: React.FC<IAddNewEventScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { eventTypeList, dateInfo, isAddEventSuccess, isAddEventTriggered, membersInfo } = useSelector((state: IRootState) => state.giftApp)

    const [validationError, setValidationError] = React.useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

    const closeModal = () => {
        props.navigation.goBack();
    };

    let [fontsLoaded] = useFonts({
        'Merriweather': require('../assets/fonts/Merriweather-Light.ttf'),
        'Italianno': require('../assets/fonts/Italianno-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Waterfall': require('../assets/fonts/Waterfall-Regular.ttf'),
        'Cormorant': require('../assets/fonts/Cormorant-Bold.ttf'),
        'Playfair': require('../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
        'Montserrat': require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
        'Lato': require('../assets/fonts/Lato-Black.ttf'),
    });


    const [type, setType] = React.useState(1);
    const [message, setMessage] = React.useState('');
    const [eventName, setEventName] = React.useState('');

    useEffect(() => {
        dispatch(getEventTypes());
    }, [])

    

    const gotoThanksScreen = () => {
        if (eventName === "") {
            setValidationError(true);
            setValidationErrorMessage('You should fill event name');
        } else if (dateInfo === "") {
            setValidationError(true);
            setValidationErrorMessage('You should set event date');
        } else {
            dispatch(addEvent(
                eventName,
                dateInfo,
                parseInt(type),
                message,
                membersInfo
            ));
        }

    };

    console.log(isAddEventTriggered);

    useEffect(() => {
        if (isAddEventSuccess) {
            props.navigation.navigate('ThanksEventScreen');
            dispatch(clearEventState())
        } else {
            if (isAddEventTriggered) {
                setValidationError(true);
                setValidationErrorMessage('Failed! Please recheck input fields.');
            }
        }
    }, [isAddEventSuccess, isAddEventTriggered])

    const gotoInviteMembersScreen = () => {
        props.navigation.navigate('InviteMembersScreen');
    };

    const gotoCalendarScreen = () => {
        props.navigation.navigate('CalendarScreen');
    };
   

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
                    </View>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Create new event</Text>
                    </View>
                
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Event type</Text>
                    </View>
                    <ScrollView style={styles.categoryContainer} horizontal>
                        <View style={styles.categoryItemListContainer}>
                            {eventTypeList && eventTypeList.map((eventType, index) => {
                                return (
                                    <View style={styles.categoryItemContainer} key={index}>
                                        <CustomCheckbox
                                            option={eventType.id}
                                            value={type}
                                            onChange={setType}
                                            position='top-right'
                                        >
                                            <View style={[styles.categoryItemInfo, { backgroundColor: eventType.bg_color }]}>
                                                <Image
                                                    source={{
                                                        uri: eventType.image_url,
                                                    }}
                                                    style={styles.eventTypeIconImage}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                        </CustomCheckbox>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Event name</Text>
                    </View>
                    <TextInput
                        style={styles.fieldInput}
                        placeholder="Enter name"
                        onChangeText={(text) => setEventName(text)}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Event date</Text>
                    </View>
                    <Pressable onPress={gotoCalendarScreen}>
                        <View style={styles.fieldWrapper}>
                            <AntDesign style={styles.iconStyleInput} name="calendar" size={20} color="black" />
                            <TextInput
                                style={styles.fieldInputIcon}
                                placeholder="Enter date"
                                value={dateInfo}
                            />
                        </View>
                    </Pressable>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Message</Text>
                    </View>
                    <View style={styles.messageContentContainer}>
                        <TextInput
                            multiline
                            style={styles.fieldInputMulti}
                            placeholder="Enter a message for your invites"
                            onChangeText={(text) => setMessage(text)}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Invite friends</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        marginTop: 15,
                        marginBottom: 50
                    }}>
                        {membersInfo && membersInfo.map((member, index) => {
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
                        {
                            membersInfo.length ? (
                                <Pressable onPress={gotoInviteMembersScreen}>
                                    <AntDesign style={styles.iconStyle} name="pluscircle" size={30} color="#7B61FF" />
                                </Pressable>
                            ) : (
                                <Pressable onPress={gotoInviteMembersScreen}>
                                    <AntDesign name="pluscircle" size={30} color="#7B61FF" />
                                </Pressable>
                            )
                        }
                    
                    </View>
                    {validationError && (
                        <Text style={styles.errorMessageAlert}>
                            {validationErrorMessage}
                        </Text>
                    )}
                    <View style={styles.buttonContainer} >
                        <Pressable style={styles.sendButton} onPress={gotoThanksScreen}>
                            <Text style={styles.sendButtonText}>continue</Text>
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
        paddingTop: 50,
        paddingBottom: 30,
        height: '100%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 30,
        paddingRight: 30,
    },
    headerTitleContainer: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    },
    titleContainer: {
        width: '100%',
        textAlign: 'left',
        marginTop: 30,
    },
    title: {
        fontSize: 16,
        color: '#111111',
    },
    categoryItemContainer: {
        marginRight: 15,
    },
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 15,
        width: '100%'
    },
    categoryItemInfo: {
        width: 70,
        height: 70,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden'
    },
    errorMessageAlert: {
        fontSize: 10,
        color: '#cc3300',
        fontStyle: 'italic',
        paddingTop: 4,
        paddingBottom: 4,
        textAlign: 'center'
    },
    fieldInputIcon: {
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
    fieldInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#2F80ED',
        fontSize: 16,
        padding: 10,
        color: '#2CAF4D',
        flex: 1,
        marginTop: 10,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    fieldInputMulti: {
        height: 134,
        width: '100%',
        marginTop: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#2F80ED',
        fontSize: 14,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        color: '#111',
        textAlignVertical: 'top'
    },
    messageContentContainer: {
        width: '100%',
    },
    fieldInputWrapper: {
        width: '100%',
        textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 20,
    },
    categoryContainer: {
        paddingLeft: 30,
        width: '100%',
        height: 70,
        marginTop: 30,
        flexDirection: "row"
    },
    categoryItemListContainer: {
        flexDirection: 'row'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    headerTitle: {
        color: '#7B61FF',
        fontSize: 28,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        margin: 0,
        backgroundColor: 'transparent'
    },
    image: {
        width: 70,
        height: 70
    },
    eventTypeIconImage: {
        width: 40,
        height: 40
    },
    categoryItemTitle: {
        fontSize: 20,
        color: '#111111',
        marginTop: 10,
        fontWeight: '600',
    },
    iconImage: {
        width: 30,
        height: 30
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
    iconStyle: {
        marginLeft: -15
    },
    iconStyleInput: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        left: 0,
    },

});

export default AddNewEventScreen;
