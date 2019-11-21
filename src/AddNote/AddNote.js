import React, { Component } from 'react'
import NotefulContext from '../NotefulContext'

export class AddNote extends Component {
    static contextType = NotefulContext;


    handleAddNewNote = event => {
        event.preventDefault()
        const note = {
            name: event.target.newNote.value,
            modified: new Date(),
            folderId: event.target["newNote-folderId"].value,
            content: event.target["newNote-content"].value,
        }
        console.log('note:',note)

        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify(note),
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
                this.context.addNote(res)
            })

    }

    render() {
        const { folders } = this.context;
        return (
            <form onSubmit={this.handleAddNewNote}>

                <label htmlFor="newNote">new folder</label>
                <input id="newNote" name="newNote" type="text" placeholder="note title"></input>

                <label htmlFor="newNote-content">Note content</label>
                <textarea 
                type="text"
                id="newNote"
                name="newNote-content"
                />

                <label htmlFor="newNote-folderId">note folder</label>
                <select id="newNote-folderId" name="newNote-folderId">
                    {folders.map(folder => (
                        <option key={folder.id} value={folder.id}>
                            {folder.name}
                        </option>
                    ))

                    }
                </select>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default AddNote
