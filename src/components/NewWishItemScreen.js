/*
* @providesModule NewWishItemScreen
* */

import React from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import {
  Container,
  Content,
  Button,
  Toast,
  Card,
  CardItem,
  Body,
  Header,
  Left,
  Right,
  Title,
  Icon,
  Form,
  Item,
  Label,
} from 'native-base';
import WishItemController from 'WishItemController';

@observer
class NewWishItemScreen extends React.Component {
  @observable wishItem = {};
  @observable errors = {
    title: null
  };

  static propTypes = {
    category: PropTypes.number.isRequired,
  };

  constructor() {
    super();
    this.saveWishItem = this.saveWishItem.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  @action
  saveWishItem() {

    if (!this.wishItem.title) {
      this.errors.title = true;

      return Toast.show({
        text: 'Title is required!',
        position: 'bottom',
      });
    }

    WishItemController.create(this.wishItem);

    this.navigateToWishList();
  }

  navigateToWishList() {
    this.props.navigation.navigate('CategoriesScreen');
  }

  openDrawer() {
    return this.props.navigation.navigate('DrawerOpen');
  }

  handleTextChange(fieldName) {
    return action((text) => {
      this.wishItem[fieldName] = text;
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.openDrawer}>
              <Icon name='menu'/>
            </Button>
          </Left>
          <Body>
          <Title>New wish item</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel
                  onTextChange={this.handleTextChange('title')}
                  error={this.errors.title}
            >
              <Label>Title</Label>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default NewWishItemScreen;