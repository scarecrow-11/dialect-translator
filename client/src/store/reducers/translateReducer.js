import * as Types from '../actions/types'

const init = {
    isTranslated: false,
    bng: {},
    error: {}
}

const translateReducer = (state=init, action) => {
    switch(action.type) {
        case Types.TRANSLATE_CTG: {
            return {
                bng: action.payload.bng,
                isTranslated: Object.keys(action.payload.bng).length !== 0,
                error: {}
            }
        }
        case Types.TRANSLATE_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state
    }
}

export default translateReducer