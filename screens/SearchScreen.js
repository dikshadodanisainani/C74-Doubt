import React from 'react';
import { Text, View,FlatList } from 'react-native';
import {ScrollView } from 'react-native-gesture-handler'
import db from '../config';
export default class Searchscreen extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      allTransactions:[]
    }
  }

  componentDidMount=async()=>{
    const query=await db.collection("transactions").get();
    console.log(query);
    console.log(this.state.allTransactions);
    query.docs.map((doc)=>{
      this.setState({
        allTransactions:[this.state.allTransactions,doc.data()],
      })
    })
  }
    render() {
      return (
        <FlatList
        data={this.state.allTransactions}
        renderItem={({item})=>(
          <View style={{borderBottomWidth: 3}}>
            <Text>{"Book Id: " + item.bookId}</Text>
            <Text>{"Student id: " + item.studentId}</Text>
            <Text>{"Transaction Type: " + item.transactionType}</Text>
            <Text>{"Date: " + item.date}</Text>
          </View>
        )}
        keyExtractor= {(item, index)=> index.toString()}
       // onEndReached ={this.fetchMoreTransactions}
       // onEndReachedThreshold={0.7}
      /> 
      );
    }
  }
