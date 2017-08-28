/*
* @providesModule ManageCategoryScreen
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
import CategoryController from 'CategoryController';

@inject('ui')
@inject('category')
@observer
class ManageCategoryScreen extends React.Component {
  @observable category = { name: '', description: '' };
  @observable errors = {
    name: null
  };
  @observable isEdit = false;

  constructor() {
    super();
    this.saveCategory = this.saveCategory.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  @action
  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params && params.id) {
      this.isEdit = true;
      this.loadCategory(params.id);
    }

    const editReaction = reaction(
      () => {
        return params && params.id;
      },
      (id) => {
        if (id) {
          this.loadCategory(id);
        }
      }
    );
  }

  loadCategory(id) {
    try {
      this.category = Object.assign(this.category, this.props.category.findOne({ filter: { id } }));
    } catch (e) {
      console.error(e);
      this.props.ui.notification = { text: e, type: 'danger' };
    }
  }

  @action
  saveCategory() {
    if (!this.category.name) {
      this.errors.name = true;
      return this.props.ui.notification = { text: 'Name is required', type: 'danger' };
    }

    this.errors.name = false;
    const { category: store } = this.props;
    try {
      if (this.isEdit) {
        store.update(this.category);
      } else {
        store.create(this.category);
      }

    } catch (e) {
      this.props.ui.notification = { text: e, type: 'danger' };
      this.navigateToCategoriesScreen();
    }


    this.props.ui.notification = { text: 'New list has been created', type: 'success' };
    this.navigateToCategoriesScreen();
  }

  navigateToCategoriesScreen() {
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

      this.category[fieldName] = text;
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
              <Input value={this.category.name} onChangeText={this.handleTextChange('name')}/>
              <Label>Name</Label>
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input value={this.category.description} onChangeText={this.handleTextChange('description')}/>
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full
                    onPress={this.saveCategory}>
              <Text>Save</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default ManageCategoryScreen;