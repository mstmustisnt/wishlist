/*
* @providesModule Layout
* */

import React from 'react';
import { observable, action, reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
  Container,
  Content,
  Toast,
  Button,
  Header,
  Left,
  Right,
  Icon,
  Title,
} from 'native-base';
import { ImageBackground } from 'react-native';
import appStyles from 'appStyles';
import backgroundImage from '../assets/background.jpg';

@inject('ui')
@observer
class Layout extends React.Component {
  componentWillMount() {
    const notificationReaction = reaction(
      () => {
        return this.props.ui.notification
      },
      (notification) => {
        console.log(notification);
        notification && Toast.show({
          text: notification.text,
          type: notification.type,
          duration: 1500,
        });

        setTimeout(() => {
          this.props.ui.notification = null;
        }, 2000);
      },
    );
  }

  render() {
    return (
      <Container>
        <ImageBackground resizeMode="cover"
                         source={backgroundImage}
                         style={appStyles.background}>
          {this.props.children}
        </ImageBackground>
      </Container>
    );
  }
}

export default Layout;