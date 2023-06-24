import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    search: '',
  };

  onFormInput = evt => {
    this.setState({ search: evt.target.value.toLowerCase() });
  };

  onSubmit = evt => {
    evt.preventDefault();

    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.onSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.onFormInput}
          placeholder="What do you want to write?"
          name="search"
          value={this.state.search}
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
