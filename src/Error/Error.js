import React from 'react';
import PropTypes from 'prop-types';

export default class Error extends React.Component {
  state = {
    error: null
  };

  static getDerivedStateFromError( error ) {
    return { error };
  }

  render() {
    if ( this.state.error ) {
      return ( <div className="error-page">
        <h1>Something seems to have gone wrong</h1>
        <p>Try rereshing the page</p>

      </div> )
    }
    return this.props.children;
  }

}

Error.propTypes = {
  children: PropTypes.oneOfType( [ PropTypes.string, PropTypes.array ] )
}