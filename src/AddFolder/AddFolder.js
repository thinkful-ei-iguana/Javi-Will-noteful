import React, { Component } from 'react'
import NotefulContext from '../NotefulContext'

 class AddFolder extends Component {
    static contextType = NotefulContext;
    
    handleAddNewFolder = (event) => {
        event.preventDefault()
        const folderName = {
            name: event.target.newFolder.value
        }
        console.log('foldername:',folderName)
        
    
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            body: JSON.stringify(folderName),
            header: {'Content-type':'application/json'},
        })
            .then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    return res.json().then(e => Promise.reject(e))
                }
            })
            .then(res => {
                this.context.addFolder(res)
            })

        
      }

    render() {
        
        return (
           <form onSubmit={this.handleAddNewFolder}>
               <label htmlFor="newFolder">new folder</label>
                <input id="newFolder" name="newFolder" type="text" placeholder="folder name"></input>
                <button type="submit">submit</button>
           </form>
        )
    }
}
AddFolder.defaultProps = {
    AddFolder: () => {},
  }

export default AddFolder