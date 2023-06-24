import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    seacrh: '',
    page: 1,
    images: [],
    total_images: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { seacrh, page } = this.state;
    if (prevState.seacrh !== seacrh || prevState.page !== page) {
      this.getFotos(seacrh, page);
    }
  }

  getFotos = async (seacrh, page) => {
    try {
      const { photos, total_results } = await ImageService.getImages(
        seacrh,
        page
      );
    } catch (error) {
      console.log(error);
    }
  };

  onFormSubmit = evt => {
    this.setState({ seacrh: evt });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit} />
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
