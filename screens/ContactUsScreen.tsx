import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Switch, FlatList, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect } from '../actions/authActions';
import { getMyProfile } from '../actions/giftAppAction';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    mainContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        marginTop: -24,
        paddingLeft: 30,
        paddingRight: 30
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
    textLink: {
    },
    textLinkStyle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    avatarWrapper: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    nameInfo: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600'
    },
    mainTitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '400',
        paddingTop: 8,
        textTransform: 'uppercase'
    },
    fieldTitle: {
        fontSize: 14,
        color: '#111',
        textAlign: 'left',
        fontWeight: '600',
        marginTop: 30,
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    fieldWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
        width: '100%',
    },
    fieldInput: {
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#2F80ED',
        fontSize: 14,
        color: '#111',
        flex: 1,
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
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 220,
        paddingLeft: 20,
        paddingRight: 20
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
        width: '100%',
    },
});

interface IContactUsScreenProps {
    navigation: NavigationProp<any>;
}

const ContactUsScreen: React.FC<IContactUsScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Work-Sans-regular': require('../assets/fonts/WorkSans-Regular.ttf'),
        'Work-Sans': require('../assets/fonts/WorkSans-Medium.ttf'),
        'Work-Sans-bold': require('../assets/fonts/WorkSans-Bold.ttf'),
    });

    const [fullName, setFullName] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');

    const bgColor = useThemeColor({}, 'background');

    const goBack = () => {
        navigation.goBack();
    };

    const logout = () => {
        dispatch(authLogoutAndRedirect())
    };

    useEffect(() => {
        dispatch(getMyProfile())
      }, [])

    const { myProfile } = useSelector((state: IRootState) => state.giftApp)


    return (
        <View
            style={[styles.scrollContainer, { backgroundColor: bgColor }]}
        >
            <View style={styles.AboveWrapper}>
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon3 style={styles.textLink} name="arrowleft" size={25} color="#FFF" />
                    </Pressable>
                    <Text style={[styles.mainTitle, { fontFamily: 'Work-Sans' }]} >
                        Contact Us
                    </Text>
                    <Pressable style={styles.textLinkWrapper}>
                    </Pressable>
                </View>
            </View>
            {fontsLoaded && (
                <>
                    <View style={styles.mainContainer}>
                        <Text style={[styles.fieldTitle, { fontFamily: 'Work-Sans' }]} >
                            Full Name
                        </Text>
                        <View style={styles.fieldWrapper}>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Enter your full name"
                                onChangeText={(text) => setFullName(text)}
                            />
                        </View>
                        <Text style={[styles.fieldTitle, { fontFamily: 'Work-Sans' }]} >
                            Subject
                        </Text>
                        <View style={styles.fieldWrapper}>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="Enter your Subject"
                                onChangeText={(text) => setSubject(text)}
                            />
                        </View>
                        <Text style={[styles.fieldTitle, { fontFamily: 'Work-Sans' }]} >
                            Message
                        </Text>
                        <View style={styles.fieldWrapper}>
                            <TextInput
                                multiline
                                style={styles.fieldInputMulti}
                                placeholder="Enter your Message"
                                onChangeText={(text) => setMessage(text)}
                            />
                        </View>
                    </View>
                </>
            )}

            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>SEND MESSAGE</Text>
                </Pressable>
            </View>

        </View>
    );
};

export default ContactUsScreen;


