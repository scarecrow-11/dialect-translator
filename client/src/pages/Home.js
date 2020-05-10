import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {translateCtg} from '../store/actions/translateActions'

class Home extends React.Component {
    // Input field, Output field
    // Suggestion field
    state = {
        ctg: '',
        bng: '',
        suggestions: [],
        activeSuggestion: 0,
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

    componentDidMount = () => {
        document.getElementById('ctg').focus()
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })

        //////////////////////
        // Show suggestions //
        //////////////////////
        let values = event.target.value.split(' ')

        // Get last word
        let value = values[values.length-1].trim()

        let data = {
            ctg: value
        }

        if(value === null || value === '') {
            this.setState({
                suggestions: []
            })
            return
        }

        // Populate wordSuggestions
        let wordSuggestions = []
    
        // Used Axios instead of fetch
        let apiURL = 'http://localhost:4000/api/ctg/suggestion'
        Axios.post(apiURL, data)
            .then(response => {
                return response.data
            })
            .then(result => {
                result.suggestions.forEach(item => {
                    wordSuggestions.push(item)
                })
                return wordSuggestions
            })
            .then(data => {
                this.setState({
                    suggestions: data
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    // Render suggestions
    renderSuggestions = () => {
        const {suggestions} = this.state
        if(suggestions.length === 0) {
            return null
        } else {
            return (
                <ul className='list-group'>
                    {suggestions.map((item,index) => <li
                        key={index}
                        className='list-group-item'
                        onClick={() => this.selectSuggestion(item)}
                        >{item}
                    </li>
                    )}
                </ul>
            )
        }
    }

    // Select Suggestion
    selectSuggestion = item => {
        let values = this.state.ctg.split(' ')
        values[values.length-1] = item
        let newValue = ''
        values.forEach(value => {
            newValue += value + ' '
        })

        this.setState(() => ({
            ctg: newValue,
            suggestions: []
        }))
        
        // Set focus to ctg input
    }

    submitHandler = event => {
        event.preventDefault()
        let {ctg} = this.state
        this.props.translateCtg({
            ctg
        })
    }

    resetForm = event => {
        this.setState({
            ctg: '',
            bng: '',
            suggestions: [],
            error: {}
        })
    }

    render() {
        let { ctg, bng, error } = this.state
        return (
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h1 className='text-center my-5 display-4'>Translate Here</h1>
                    <form id='ctgForm' onSubmit={this.submitHandler}>
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
                                autoFocus
                            />
                            {/* Suggestions autocomplete */}
                            {this.renderSuggestions()}

                            {/* Show Errors */}
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
                                readOnly={true}
                            />
                        </div>
                        <button className='btn btn-primary' type='submit' onClick={this.submitHandler}>Translate</button>
                        <button className='btn btn-success mx-3 d-inline-block' type='reset' onClick={this.resetForm}>Reset</button>
                        <Link to='#' className='my-1 d-inline-block float-right'>How it works?</Link>
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