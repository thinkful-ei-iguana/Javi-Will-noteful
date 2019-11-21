import React from 'react';
import config from './../config'
import ApiContext from '../ApiContext'

export default class AddFolder extends React.Component {
static contextType = ApiContext;

render() {
    return (
        <form onSubmit={this.handleAddNewFolder}>
        <label htmlFor="addFolder">Add new folder</label>
        <input type="text" id="addFolder" name="addFolder" >
        </input>
        <button type="submit">Submit new folder</button>
        </form>
    )
}

handleAddNewFolder = (event) => {
    event.preventDefault();
    const folderName = {
        name: event.target.addFolder.value
    }
    fetch(`${config.API_ENDPOINT}/folders`, 
    {
        method: 'post',
        body: JSON.stringify(folderName),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
           return response.json();
        }
        else {
            return response.json().then(e => Promise.reject(e))
        }
    }
    )
    .then(resJson => {
        this.context.addFolder(resJson);
    })
}

}