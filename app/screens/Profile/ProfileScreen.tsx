import React, {useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import FastImage from "react-native-fast-image";
import Icon from 'react-native-vector-icons/Feather';

import {W} from '../../utils'
import {theme} from "../../styles";
import {IApplicationState} from "../../types";
import {fetchUserAction} from "../../actions";

const ProfileScreen = () => {
    const dispatch = useDispatch()
    useEffect(() => {dispatch(fetchUserAction())}, []);
    const {user} = useSelector((state: IApplicationState) => ({user: state.user}));
    if (!user.name)
        return <ActivityIndicator color={theme.mainColor} size='large'/>
    const d = new Date(user.created!)
    return (
        <ScrollView style={{flex: 1}} testID='ProfileScreen'>
            <View style={s.container}>
                <FastImage source={{uri: user.image}} style={s.image}/>
                <View style={s.titleContainer}>
                    <Text style={s.title}>Account Info</Text>
                    <TouchableOpacity>
                        <Icon name='edit' size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={s.box}>
                    <Text style={s.text}>First Name: <Text style={{fontWeight: 'bold'}}>{user.name.split(' ')[0]}</Text></Text>
                    <Text style={s.text}>Last Name: <Text style={{fontWeight: 'bold'}}>{user.name.split(' ')[1]}</Text></Text>
                    <Text style={s.text}>Gender: <Text style={{fontWeight: 'bold'}}>{user.gender}</Text></Text>
                    <Text style={s.text}>Location: <Text style={{fontWeight: 'bold'}}>{user.location!.name}</Text></Text>
                    <Text style={s.text}>Status: <Text style={{fontWeight: 'bold'}}>{user.status}</Text></Text>
                    <Text style={s.text}>Created: <Text
                        style={{fontWeight: 'bold'}}>{d.getMonth() + 1} / {d.getFullYear()}</Text></Text>
                </View>
            </View>
            <View style={s.container}>
                <View style={s.titleContainer}>
                    <Text style={s.title}>Your Orders</Text>
                    <TouchableOpacity>
                        <Icon name='edit' size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={s.box}>
                    <Text style={s.text}>You have no recent orders.</Text>
                </View>
            </View>
            <TouchableOpacity style={s.button}>
                <Text style={s.logout}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const s = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginTop: 16,
        padding: 8
    },
    box: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 8,
        marginTop: 8,
        borderRadius: 4
    },
    image: {
        width: W(40),
        height: W(40),
        borderRadius: W(20),
        alignSelf: 'center',
        marginBottom: 8
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14
    },
    button: {
        marginTop: 28,
        borderWidth: 1,
        borderColor: 'grey',
        width: '50%',
        padding: 8,
        alignSelf: 'center',
        borderRadius: 8
    },
    logout: {
        fontSize: 16,
        textAlign: 'center'
    }
})

export default ProfileScreen;