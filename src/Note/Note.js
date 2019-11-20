import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Note.css";
import NotefulContext from "../NotefulContext";

class Note extends Component {
  static contextType = NotefulContext;

  handleClickDelete = (event) => {
    event.preventDefault()
    const noteId = this.props.id


  }

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button className="Note__delete" type="button" onClick={this.handleClickDelete}>
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{" "}
            <span className="Date">
              {format(modified, "Do MMM YYYY")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Note.defaultProps = {
  onDeleteNote: () => {},
}

export default Note;
