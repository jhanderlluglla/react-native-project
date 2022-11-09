import {
    GET_CONTACT_LIST_SUCCESS,
    GET_DASHBOARD_INFO_SUCCESS,
    GET_EVENT_LIST_SUCCESS,
    ADD_CONTACT_SUCCESS,
    UPDATE_CONTACT_SUCCESS,
    GENERATE_TOKEN_SUCCESS,
    ADD_PAYMENT_METHOD_SUCCESS,
    ADD_GIFT_SUCCESS,
    ADD_EVENT_SUCCESS,
    GET_GIFT_CATEGORIES_SUCCESS,
    GET_GIFT_COLORS_SUCCESS,
    GET_GIFT_FONTS_SUCCESS,
    GET_GIFT_PICTURES_SUCCESS,
    GET_TRANSACTION_DETAIL_SUCCESS,
    SET_GIFT_INFO,
    SET_CONTACT_INFO,
    SET_MEMBERS_INFO,
    SET_DATE_INFO,
    SET_EVENT_INFO,
    GET_MY_PROFILE_SUCCESS,
    GET_GIFTS_RECEIVED_SUCCESS,
    GET_TRANSACTIONS_SUCCESS,
    GET_EVENT_TYPES_SUCCESS,
    GET_EVENT_DETAIL_SUCCESS,
    GET_PAYMENT_METHODS_SUCCESS,
    SET_SELECTED_PAYMENT_METHOD,
    DELETE_PAYMENT_METHOD_SUCCESS,
    CLEAR_PAYMENT_METHOD_STATE,
    CLEAR_EVENT_STATE,
    CLEAR_CONTACT_STATE,
    TRANSACTION_SEND_SUCCESS,
    EVENT_LOADING,
    EVENT_FAILED,
    GET_FAVORITE_CONTACT_LIST_SUCCESS
} from '../actions/giftAppAction';

export interface Contact {
    id: number;
    name: string
    email: string
    first_name: string
    last_name: string
    phone: string
    owner_id: number
    created_at: string
    updated_at: string,
    is_favourite: string
}

export interface GiftCatetory {
    id: number;
    description: string
    image_relative_url: string
    image_url: string,
    bg_color: string
}

export interface Event {
    id: number;
    name: string
    event_date: string
    message: string
    archived: boolean
    owner_id: number
    event_type_id: number,
    created_at: string
    updated_at: string,
    image_relative_url: string,
    events_members_count: number,
    events_members: any,
    image_url: string,
    event_type: any
}

export interface EventDetailInfo {
    id: number;
    name: string;
    event_date: string;
    message: string;
    archived: boolean;
    event_type_id: number;
    event_type: string;
    image_url: string;
    events_members: any;
    qr_code_url: string;
}

export interface GiftReceived {
    id: number;
    receiver: any;
    receiver_email: string;
    receiver_user_id: any;
    events_id: any;
    gift_category: string,
    gift_picture: string,
    gift_color: string,
    gift_primary_font: string,
    gift_secondary_font: string,
    gift_status: string,
    gift_pictures_id: number,
    gift_colors_id: number,
    gift_primary_fonts_id: number,
    gift_secondary_fonts_id: number,
    gift_status_id: number,
    amount: number,
    message: string,
    application_fee_amount: any,
    total_amount: any,
    owner_id: number,
    sender: string,
    sender_email: string,
}

export interface Transaction {
    id: number;
    colleague_name: string;
    colleague_email: string;
    flagged_total_amount: number,
    gift_status: string,
    gift_status_id: number,
    updated_at: string
}

export interface GiftColor {
    id: number;
    description: string;
    hex_color: string;
}

export interface EventType {
    id: number;
    description: string;
    image_relative_url: string;
    image_url: string;
    bg_color: string;
}

export interface GiftFont {
    id: number;
    description: string;
}

export interface GiftPicture {
    id: number;
    gift_categories_id: number;
    description: string;
    image_relative_url: string;
    image_url: string;
}

// export interface GiftInfo {
//     gift_categories_id: number;
//     gift_pictures_id: number;
//     gift_colors_id: number;
//     gift_primary_fonts_id: number;
//     amount: number;
//     contacts_id: number;
//     gift_secondary_fonts_id: number;
//     message: string;
// }

export interface GiftInfo {
    gift_category: GiftCatetory;
    gift_picture: GiftPicture;
    gift_color: GiftColor;
    gift_primary_font: GiftFont;
    amount: number;
    gift_contact: Contact;
    gift_secondary_font: GiftFont;
    message: string;
}

export interface MyProfile {
    id: number;
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    image_url: string;
    phone: string;
    date_of_birth: string;
    role_id: number;
    preferred_timezone_tzab: string;
    account_status_id: number;
    default_currency_id: number;
    role: string;
    currency_type: string;
    user_stripe_account: string
}

export interface DashboardInfo {
    total_received: number;
    upcoming_events: [],
    latest_gifts: []
}

export interface TransactionDetail {
    colleague_name: string;
    colleague_email: string;
    flagged_total_amount: number;
    id: number;
    receiver: string;
    receiver_email: string;
    event: any;
    gift_category: string;
    gift_picture: string;
    gift_color: string;
    gift_primary_font: string;
    gift_secondary_font: string;
    gift_status: string;
    gift_pictures_id: number;
    gift_colors_id: number;
    gift_primary_fonts_id: number;
    gift_secondary_fonts_id: number;
    gift_status_id: number;
    amount: number;
    message: string;
    application_fee_amount: number;
    total_amount: number;
    sender: string;
    sender_email: string;
    updated_at: string;
    gift_hex_color: string;
}


export interface PaymentMethod {
    stripe_card_id: string;
    brand: string;
    country: string;
    cvc_check: any;
    exp_month: number;
    exp_year: number;
    funding: string;
    last4: string;
}


export const giftAppInitialState: {
    contactList: Contact[],
    contactInfo: Contact,
    favoriteList: Contact[],
    dashboardInfo: DashboardInfo,
    transactionDetail: TransactionDetail,
    paymentMethodList: PaymentMethod[],
    eventList: Event[],
    latestEvent: any,
    giftCategoryList: GiftCatetory[],
    giftReceivedList: GiftReceived[],
    transactionList: Transaction[],
    giftColorList: GiftColor[],
    giftFontList: GiftFont[],
    giftPictureList: GiftPicture[],
    eventTypeList: EventType[],
    giftInfo: GiftInfo,
    membersInfo: [],
    eventInfo: Event,
    myProfile: MyProfile,
    isAddEventSuccess: boolean,
    isAddEventTriggered: boolean,
    dateInfo: string,
    eventDetailInfo: EventDetailInfo
    cardToken: string,
    isPaymentTokenGeneratedSuccess: boolean,
    isAddingPaymentMethodSuccess: boolean,
    isTransactionSendSuccess: boolean,
    isDeletePaymentMethodSuccess: boolean,
    newGiftId: number,
    selectedPaymentMethod: PaymentMethod,
    isAddContactSuccess: boolean,
    isUpdateContactSuccess: boolean
} = {
    contactList: [],
    contactInfo: {
        id: 0,
        name: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        owner_id: 0,
        created_at: "",
        updated_at: "",
        is_favourite: "0"
    },
    favoriteList: [],
    dashboardInfo: {
        total_received: 0,
        upcoming_events: [],
        latest_gifts: []
    },
    transactionDetail: {
        colleague_name: '',
        colleague_email: '',
        flagged_total_amount: 0,
        id: 0,
        receiver: '',
        receiver_email: '',
        event: null,
        gift_category: '',
        gift_picture: '',
        gift_color: '',
        gift_primary_font: '',
        gift_secondary_font: '',
        gift_status: '',
        gift_pictures_id: 0,
        gift_colors_id: 0,
        gift_primary_fonts_id: 0,
        gift_secondary_fonts_id: 0,
        gift_status_id: 0,
        amount: 0,
        message: '',
        application_fee_amount: 0,
        total_amount: 0,
        sender: '',
        sender_email: '',
        updated_at: '',
        gift_hex_color: ''
    },
    paymentMethodList: [],
    eventList: [],
    latestEvent: null,
    giftCategoryList: [],
    giftColorList: [],
    giftFontList: [],
    giftPictureList: [],
    eventTypeList: [],
    giftReceivedList: [],
    transactionList: [],
    giftInfo: {
        gift_category: {
            id: 1,
            description: '',
            image_relative_url: '',
            image_url: '',
            bg_color: ''
        },
        gift_picture: {
            id: 1,
            gift_categories_id: 1,
            description: '',
            image_relative_url: '',
            image_url: ''
        },
        gift_color: {
            id: 1,
            description: '',
            hex_color: ''
        },
        gift_primary_font: {
            id: 1,
            description: ''
        },
        amount: 0,
        gift_contact: {
            id: 1,
            name: '',
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
            owner_id: 1,
            created_at: '',
            updated_at: ''
        },
        gift_secondary_font: {
                id: 1,
                description: ''
        },
        message: ''
    },
    membersInfo: [],
    myProfile: {
        id: 1,
        name: '',
        email: '',
        first_name: '',
        last_name: '',
        image_url: 'https://givegiftd.s3.us-east-1.amazonaws.com/default/profile_picture.png',
        phone: '',
        date_of_birth: '',
        role_id: 3,
        preferred_timezone_tzab: 'EDT',
        account_status_id: 2,
        default_currency_id: 144,
        role: 'Public User',
        currency_type: 'USD',
        user_stripe_account: 'pending verification'
    },
    isAddEventSuccess: false,
    isAddEventTriggered: false,
    dateInfo: '',
    eventDetailInfo: {
        id: 1,
        name: "",
        event_date: "",
        message: "",
        archived: false,
        event_type_id: 1,
        event_type: "",
        image_url: "",
        qr_code_url: "",
        events_members: []
    },
    eventInfo: {
        id: 1,
        name: "",
        event_date: "2022-01-01",
        message: "",
        archived: false,
        owner_id: 47,
        event_type_id: 1,
        created_at: "",
        updated_at: "",
        image_relative_url: "",
        events_members_count: 0,
        events_members: [],
        image_url: "",
        event_type: null
    },
    cardToken: '',
    isPaymentTokenGeneratedSuccess: false,
    isAddingPaymentMethodSuccess: false,
    isTransactionSendSuccess: false,
    isDeletePaymentMethodSuccess: false,
    selectedPaymentMethod: {
        stripe_card_id: '',
        brand: '',
        country: 'US',
        cvc_check: 'pass',
        exp_month: 2022,
        exp_year: 12,
        funding: '',
        last4: ''
    },
    newGiftId: 0,
    isAddContactSuccess: false,
    isUpdateContactSuccess: false
};


export function giftAppReducer(state = giftAppInitialState, action: any) {

    switch (action.type) {

        case GET_MY_PROFILE_SUCCESS:
            return {
                ...state,
                myProfile: action.myProfile as MyProfile
            };

        case GET_PAYMENT_METHODS_SUCCESS:
            return {
                ...state,
                paymentMethodList: action.paymentMethodList as PaymentMethod
            };

        case GET_CONTACT_LIST_SUCCESS:
            return {
                ...state,
                contactList: action.contactList as Contact[]
            };

        case GET_FAVORITE_CONTACT_LIST_SUCCESS:
            return {
                ...state,
                favoriteList: action.favoriteList as Contact[]
            };

        case GET_DASHBOARD_INFO_SUCCESS:
            return {
                ...state,
                dashboardInfo: action.dashboardInfo as DashboardInfo
            };

        case GET_EVENT_LIST_SUCCESS:
            return {
                ...state,
                eventList: action.eventList as Event[]
            };

        case GET_GIFT_CATEGORIES_SUCCESS:
            return {
                ...state,
                giftCategoryList: action.giftCategoryList as GiftCatetory[]
            };

        case GET_GIFTS_RECEIVED_SUCCESS:
            return {
                ...state,
                giftReceivedList: action.giftReceivedList as GiftReceived[]
            };

        case GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactionList: action.transactionList as Transaction[]
            };

        case GET_EVENT_DETAIL_SUCCESS:
            return {
                ...state,
                eventDetailInfo: action.eventDetailInfo as EventDetailInfo
            };

        case GET_GIFT_COLORS_SUCCESS:
            return {
                ...state,
                giftColorList: action.giftColorList as GiftColor[]
            };

        case GET_EVENT_TYPES_SUCCESS:
            return {
                ...state,
                eventTypeList: action.eventTypeList as EventType[]
            };

        case GET_GIFT_FONTS_SUCCESS:
            return {
                ...state,
                giftFontList: action.giftFontList as GiftFont[]
            };

        case GET_GIFT_PICTURES_SUCCESS:
            return {
                ...state,
                giftPictureList: action.giftPictureList as GiftPicture[]
            };

        case GET_TRANSACTION_DETAIL_SUCCESS:
            return {
                ...state,
                transactionDetail: action.transactionDetail as TransactionDetail
            };

        case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                isAddContactSuccess: true,
                contactList: [...state.contactList, action.contact]
            };

        case UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                isUpdateContactSuccess: true,
                contactList: [...(state.contactList.filter(contact => contact.id !== action.contact.id)), action.contact]
            };

        case GENERATE_TOKEN_SUCCESS:
            return {
                ...state,
                isPaymentTokenGeneratedSuccess: true,
                cardToken: action.data.card_token
            };

        case ADD_PAYMENT_METHOD_SUCCESS:
            return {
                ...state,
                isAddingPaymentMethodSuccess: true,
                isPaymentTokenGeneratedSuccess: false,
                isDeletePaymentMethodSuccess: false,  
                cardToken: '',
                paymentMethodList: [
                    ...state.paymentMethodList,
                    action.data                    
                ]
            };

        case TRANSACTION_SEND_SUCCESS:
            return {
                ...state,
                isTransactionSendSuccess: true,
            };

        case DELETE_PAYMENT_METHOD_SUCCESS:
            return {
                ...state,
                paymentMethodList: state.paymentMethodList.filter((paymentmethod) => paymentmethod.stripe_card_id != action.stripe_id),
                isDeletePaymentMethodSuccess: true,                
            };

        case ADD_GIFT_SUCCESS:
            return {
                ...state,
                isAddGiftSuccess: true,
                newGiftId: action.giftInfo.id
            };

        case ADD_EVENT_SUCCESS:
            return {
                ...state,
                isAddEventSuccess: true,
                isAddEventTriggered: true,
                latestEvent: action.event,
                eventList: [
                    ...state.eventList,
                    action.event
                ]
            };

        case SET_GIFT_INFO:
            return {
                ...state,
                giftInfo: {
                ...state.giftInfo,
                ...action.giftInfo
                }
            }

        case SET_CONTACT_INFO:
            return {
                ...state,
                contactInfo: action.contactInfo
            }

        case SET_MEMBERS_INFO:
            return {
                ...state,
                membersInfo: action.membersInfo,
            }

        case SET_DATE_INFO:
            return {
                ...state,
                dateInfo: action.dateInfo,
            }

        case SET_EVENT_INFO:
            return {
                ...state,
                eventInfo: action.eventInfo
            }
        case SET_SELECTED_PAYMENT_METHOD:
            return {
                ...state,
                selectedPaymentMethod: action.paymentMethod
            }
        case CLEAR_PAYMENT_METHOD_STATE:
            return {
                ...state,
                isAddingPaymentMethodSuccess: false,
                isPaymentTokenGeneratedSuccess: false,
                isDeletePaymentMethodSuccess: false,  
            }
        case CLEAR_CONTACT_STATE:
            return {
                ...state,
                isAddContactSuccess: false,
                contactInfo: ''
            }
        case CLEAR_EVENT_STATE:
            return {
                ...state,
                isAddEventSuccess: false,
                isAddEventTriggered: false,
            }
        case EVENT_LOADING:
            return {
                ...state,
                isAddEventSuccess: false,
                isAddEventTriggered: false,
            }
        case EVENT_FAILED:
            return {
                ...state,
                isAddEventSuccess: false,
                isAddEventTriggered: true,
            }
        default:
            return state;
    }
}
