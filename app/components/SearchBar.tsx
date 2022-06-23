import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import IoIcon from "react-native-vector-icons/Ionicons";
import {theme} from "../styles";
import {W} from '../utils'
import {useDispatch} from "react-redux";
import {filterProducts} from "../reducers/products";

const SearchBar = () => {
    const [input, setInput] = useState('')
    const dispatch = useDispatch();
    const search = (input: string) => {
        setInput(input)
        dispatch(filterProducts(input))
    }
    return (
        <View style={s.container}>
            <TextInput style={s.input} selectionColor={theme.mainColor} placeholder='SEARCH'
                       value={input}
                       onChangeText={search} testID='SearchBar'/>
            <IoIcon name='ios-search' color='grey' size={20} style={s.search}/>
        </View>
    )
}

const s = StyleSheet.create({
    input: {
        width: W(96),
        height: 40,
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'grey',
        fontSize: 16,
        paddingLeft: 8,
        paddingRight: 32,
        marginBottom: 4,
    },
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    cancel: {
        position: 'absolute',
        right: 4,
        top: 24
    },
    search: {
        position: 'absolute',
        zIndex: 1,
        right: 8,
        top: 8
    }
});

export default SearchBar;