import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    seacrh: '',
    page: 1,
    images: [],
    total_images: 0,
    error: null,
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

      this.setState(prevValue => ({
        images: [...prevValue.images, ...photos],
        total_images: total_results,
      }));
    } catch (error) {
      this.setState({ error: error.name });
      console.log(error);
    }
  };

  onFormSubmit = evt => {
    this.setState({ seacrh: evt, page: 1, images: [] });
  };

  onButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, total_images, seacrh, error } = this.state;
    console.log(error);
    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit} />
        {images.length === 0 && seacrh !== '' && !error && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}

        {error && <Text textAlign="center">{error}</Text>}

        <Grid>
          {images.map(({ id, avg_color, alt, src: { large } }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {images.length > 0 && images.length !== total_images && (
          <Button type="button" onClick={this.onButtonClick}>
            Load more
          </Button>
        )}
      </>
    );
  }
}
