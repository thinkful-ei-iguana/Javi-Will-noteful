import React, { Component } from "react";
import config from "./../config";
import ApiContext from "../ApiContext";

export default class AddNote extends Component {
  static contextType = ApiContext;

  handleAddNewNote = event => {
    event.preventDefault();
    this.props.history.push( `/` )

    const { name, content, folderid } = event.target

    const note = {
      name: name.value,
      modified: new Date(),
      folderId: folderid.value,
      content: content.value
    };
    fetch(config.API_ENDPOINT, {
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
      .then(data => {
        name.value = ''
        content.value = ''
        folderid.value = ''
        this.context.addNote(data);
      })
      .catch(console.error);
  };

  render() {
    const { folders } = this.context;

    return (
      <form onSubmit={this.handleAddNewNote}>
        <label htmlFor="name">note name </label>
        <input
          required
          type="text"
          id="addNote-name"
          name="name"
          placeholder="note name"
        />

        <label htmlFor="content">note content </label>
        <textarea
          required
          type="text"
          id="addNote-content"
          name="content"
          placeholder="note content"
        />

        <label htmlFor="folderid">note folder</label>
        <select required id="folderId" name="folderid">
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
