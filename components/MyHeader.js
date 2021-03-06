import React,{Component} from 'react';
import {Header,Icon,Badge} from 'react-native-elements';
import {View,Text} from 'react-native';
import db from '../config'

export default class MyHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            value:''
        }
    }
  getNumberOfUnreadNotification=()=>{
       db.collection('all_notification').where('notification_status','==','unread')
       .onSnapshot((snapshot)=>{
           var unreadNotification =snapshot.docs.map((doc)=>doc.data())
               this.setState({
                   value:unreadNotification.length
               })
            })
  }
  componentDidMount(){
    this.getNumberOfUnreadNotification()
}

 BellIconWithBadge =()=>{
    return(
        <View>
            <Icon name='bell' type='font-awesome' color='#696969' onPress={()=>this.props.navigation.navigate('Notification')}/>
            <Badge 
            value={this.state.value}
            containerStyle={{position:"absolute",top:-4,right:-4}}
            />
        </View>
    )
}

render(){
    return(

    <Header 
    leftComponent={<Icon name='bars' type='font-awesome' color='#696969' onPress={()=>this.props.navigation.toggleDrawer()}/>}
    centerComponent={{text:this.props.title,style:{color:'#90A5A9',fontSize:20,fontWeight:'bold'}}}
    rightComponent={<this.BellIconWithBadge {...this.props}/>}
    backgroundColor="#eaf8fe"
    /> 
    )
}
}





        

