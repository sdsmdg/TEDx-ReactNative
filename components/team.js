import React from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator } from 'react-native';
import Row from './teamRow.js'

export default class Organizers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  static navigationOptions = {
    title: 'Team',
  };

  componentDidMount() {
    return fetch('http://13.59.205.85/api/organizers/')
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
                <ActivityIndicator />
              </View>
            );
          }
        return (
        <View style={styles.container}><ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Row {...rowData}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:56,
  },
});
