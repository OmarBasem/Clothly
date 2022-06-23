import {DefaultTheme} from "@react-navigation/native";

export const theme = {
    mainColor: '#1C284F'
}


export const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff'
    },
};
