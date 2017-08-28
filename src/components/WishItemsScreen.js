/*
* @providesModule WishItemsScreen
*
* */

import React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { ListView, View } from 'react-native';
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

@inject('category')
@observer
class WishItemsScreen extends React.Component {

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
    console.log(this);
  }

  addCategory() {
    return this.props.navigation.navigate('New List');
  }

  deleteRow() {
    console.log(arguments);
  }

  editRow() {
    console.log(arguments);
  }

  openList(data) {
    return () => this.props.navigation.navigate('List', data);
  }

  render() {
    return (
      this.isLoading ? <Spinner color='blue'/> :
        <Container>
          <View><Text>My lists</Text></View>
          <List
            dataSource={this.ds.cloneWithRows(this.categories)}
            renderRow={(data, index) =>
              <ListItem key={index} onPress={this.openList(data)}>
                  <Text> {data.name} </Text>
                  <Text> {data.description} </Text>
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
            leftOpenValue={0}
            rightOpenValue={-100}
          />
          <Fab position="bottomRight"
               direction="up"
               onPress={this.addCategory}
               active>
            <Icon name="ios-add"/>
          </Fab>
        </Container>
    );
  }
}

export default WishItemsScreen;