import React, { Component } from 'react'
import NotefulContext from '../NotefulContext'

export class AddNote extends Component {
    static contextType = NotefulContext;


    handleAddNewNote = (event) => {
        event.preventDefault()
        const note = {
            name: event.target.newNote.value,
            modified: new Date(),
            folderId: event.target["newNote-folderId"].value,
            content: event.target["newNote-content"].value,
        }
        console.log('note:',note)

    }

    render() {
        const { folders } = this.context;
        return (
            <form onSubmit={this.handleAddNewNote}>
                <label htmlFor="newNote">Note title</label>
                <input id="newNote" name="newNote" placeholder="note title"></input>

                <label htmlFor="newNote-content">Note content</label>
                <textarea 
                type="text"
                id="newNote"
                name="newNote-content"
                />

                <label htmlFor="newNote-folderId">note folder</label>
                <select>
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
