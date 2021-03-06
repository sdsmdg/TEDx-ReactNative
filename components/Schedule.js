import React, { Component } from "react";
import { View, Text, ListView, ActivityIndicator, Image, StyleSheet } from "react-native";
import { List, Card, ListItem, SearchBar } from "react-native-elements";
import Row from './scheduleRow.js'
import Break from './break.js'


var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });   

class Schedule extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loading: false,     
      error: null,
    };
  }

  componentDidMount() {
      this.makeRemoteRequest();
  }

  

  makeRemoteRequest = () => {
    //api url needs to be changed
    const url = 'http://13.59.205.85/api/schedule/';
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(responseJson => {
         this.setState({
          loading: false,
          dataSource: ds.cloneWithRows(responseJson),
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

 
  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, marginTop: 25}}>
          <ActivityIndicator/>
        </View>
      );
    }
      if(this.state.dataSource === null){
        return(
        <View/>)
      }
      else{
      return (
      <View style={styles.container}>
          
            <ListView 
              enableEmptySections={true}
              dataSource = {this.state.dataSource}
              renderRow = {(item) => item.type === 'br' ? <Break {...item}/> : <Row {...item}/> }
            />
       
      </View>    
      );
    }
  }
};

const styles = StyleSheet.create(
  {
    container:
    {flex:1,
      marginBottom: 56,
      backgroundColor:'rgba(0,0,0,0.03)',
    },

    topBar:
    { height: 25,
      backgroundColor: '#000000',
    },
    labelBar:
    {height: 47,
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

export default Schedule;