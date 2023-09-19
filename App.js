import React, { Component } from 'react';
import { View,StatusBar } from 'react-native';
import { BackHandler } from 'react-native';
import {WebView} from "react-native-webview"
import RNbootsplash from "react-native-bootsplash"
class App extends Component {
  constructor(props) {
    super(props);

    this.webviewRef = React.createRef();
    this.state = {
      canGoBack: false,
    };
  }

  componentDidMount() {
    
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleLoadEnd = () =>{
    RNbootsplash.hide({fade:true,duration:500});
  }

  handleBackButton = () => {
    if (this.state.canGoBack) {
      this.webviewRef.current.goBack();
      return true; 
    }
    return false;
  };

  handleNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
        <WebView
          ref={this.webviewRef}
          onLoadEnd={this.handleLoadEnd}
          source={{ uri: 'https://freejstore.com/' }}
          onNavigationStateChange={this.handleNavigationStateChange}
        />
      </View>
    );
  }
}

export default App;
