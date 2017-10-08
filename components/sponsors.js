import React from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator, ToolbarAndroid } from 'react-native';
import Row from './sponsorsRow.js'

export default class Sponsors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }

  }
  static navigationOptions = {
    title: 'Sponsors',
  };

  componentDidMount() {
    return fetch('http://tedxiitr.herokuapp.com/api/organizers/?format=json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


    render() {
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 50}}>
              <ToolbarAndroid style={styles.toolbar}
                        title='Sponsors'
                        navIcon={require('./../images/backarrow.png')}
                        // onIconClicked={this.props.navigator.pop}
                        titleColor={'#FFFFFF'}/>
                <ActivityIndicator />
              </View>
            );
          }
        return (
        <View style={styles.container}>
		<ToolbarAndroid style={styles.toolbar}
                        title='Sponsors'
                        navIcon={require('./../images/backarrow.png')}
                        titleColor={'#FFFFFF'}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Row {...rowData}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  	top:0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar:
  {	
  	justifyContent: 'center', 

  },
});