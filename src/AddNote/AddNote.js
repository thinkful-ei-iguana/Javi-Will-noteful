import React, { Component } from "react";
import config from "./../config";
import ApiContext from "../ApiContext";

export default class AddNote extends Component {
  static contextType = ApiContext;

  handleAddNewNote = event => {
    event.preventDefault();
    this.props.history.push( `/` )


    const note = {
      name: event.target["addNote-name"].value,
      modified: new Date(),
      folderId: event.target["addNote-folderId"].value,
      content: event.target["addNote-content"].value
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "post",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(e => Promise.reject(e));
        }
      })
      .then(resJson => {
        this.context.addNote(resJson);
      })
      .catch(console.error);
  };

  render() {
    const { folders } = this.context;

    return (
      <form onSubmit={this.handleAddNewNote}>
        <label htmlFor="addNote-name">note name </label>
        <input
          required
          type="text"
          id="addNote-name"
          name="addNote-name"
          placeholder="note name"
        />

        <label htmlFor="addNote-content">note content </label>
        <textarea
          required
          type="text"
          id="addNote-content"
          name="addNote-content"
          placeholder="note content"
        />

        <label htmlFor="addNote-folderId">note folder</label>
        <select required id="addNote-folderId" name="addNote-folderId">
          {folders.map(f => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        <button type="submit">Submit new note</button>
      </form>
    );
  }
}
