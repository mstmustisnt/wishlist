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
import NewWishItemScreen from 'NewWishItemScreen';
import ManageCategoryScreen from 'ManageCategoryScreen';
import CategoriesScreen from 'CategoriesScreen';
import WishItemsScreen from 'WishItemsScreen';
// import EditWishScreen from 'EditWishScreen';

import Layout from './components/Layout';
import stores from './stores';

const navItems = [
  { title: 'Lists', component: CategoriesScreen, path: 'lists', },
  { title: 'New List', component: ManageCategoryScreen, path: 'lists/create' },
  { title: 'Edit List', component: ManageCategoryScreen, path: 'lists/:id/edit' },
  { title: 'New Wish', component: NewWishItemScreen, path: 'wishes/create' },
  {
    title: 'Edit Wish',
    component: NewWishItemScreen,
    path: 'wishes/:id/edit'
  },
  { title: 'Wishes', component: WishItemsScreen, path: 'wishes' },
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