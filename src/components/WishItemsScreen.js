/*
* @providesModule WishItemsScreen
*
* */

import React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { ListView, View, Alert } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Fab,
  Icon,
  Body,
  List,
  ListItem,
  Spinner,
  Grid,
  Row,
  Col,
} from 'native-base';

@inject('wishItem')
@inject('list')
@inject('ui')
@observer
class WishItemsScreen extends React.Component {

  @observable wishItems = [];
  @observable ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  @observable isLoading = false;

  constructor() {
    super();
    this.addWishItem = this.addWishItem.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.loadWishItems = this.loadWishItems.bind(this);
  }

  @action
  componentWillMount() {
    this.isLoading = true;
    this.loadWishItems();
    this.isLoading = false;
  }

  addWishItem() {
    const { navigation: { state: { params: { id } } } } = this.props;
    return this.props.navigation.navigate('New Wish', { listId: id });
  }

  @action
  loadWishItems() {
    const { navigation: { state: { params: { id } } } } = this.props;
    try {
      this.wishItems = this.props.wishItem.find({ orderBy: 'createdAt', filter: { 'list.id': id } });
    } catch (e) {
      console.error(e);
      this.props.ui.notification = { type: 'danger', text: e.message || 'Failed to load your wishes' };
    }
  }

  @action
  deleteRow(secId, rowId, rowMap) {
    const { wishItem: store } = this.props;
    const item = this.wishItems[rowId];

    Alert.alert(
      `Delete ${item.title}`,
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            rowMap[`${secId}${rowId}`].props.closeRow();
          },
        },
        {
          text: 'OK',
          onPress: () => {
            try {
              store.remove(item.id);
            } catch (e) {
              console.error(e);
              this.props.ui.notification = { text: 'Cannot delete wish', type: 'danger' };
            }
            rowMap[`${secId}${rowId}`].props.closeRow();
            // update data
            this.loadWishItems();
          }
        },
      ],
      { cancelable: true }
    );
  }

  editRow(secId, rowId, rowMap) {
    const { id } = this.wishItems[rowId];
    const list = this.props.list.currentList;
    rowMap[`${secId}${rowId}`].props.closeRow();
    this.props.navigation.navigate('Edit Wish', { id, listId: list.id });
  }

  render() {
    return (

      <Container>
        <List
          dataSource={this.ds.cloneWithRows(this.wishItems)}
          renderRow={(data, index) =>
            <ListItem key={index}>
              <Body>
              <Text> {data.title} </Text>
              <Text note> {data.description || 'No description'} </Text>
              </Body>
            </ListItem>
          }
          renderRightHiddenRow={(data, secId, rowId, rowMap) =>
            <Grid>
              <Col>
                <Button primary onPress={_ => this.editRow(secId, rowId, rowMap)}>
                  <Icon active name="create"/>
                </Button>
              </Col>
              <Col>
                <Button danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                  <Icon active name="trash"/>
                </Button>
              </Col>
            </Grid>
          }
          renderLeftHiddenRow={(data, secId, rowId, rowMap) => <View/>}
          rightOpenValue={-120}
        />
        <Fab position="bottomRight"
             onPress={this.addWishItem}
             active>
          <Icon name="ios-add"/>
        </Fab>
      </Container>
    );
  }
}

export default WishItemsScreen;