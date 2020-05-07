import Axios from 'axios'
import * as Types from './types'

export const translateCtg = ctg => dispatch => {
    Axios.post('/api/ctg/translate', ctg)
        .then(response => {
            let bng = response.data.bng
            dispatch({
                type: Types.TRANSLATE_CTG,
                payload: {
                    bng
                }
            })
            document.getElementById('bng').value = bng
        })
        .catch(error => {
            dispatch({
                type: Types.TRANSLATE_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}