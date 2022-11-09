import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from '../components/Themed';
import CustomCheckbox from '../components/CustomCheckbox';
import { getGiftCategories } from '../actions/giftAppAction';
import { IRootState } from '../reducers';
import { setGiftInfo } from '../actions/giftAppAction';

interface ISelectCategoryScreenProps {
    navigation: NavigationProp<any>;
}

const SelectCategoryScreen: React.FC<ISelectCategoryScreenProps> = (props) => {

    const dispatch = useDispatch();

    const [category, setCategory] = React.useState();

    const closeModal = () => {
        props.navigation.goBack();
    };

    const gotoSelectTemplateScreen = () => {
        dispatch(setGiftInfo({
            gift_category: category,
        }));
        props.navigation.navigate('SelectTemplateScreen');
    };

    useEffect(() => {
        dispatch(getGiftCategories())
    }, [])

    const { giftCategoryList } = useSelector((state: IRootState) => state.giftApp)

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
                    <Text style={styles.headerTitle}>SELECT CATEGORY</Text>
                </View>
            </View>
            <ScrollView style={styles.categoryContainer}>
                <View style={styles.categoryItemContainer}>
                    <View style={styles.categoryItemLeftContainer}>
                        {giftCategoryList && giftCategoryList.map((categoryInfo, index) => {
                            return (
                                <React.Fragment>
                                    {
                                        index % 2 == 0 && (
                                            <CustomCheckbox
                                                option={categoryInfo}
                                                value={category}
                                                onChange={setCategory}
                                                position='top-right'
                                                key={index}
                                            >
                                                <View style={[styles.categoryItemInfo, { backgroundColor: categoryInfo.bg_color }]}>
                                                    <Image
                                                        source={{
                                                            uri: categoryInfo.image_url,
                                                        }}
                                                        style={styles.image}
                                                        resizeMode="cover"
                                                    />
                                                    <Text style={styles.categoryItemTitle}>
                                                        {categoryInfo.description}
                                                    </Text>
                                                </View>
                                            </CustomCheckbox>
                                        )
                                    }

                                </React.Fragment>
                            )
                        })}
                    </View>
                    <View style={styles.categoryItemRightContainer}>
                        {giftCategoryList && giftCategoryList.map((categoryInfo, index) => {
                            return (
                                <React.Fragment>
                                    {
                                        index % 2 == 1 && (
                                            <CustomCheckbox
                                                option={categoryInfo}
                                                value={category}
                                                onChange={setCategory}
                                                position='top-right'
                                                key={index}
                                            >
                                                <View style={[styles.categoryItemInfo, { backgroundColor: categoryInfo.bg_color }]}>
                                                    <Image
                                                        source={{
                                                            uri: categoryInfo.image_url,
                                                        }}
                                                        style={styles.image}
                                                        resizeMode="cover"
                                                    />
                                                    <Text style={styles.categoryItemTitle}>
                                                        {categoryInfo.description}
                                                    </Text>
                                                </View>
                                            </CustomCheckbox>
                                        )
                                    }

                                </React.Fragment>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={gotoSelectTemplateScreen}>
                    <Text style={styles.sendButtonText}>continue</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        maxHeight: '95%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerTitleContainer: {
        width: 220,
        height: 30,
        textAlign: 'center',
        paddingTop: 3
    },
    categoryItemLeftContainer: {
        width: '50%',
    },
    categoryItemRightContainer: {
        width: '50%',
        marginTop: 30
    },
    categoryItemInfo: {
        width: '100%',
        height: 220,
        textAlign: 'center',
        alignItems: 'center',
    },
    categoryContainer: {
        width: '100%',
        height: 600,
        marginTop: 30,
    },
    categoryItemContainer: {
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
        fontSize: 16,
        fontWeight: '600'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{
            translateX: -120
        }],
        margin: 0,
        backgroundColor: 'transparent'
    },
    image: {
        width: 70,
        height: 70,
        marginTop: 50
    },
    categoryItemTitle: {
        fontSize: 20,
        color: '#111111',
        marginTop: 10,
        fontWeight: '600',
        textTransform: "capitalize",
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

export default SelectCategoryScreen;
