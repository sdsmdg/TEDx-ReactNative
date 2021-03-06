import React from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import Schedule from './components/Schedule';
import Speakers from './components/speakers.js'
import InfoScreen from './components/info.js'
import Sponsors from './components/sponsors.js'
import Organizers from './components/team.js'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import EventMain from './components/EventMain.js'
import { StackNavigator } from 'react-navigation';

const Navigation = StackNavigator({
  about: { screen: InfoScreen },
  sponsors: { screen: Sponsors },
  team: { screen: Organizers },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    }
  }
  render() {
    var Element;
    if (this.state.currentTab == 0) {
      Element = Speakers;
    }
    else if (this.state.currentTab == 1) {
      Element = Schedule;
    }
    else if (this.state.currentTab == 2) {
      Element = EventMain;
    }
    else if (this.state.currentTab == 3) {
      Element = Navigation;
    }

         
    return (
      <View style={styles.container}>
      <View style={styles.labelBar}>
        <Image source={require('./images/label.png')} style={styles.labelImage} />
      </View>
        <Element />
        <BottomNavigation
          labelColor="white"
          rippleColor="red"
          activeTab= {this.state.currentTab}
          style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0,borderTopColor: '#e0e0e0', borderTopWidth: 1 }}
          onTabChange={(newTabIndex) => {
            this.setState({
              currentTab: newTabIndex
            })
          }}
        >
          <Tab
            barBackgroundColor="#fff"
            label="Speakers"
            labelColor="black"
            icon={<Image source={require('./images/speakers-black.png')} style={{ height: 24, width: 22 }} />}
          />
          <Tab
            barBackgroundColor="#fff"
            label="Schedule"
            labelColor="black"
            icon={<Image source={require('./images/schedule-black.png')} style={{ height: 24, width: 24 }} />}
          />
          <Tab
            barBackgroundColor="#fff"
            label="Events"
            labelColor="black"
            icon={<Image source={require('./images/events-black.png')} style={{ height: 24, width: 22.4 }} />}
          />
          <Tab
            barBackgroundColor="#fff"
            label="About Us"
            labelColor="black"
            icon={<Image source={require('./images/about-black.png')} style={{ height: 24, width: 19.672 }} />}
          />
        </BottomNavigation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  labelBar:
  {height: 47,
    marginTop: 25,
   justifyContent: 'center',
   backgroundColor: '#FFFFFF',
   borderBottomColor: '#e0e0e0',
   borderBottomWidth: 1, 
  },
  labelImage:
  { width: 100,
    height: 17.5,
    marginLeft:16,
  },
});