import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import history from '../history';
import SC from 'soundcloud';
import { connect } from 'react-redux';


const SearchBar = ({ dispatch }) => {
  const handleKeyPress = async (e) => {
    if (e.charCode===13) {
      const result = e.target.value;
      e.preventDefault();
      await SC.get('/resolve', {
          client_id: 'm3kCd053xVXYtaEYQZ2e87SWSSuYnunA',
          url: 'https://soundcloud.com/' + result
      }).then((user) => {
        dispatch({ type: 'SET_USER', user});
        window.location.reload(false);
      });
    }
  }

  return (
    <Form className="search__bar_form" inline>
      <InputGroup className="search__bar">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          </InputGroup.Prepend>
            <FormControl
              className="search__bar_input"
              placeholder="SoundCloud username"
              aria-label="SoundCloud username"
              onKeyPress={handleKeyPress}
            />
          </InputGroup>
    </Form>
  )
}

export default connect(null, null)(SearchBar)
