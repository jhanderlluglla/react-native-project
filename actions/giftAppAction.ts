import axios from "axios";
import { API_ENDPOINT } from "../constants/Api";
import { Event, PaymentMethod } from "../reducers";
import { handleMessage } from "./commonAction";

// Define Action Types
export const GET_CONTACT_LIST_SUCCESS = 'GET_CONTACT_LIST_SUCCESS';
export const GET_FAVORITE_CONTACT_LIST_SUCCESS = 'GET_FAVORITE_CONTACT_LIST_SUCCESS';
export const GET_DASHBOARD_INFO_SUCCESS = 'GET_DASHBOARD_INFO_SUCCESS';
export const GET_EVENT_LIST_SUCCESS = 'GET_EVENT_LIST_SUCCESS';
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS';
export const UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
export const GENERATE_TOKEN_SUCCESS = 'GENERATE_TOKEN_SUCCESS';
export const ADD_PAYMENT_METHOD_SUCCESS = 'ADD_PAYMENT_METHOD_SUCCESS';
export const DELETE_PAYMENT_METHOD_SUCCESS = 'DELETE_PAYMENT_METHOD_SUCCESS';
export const ADD_GIFT_SUCCESS = 'ADD_GIFT_SUCCESS';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const GET_GIFT_CATEGORIES_SUCCESS = 'GET_GIFT_CATEGORIES_SUCCESS';
export const GET_MY_PROFILE_SUCCESS = 'GET_MY_PROFILE_SUCCESS';
export const GET_PAYMENT_METHODS_SUCCESS = 'GET_PAYMENT_METHODS_SUCCESS';
export const GET_GIFTS_RECEIVED_SUCCESS = 'GET_GIFTS_RECEIVED_SUCCESS';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const GET_GIFT_COLORS_SUCCESS = 'GET_GIFT_COLORS_SUCCESS';
export const GET_EVENT_TYPES_SUCCESS = 'GET_EVENT_TYPES_SUCCESS';
export const GET_GIFT_FONTS_SUCCESS = 'GET_GIFT_FONTS_SUCCESS';
export const GET_GIFT_PICTURES_SUCCESS = 'GET_GIFT_PICTURES_SUCCESS';
export const GET_TRANSACTION_DETAIL_SUCCESS = 'GET_TRANSACTION_DETAIL_SUCCESS';
export const SET_GIFT_INFO = 'SET_GIFT_INFO';
export const SET_CONTACT_INFO = 'SET_CONTACT_INFO';
export const SET_EVENT_INFO = 'SET_EVENT_INFO';
export const SET_MEMBERS_INFO = 'SET_MEMBERS_INFO';
export const SET_DATE_INFO = 'SET_DATE_INFO';
export const GET_EVENT_DETAIL_SUCCESS = 'GET_EVENT_DETAIL_SUCCESS';
export const SET_SELECTED_PAYMENT_METHOD = 'SET_SELECTED_PAYMENT_METHOD';
export const CLEAR_PAYMENT_METHOD_STATE = 'CLEAR_PAYMENT_METHOD_STATE';
export const CLEAR_CONTACT_STATE = 'CLEAR_CONTACT_STATE';
export const CLEAR_EVENT_STATE = 'CLEAR_EVENT_STATE';
export const TRANSACTION_SEND_SUCCESS = 'TRANSACTION_SEND_SUCCESS';
export const EVENT_LOADING = 'EVENT_LOADING';
export const EVENT_FAILED = 'EVENT_FAILED';

// End of Action Types

export function getContactListSuccess(contactList: any) {
  return {
    type: GET_CONTACT_LIST_SUCCESS,
    contactList,
  };
}

export function getFavoriteContactListSuccess(favoriteList: any) {
  return {
    type: GET_FAVORITE_CONTACT_LIST_SUCCESS,
    favoriteList,
  };
}

export function getDashboardInfoSuccess(dashboardInfo: any) {
  return {
    type: GET_DASHBOARD_INFO_SUCCESS,
    dashboardInfo,
  };
}

export function getEventListSuccess(eventList: any) {
  return {
    type: GET_EVENT_LIST_SUCCESS,
    eventList,
  };
}

export function getMyProfileSuccess(myProfile: any) {
  return {
    type: GET_MY_PROFILE_SUCCESS,
    myProfile,
  };
}

export function getPaymentMethodsSuccess(paymentMethodList: any) {
  return {
    type: GET_PAYMENT_METHODS_SUCCESS,
    paymentMethodList,
  };
}

export function getGiftsReceivedSuccess(giftReceivedList: any) {
  return {
    type: GET_GIFTS_RECEIVED_SUCCESS,
    giftReceivedList,
  };
}

export function getTransactionsSuccess(transactionList: any) {
  return {
    type: GET_TRANSACTIONS_SUCCESS,
    transactionList,
  };
}

export function getGiftCategoriesSuccess(giftCategoryList: any) {
  return {
    type: GET_GIFT_CATEGORIES_SUCCESS,
    giftCategoryList,
  };
}

export function getGiftColorsSuccess(giftColorList: any) {
  return {
    type: GET_GIFT_COLORS_SUCCESS,
    giftColorList,
  };
}

export function getEventTypesSuccess(eventTypeList: any) {
  return {
    type: GET_EVENT_TYPES_SUCCESS,
    eventTypeList,
  };
}

export function getGiftFontsSuccess(giftFontList: any) {
  return {
    type: GET_GIFT_FONTS_SUCCESS,
    giftFontList,
  };
}

export function getEventDetailSuccess(eventDetailInfo: any) {
  return {
    type: GET_EVENT_DETAIL_SUCCESS,
    eventDetailInfo,
  };
}

export function getGiftPicturesSuccess(giftPictureList: any) {
  return {
    type: GET_GIFT_PICTURES_SUCCESS,
    giftPictureList,
  };
}

export function getTransactionDetailSuccess(transactionDetail: any) {
  return {
    type: GET_TRANSACTION_DETAIL_SUCCESS,
    transactionDetail,
  };
}

export function addContactSuccess(contact: any) {
  return {
    type: ADD_CONTACT_SUCCESS,
    contact
  }
}

export function updateContactSuccess(contact: any) {
  return {
    type: UPDATE_CONTACT_SUCCESS,
    contact
  }
}

export function generateTokenSuccess(data: any) {
  return {
    type: GENERATE_TOKEN_SUCCESS,
    data
  }
}

export function addPaymentMethodSuccess(data: any) {
  return {
    type: ADD_PAYMENT_METHOD_SUCCESS,
    data
  }
}

export function transactionSendSuccess(data: any) {
  return {
    type: TRANSACTION_SEND_SUCCESS,
    data
  }
}

export function deletePaymentMethodSuccess(stripe_id: string) {
  return {
    type: DELETE_PAYMENT_METHOD_SUCCESS,
    stripe_id
  }
}

export function addGiftSuccess(giftInfo: any) {
  return {
    type: ADD_GIFT_SUCCESS,
    giftInfo
  }
}

export function addEventSuccess(data: any) {
  return {
    type: ADD_EVENT_SUCCESS,
    event: data
  }
}

export function selectPaymentMethod(paymentMethod: PaymentMethod) {
  return {
    type: SET_SELECTED_PAYMENT_METHOD,
    paymentMethod
  }
}

export function getMyProfile() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/profile`,
        });
        if (res.status === 200) {
          dispatch(getMyProfileSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

export function getPaymentMethods() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/payment-methods/fetch`,
        });
        if (res.status === 200) {
          dispatch(getPaymentMethodsSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

export function getGiftsReceived() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/gifts/received-gifts?paginate=false`,
        });
        if (res.status === 200) {
          dispatch(getGiftsReceivedSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}


export function getTransactions() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/transactions?paginate=false`,
        });
        if (res.status === 200) {
          dispatch(getTransactionsSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

export function getContactList() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/contacts?paginate=false`,
        });
        if (res.status === 200) {
          dispatch(getContactListSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

export function getFavoriteContactList() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/contacts/favourites`,
        });
        if (res.status === 200) {
          dispatch(getFavoriteContactListSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}


export const getFilteredContactList = (
  search: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            "search[value]": search,
            "paginate": false
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/contacts?paginate=false`,
        });
        if (res.status === 200) {
          dispatch(getContactListSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

export function getDashBoardInfo() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/dashboard`,
        });
        if (res.status === 200) {
          dispatch(getDashboardInfoSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

export function getEventList() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/events?paginate=false`,
        });
        if (res.status === 200) {
          dispatch(getEventListSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

export const getFilteredEventList = (
  search: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            "search[value]": search,
            "paginate": false
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/events`,
        });
        if (res.status === 200) {
          dispatch(getEventListSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

export function getGiftCategories() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-categories`,
      });
      if (res.status === 200) {
        dispatch(getGiftCategoriesSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}


export function getGiftColors() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-colors`,
      });
      if (res.status === 200) {
        dispatch(getGiftColorsSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}

export function getEventTypes() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/event-types`,
      });
      if (res.status === 200) {
        dispatch(getEventTypesSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}

export function getGiftFonts() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-fonts`,
      });
      if (res.status === 200) {
        dispatch(getGiftFontsSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}

export function getGiftPictures(id: number) {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-pictures?gift_categories_id=${id}`,

      });
      if (res.status === 200) {
        dispatch(getGiftPicturesSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}

export function getTransactionDetail(id: number) {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'get',
        url: `${API_ENDPOINT}/users/transactions/${id}/detail`,

      });
      if (res.status === 200) {
        dispatch(getTransactionDetailSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}


export function getEventDetail(id: number) {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'get',
        url: `${API_ENDPOINT}/users/events/${id}/fetch`,
      });
      if (res.status === 200) {
        dispatch(getEventDetailSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}


export const addContact = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  isFavourite: boolean
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      is_favourite: isFavourite
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/contacts/add`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(addContactSuccess(res.data));
          dispatch(setContactInfo(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const updateContact = (
  contactId: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  isFavourite: boolean
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      is_favourite: isFavourite
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/contacts/${contactId}/update`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(updateContactSuccess(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const generateToken = (
  cardNumber: string,
  expMonth: string,
  expYear: string,
  cvc: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc,
    };

    console.log(payload);

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/payment-methods/generate-token`,
          data: payload,
        });
        if (res.status === 200) {
          console.log(res.data);
          dispatch(generateTokenSuccess(res.data));
        } else {
          console.log('======failed======');
        }
      } catch (error) {
        if (error.response.data.error) {
          dispatch(handleMessage(true, 'error', error.response.data.error));  
        } else {
          dispatch(handleMessage(true, 'error', 'Sorry, your token could not be created! Please, make sure you entered the right details.'));
        }
      }
    }
  };
};

export const addPaymentMethods = (
  cardToken: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      card_token: cardToken
    };

    console.log(payload);

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/payment-methods/add`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(addPaymentMethodSuccess(res.data));
        }
      } catch (error) {
        if (error.response.data.error) {
          dispatch(handleMessage(true, 'error', error.response.data.error));  
        } else {
          dispatch(handleMessage(true, 'error', 'Sorry, your card could not be created!'));
        }
      }
    }
  };
};

export const transactionsSend = (
  giftId: number,
  senderIntentSourceId: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      sender_intent_source_id: senderIntentSourceId
    };
    console.log('============payload=========');
    console.log(payload);

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/transactions/${giftId}/send`,
          data: payload,
        });
        if (res.status === 200) { 
          console.log('=========response======');    
          console.log(res);
          dispatch(transactionSendSuccess(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const deletePaymentMethod = (
  stripeCardId: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      stripe_card_id: stripeCardId
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'delete',
          url: `${API_ENDPOINT}/users/payment-methods/delete`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(deletePaymentMethodSuccess(stripeCardId));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const addGift = (
  gift_categories_id: number,
  gift_pictures_id: number,
  gift_colors_id: number,
  gift_primary_fonts_id: number,
  gift_secondary_fonts_id: number,
  amount: number,
  contacts_id: number,
  message: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      gift_categories_id: gift_categories_id,
      gift_pictures_id: gift_pictures_id,
      gift_colors_id: gift_colors_id,
      gift_primary_fonts_id: gift_primary_fonts_id,
      gift_secondary_fonts_id: gift_secondary_fonts_id,
      amount: amount,
      contacts_id: contacts_id,
      message: message,
    };

    console.log(payload);

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/gifts/add`,
          data: payload,
        });
        if (res.status === 200) { 
          console.log('=======Gift Added===========')       
          dispatch(addGiftSuccess(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export const setGiftInfo = (giftInfo: any) => {
  return {
    type: SET_GIFT_INFO,
    giftInfo
  };
}

export const setContactInfo = (contactInfo: any) => {
  return {
    type: SET_CONTACT_INFO,
    contactInfo
  };
}

export const setMembersInfo = (membersInfo: number[]) => {
  return {
    type: SET_MEMBERS_INFO,
    membersInfo
  };
}

export const setDateInfo = (dateInfo: string) => {
  return {
    type: SET_DATE_INFO,
    dateInfo
  };
}


export const addEvent = (
  name: string,
  event_date: string,
  event_type_id: number,
  message: string,
  membersInfo: number[]
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      name: name,
      event_date: event_date,
      event_type_id: event_type_id,
      message: message,
      members: membersInfo
    };

    dispatch({
      type: EVENT_LOADING,
    })
    
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/events/add`,
          data: payload,
        });
        if (res.status === 200) { 
          dispatch(addEventSuccess(res.data));
        }
      } catch (error) {
        dispatch({
          type: EVENT_FAILED,
        })
        console.log(error);
      }
    }
  };
};

export const setEventInfo = (eventInfo: Event) => {
  return {
    type: SET_EVENT_INFO,
    eventInfo
  };
}

export const clearPaymentMethodState = () => {
  return {
    type: CLEAR_PAYMENT_METHOD_STATE,
  };
}

export const clearContactState = () => {
  return {
    type: CLEAR_CONTACT_STATE,
  };
}

export const clearEventState = () => {
  return {
    type: CLEAR_EVENT_STATE,
  };
}
