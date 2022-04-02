
const sessionDataKey = state => state.id + '-split'

const getSessionData = state => JSON.parse(
    sessionStorage.getItem(sessionDataKey(state)) || "{}"
)

const updateSessionData = (state, object, skipTemplate) => {
    sessionStorage.setItem(
        sessionDataKey(state),JSON.stringify(
            {
                ...getSessionData(state),
                ...object
            }
        )
    )
}

export {
    sessionDataKey,
    getSessionData,
    updateSessionData
}