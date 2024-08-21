import * as ActionTypes from './ActionTypes';

export const updatePartnerLat = (data) => ({
    type: ActionTypes.UPDATE_PARTNER_LAT,
    data: data
})
export const updatePartnerName = (data) => ({
    type: ActionTypes.UPDATE_PARTNER_NAME,
    data: data
})
export const updatePartnerLng = (data) => ({
    type: ActionTypes.UPDATE_PARTNER_LNG,
    data: data
})
export const updatePartnerProfilePicture = (data) => ({
    type: ActionTypes.UPDATE_PARTNER_PROFILE_PICTURE,
    data: data
})
export const updatePartnerOnlineStatus = (data) => ({
    type: ActionTypes.UPDATE_PARTNER_ONLINE_STATUS,
    data: data
})
export const reset = () => ({
    type: ActionTypes.RESET,
})

