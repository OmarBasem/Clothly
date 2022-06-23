import React from 'react';
import {TouchableOpacity, Platform, StyleSheet, GestureResponderEvent} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../styles'

interface IBackProps {
    onPress: ((event: GestureResponderEvent) => void),
}

// Navigation back button
const Back = (props: IBackProps) => {
    return (
        <TouchableOpacity activeOpacity={1} style={s.back}
                          onPress={props.onPress} hitSlop={{right: 40}} testID='back'>
            <Icon name={Platform.OS === 'ios' ? 'chevron-back' : 'md-arrow-back'} size={40} color={theme.mainColor}/>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    back: {
        marginLeft: 8,
        flexDirection: 'row'
    },
});

export default Back;