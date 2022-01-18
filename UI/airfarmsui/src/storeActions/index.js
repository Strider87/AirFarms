export const  userAction = (payload) => {
    return {
        type: 'USER',
        payload: payload
    }
}

export const  commentImageAction = (payload) => {
    return {
        type: 'IMAGE',
        payload: payload
    }
}

export const  userLocationAction = (payload) => {
    return {
        type: 'LOCATION',
        payload: payload
    }
}
