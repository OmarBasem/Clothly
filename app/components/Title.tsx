import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {theme} from "../styles";


// Screens Title component
const Title = ({text} : {text: string}) => {
    return (
        <Text numberOfLines={1} style={[s.title, {
            color: theme.mainColor,
            textAlign: 'center',
        }]}>{text}</Text>
    )
}

const s = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: 28,
        zIndex: 100,
        textAlign: 'left',
    }
});


export default Title;
