/*
* @providesModule ManageListScreen
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
@observer
class ManageListScreen extends React.Component {
  @observable list = { name: '', description: '' };
  @observable errors = {
    name: null
  };
  @observable isEdit = false;

  constructor() {
    super();
    this.saveList = this.saveList.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  @action
  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params && params.id) {
      this.isEdit = true;
      this.loadList(params.id);
    }

    const editReaction = reaction(
      () => {
        return params && params.id;
      },
      (id) => {
        if (id) {
          this.loadList(id);
        }
      }
    );
  }

  loadList(id) {
    try {
      this.list = Object.assign(this.list, this.props.list.findOne({ filter: { id } }));
    } catch (e) {
      console.error(e);
      this.props.ui.notification = { text: e, type: 'danger' };
    }
  }

  @action
  saveList() {
    if (!this.list.name) {
      this.errors.name = true;
      return this.props.ui.notification = { text: 'Name is required', type: 'danger' };
    }

    this.props.ui.isLoading = true;
    this.errors.name = false;
    const { list: store } = this.props;
    let text;
    try {
      if (this.isEdit) {
        store.update(this.list);
        text = 'List has been updated';
      } else {
        store.create(this.list);
        text = 'New list has been created';
      }

    } catch (e) {
      this.props.ui.notification = { text: e, type: 'danger' };
      this.props.ui.isLoading = false;
      return this.navigateToListsScreen();
    }

    this.props.ui.isLoading = false;
    this.props.ui.notification = { text, type: 'success' };
    this.navigateToListsScreen();
  }

  navigateToListsScreen() {
    this.props.navigation.navigate('Lists');
  }

  openDrawer() {
    return this.props.navigation.navigate('DrawerOpen');
  }


  handleTextChange(fieldName) {
    return action((text) => {
      if (text && text.length > 0 && this.errors[fieldName]) {
        this.errors[fieldName] = false;
      }

      this.list[fieldName] = text;
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel
                  onTextChange={this.handleTextChange('name')}
                  error={this.errors.name}>
              <Input value={this.list.name} onChangeText={this.handleTextChange('name')}/>
              <Label>Name</Label>
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input value={this.list.description} onChangeText={this.handleTextChange('description')}/>
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full
                    disabled={this.props.ui.isLoading}
                    onPress={this.saveList}>
              <Text>Save</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default ManageListScreen;