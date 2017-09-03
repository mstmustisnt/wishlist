/*
* @providesModule ListsScreen
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
  Body,
  Icon,
  List,
  ListItem,
  Spinner,
  Grid,
  Row,
  Col,
} from 'native-base';

@inject('ui')
@inject('list')
@observer
class ListsScreen extends React.Component {

  @observable lists = [];
  @observable ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  constructor() {
    super();
    this.addList = this.addList.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.goToWishItems = this.goToWishItems.bind(this);
  }

  componentWillMount() {
    this.loadLists();
  }

  @action
  loadLists() {
    this.lists = this.props.list.find({ orderBy: 'createdAt' });
  }

  addList() {
    return this.props.navigation.navigate('New List');
  }

  @action
  deleteRow(secId, rowId, rowMap) {
    const { list: store } = this.props;
    const item = this.lists[rowId];

    Alert.alert(
      `Delete ${item.name} list`,
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
              this.props.ui.notification = { text: 'Cannot delete list', type: 'danger' };
            }
            rowMap[`${secId}${rowId}`].props.closeRow();
            // update data
            this.loadLists();
          }
        },
      ],
      { cancelable: true }
    );
  }

  editRow(secId, rowId, rowMap) {
    const { id } = this.lists[rowId];
    rowMap[`${secId}${rowId}`].props.closeRow();
    this.props.navigation.navigate('Edit List', { id });
  }

  @action
  goToWishItems(id) {
    return () => {
      this.props.list.currentList = this.lists.find(list => list.id === id);
      this.props.navigation.navigate('Wishes', { id });
    }
  }

  render() {
    return (
      <Container>
        <List
          dataSource={this.ds.cloneWithRows(this.lists)}
          renderRow={(data, index) =>
            <ListItem key={index} button onPress={this.goToWishItems(data.id)}>
              <Body>
              <Text> {data.name} </Text>
              <Text note> {data.description || 'No description'} </Text>
              </Body>
            </ListItem>
          }
          disableRightSwipe
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
             direction="up"
             onPress={this.addList}
             active>
          <Icon name="ios-add"/>
        </Fab>
      </Container>
    );
  }
}

export default ListsScreen;