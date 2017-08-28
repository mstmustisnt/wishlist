/*
* @providesModule CategoriesScreen
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
  List,
  ListItem,
  Spinner,
  Grid,
  Row,
  Col,
} from 'native-base';

@inject('ui')
@inject('category')
@observer
class CategoriesScreen extends React.Component {

  @observable categories = [];
  @observable ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  @observable isLoading = false;

  constructor() {
    super();
    this.addCategory = this.addCategory.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.openList = this.openList.bind(this);
  }

  @action
  componentWillMount() {
    this.isLoading = true;
    this.categories = this.props.category.find({ orderBy: 'createdAt' });
    this.isLoading = false;
  }

  addCategory() {
    return this.props.navigation.navigate('New List');
  }

  deleteRow(secId, rowId, rowMap) {
    const { category: store } = this.props;
    const item = this.categories[rowId];

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
            this.categories = this.categories.filter((item, index) => index !== rowId);
          }
        },
      ],
      { cancelable: true }
    );
  }

  editRow(secId, rowId, rowMap) {
    const { id } = this.categories[rowId];
    this.props.navigation.navigate('Edit List', { id });
  }

  openList(data) {
    return () => this.props.navigation.navigate('List', data);
  }

  render() {
    return (
      this.isLoading ? <Spinner color='blue'/> :
        <View>
          <List
            dataSource={this.ds.cloneWithRows(this.categories)}
            renderRow={(data, index) =>
              <ListItem key={index} onPress={this.openList(data)}>
                <Text> {data.name} </Text>
                <Text> {data.description} </Text>
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
               onPress={this.addCategory}
               active>
            <Icon name="ios-add"/>
          </Fab>
        </View>
    );
  }
}

export default CategoriesScreen;