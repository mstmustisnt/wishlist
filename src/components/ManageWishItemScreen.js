/*
* @providesModule ManageWishItemScreen
* */

import React from 'react';
import { observable, action, reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Header,
  Left,
  Right,
  Title,
  Text,
  Icon,
  Form,
  Item,
  Input,
  Label,
  FooterTab,
  Footer,
} from 'native-base';

@inject('ui')
@inject('list')
@inject('wishItem')
@observer
class ManageWishItemScreen extends React.Component {
  @observable wishItem = { title: '', description: '' };
  @observable errors = {
    title: null
  };
  @observable isEdit = false;
  @observable list = null;

  constructor() {
    super();
    this.saveWishItem = this.saveWishItem.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  @action
  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params && params.id) {
      this.isEdit = true;
      this.loadWishItem(params.id);
    }

    this.list = this.props.list.currentList;

    const editReaction = reaction(
      () => {
        return params && params.id;
      },
      (id) => {
        if (id) {
          this.loadWishItem(id);
        }
      }
    );
  }

  loadWishItem(id) {
    try {
      this.wishItem = Object.assign(this.wishItem, this.props.wishItem.findOne({ filter: { id } }));
    } catch (e) {
      console.error(e);
      this.props.ui.notification = { text: e, type: 'danger' };
    }
  }

  @action
  saveWishItem() {
    const listId = this.list.id;
    if (!this.wishItem.title) {
      this.errors.title = true;
      return this.props.ui.notification = { text: 'Name is required', type: 'danger' };
    }

    this.props.ui.isLoading = true;
    this.errors.title = false;
    const { wishItem: store } = this.props;
    let text;
    try {
      if (this.isEdit) {
        store.update(this.wishItem);
        text = 'WishItem has been updated';
      } else {
        this.wishItem.list = this.list;
        store.create(this.wishItem);
        text = 'New wishItem has been created';
      }

    } catch (e) {
      this.props.ui.notification = { text: e.message || 'Error occurred', type: 'danger' };
      this.props.ui.isLoading = false;
      return this.navigateToWishItemsScreen(listId);
    }

    this.props.ui.isLoading = false;
    this.props.ui.notification = { text, type: 'success' };
    this.navigateToWishItemsScreen(listId);
  }

  navigateToWishItemsScreen(listId) {
    this.props.navigation.navigate('Wishes', { id: listId });
  }

  openDrawer() {
    return this.props.navigation.navigate('DrawerOpen');
  }


  handleTextChange(fieldName) {
    return action((text) => {
      if (text && text.length > 0 && this.errors[fieldName]) {
        this.errors[fieldName] = false;
      }

      this.wishItem[fieldName] = text;
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel
                  onTextChange={this.handleTextChange('title')}
                  error={this.errors.title}>
              <Input value={this.wishItem.title} onChangeText={this.handleTextChange('title')}/>
              <Label>Title</Label>
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input value={this.wishItem.description} onChangeText={this.handleTextChange('description')}/>
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full
                    disabled={this.props.ui.isLoading}
                    onPress={this.saveWishItem}>
              <Text>Save</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default ManageWishItemScreen;