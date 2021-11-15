import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar,TextInput, Button, Card, List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Item } from 'react-native-paper/lib/typescript/components/List/List';
export default class App extends React.Component {
  arr=[]
  id=0
  state = {
    text:'',
    item:[
      {id :1, data:"loading"}
    ]    
  };

  storedata = async()=>{
    this.arr.push({id:this.id, data:this.state.text})
    this.id++;
    await AsyncStorage.setItem("mylist",JSON.stringify(this.arr))
    this.setState({
      item:JSON.parse(await AsyncStorage.getItem("mylist"))
    })
    console.log(this.state)
  }
  async componentDidMount(){
    this.setState({
      item:JSON.parse(await AsyncStorage.getItem("mylist")) || ""
    })
    this.arr=JSON.parse(await AsyncStorage.getItem("mylist")) || []
    this.id=this.arr[this.arr.length-1].id+1//comment it and 
    }
  render(){
    var renderList;
    if(this.state.item.length > 0){
      renderList = this.state.item.map(item=>{
        return (
          <Card key={item.id} style={{margin:10}}>
          <List.Item 
              title={item.data}
              right={() => <List.Icon icon="delete" />}
              onPress={()=>{AsyncStorage.removeItem("mylist")}}
          />
        </Card>)
      })
    }
    else{
      renderList=<Text>no items</Text>
      }
    return (
      <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content
          title="TO DO LIST"
        />
      </Appbar.Header>
      <TextInput 
        label='add to do items'
        value={this.state.text}
        onChangeText={text=>this.setState({text})}
      />
        <Button mode="contained" onPress={this.storedata}>
          Add ToDo
        </Button>
        <View>
          {renderList}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
});
