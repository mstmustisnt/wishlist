/*
*
* @providesModule AppNavigator
*
* */

import React from 'react';
import { observable, action } from 'mobx';
import { observer, Provider } from 'mobx-react';

import { StackNavigator } from 'react-navigation';
import { Root, Content } from 'native-base';
import appStyles from 'appStyles';
import ManageWishItemScreen from 'ManageWishItemScreen';
import ManageListScreen from 'ManageListScreen';
import ListsScreen from 'ListsScreen';
import WishItemsScreen from 'WishItemsScreen';

import Layout from './components/Layout';
import stores from './stores';

const navItems = [
  { title: 'Lists', component: ListsScreen, path: 'lists', },
  { title: 'New List', component: ManageListScreen, path: 'lists/create' },
  { title: 'Edit List', component: ManageListScreen, path: 'lists/:id/edit' },
  { title: 'New Wish', component: ManageWishItemScreen, path: 'wishes/create' },
  {
    title: 'Edit Wish',
    component: ManageWishItemScreen,
    path: 'lists/:listId/wishes/:id/edit'
  },
  { title: 'Wishes', component: WishItemsScreen, path: 'lists/:id/wishes' },
];

const navOptions = {};

navItems.forEach((item) => {
  const { component: Component, navigationOptions = {}, title } = item;

  return navOptions[item.title] = {
    screen(props) {
      return (
        <Layout {...props}>
          <Component {...props}/>
        </Layout>
      );
    },
    path: item.path,
    navigationOptions: Object.assign({ title }, navigationOptions)
  };
});

const Navigator = StackNavigator(navOptions);

@observer
class AppNavigator extends React.Component {
  render() {
    return (
      <Root>
        <Provider {...stores}>
          <Navigator style={appStyles.content}/>
        </Provider>
      </Root>
    );
  }
}

export default AppNavigator;