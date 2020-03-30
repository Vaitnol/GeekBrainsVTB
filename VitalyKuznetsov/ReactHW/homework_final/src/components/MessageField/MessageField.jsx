import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import './MessageField.css';

export class MessageField extends Component {
    state = {
        author: 'Vitaly',
        text: ''
    };

    static propTypes = {
        onSend: PropTypes.func
    }

    static defaultProps = {
        onSend: () => {}
    }

    handleInputChange = (e) => {
        const fieldName = e.target.name;
        this.setState({
            [fieldName]: e.target.value
        });

    }

    handleInputSend = (e) => {
        const {onSend} = this.props; 

        if(typeof onSend === 'function'){
            onSend(this.state);
            this.setState(() => {
               return { text: ''}
            })
        }
    }


    handleKeyDownEnter = (event) => {
        if(event.ctrlKey && event.keyCode === 13){
            this.handleInputSend();
        }
    }

    render() {
        const {author, text} = this.state;
        return (
            <div className='message-field'>
                <TextField name="author" className='author' value={author} type="text" onChange={this.handleInputChange} label="Author"/>
                <TextField name="text" className='text' value={text} multiline autoFocus onKeyDown={this.handleKeyDownEnter} onChange={this.handleInputChange} label="Text" />
                <Fab variant='round' size='small' color='primary' onClick={this.handleInputSend}><SendIcon /></Fab>
            </div>
        )
    }

}