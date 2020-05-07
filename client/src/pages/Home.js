import React from 'react'
import {connect} from 'react-redux'
import {translateCtg} from '../store/actions/translateActions'

class Home extends React.Component {
    // Input field, Output field
    // Suggestion field
    state = {
        ctg: '',
        bng: '',
        error: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(JSON.stringify(nextProps.translate.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.translate.error
            }
        }

        return null
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()
        let {ctg} = this.state
        this.props.translateCtg({
            ctg
        })
    }

    render() {
        let { ctg, bng, error } = this.state
        return (
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h1 className='text-center display-4'>Translate Here</h1>
                    <form onSubmit={this.submitHandler}>
                        {/* Chittagonian Input Box */}
                        <div className='form-group'>
                            <label htmlFor='ctg'> Chittagonian: </label>
                            <input
                                type='"text'
                                className={error.ctg ? 'form-control is-invalid': 'form-control'}
                                placeholder='Enter Chittagonian here...'
                                name='ctg'
                                id='ctg'
                                value={ctg}
                                onChange={this.changeHandler}
                            />
                            { error.ctg && (
                                <div className='invalid-feedback'>
                                    {error.ctg}
                                </div>
                            )}
                        </div>

                        {/* Standard Bangla Output Box */}
                        <div className='form-group'>
                            <label htmlFor='bng'> Standard Bangla: </label>
                            <input
                                type='"text'
                                className='form-control'
                                placeholder='Standard Bangla...'
                                name='bng'
                                id='bng'
                                value={bng}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <button className='btn btn-primary'>Translate</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    translate: state.translate
})

export default connect(mapStateToProps, {translateCtg})(Home)