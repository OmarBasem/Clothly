import {NativeStackNavigationProp} from "react-native-screens/native-stack";

export type HomeStackParamList = {
    Home: undefined,
    Product: undefined
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList>;
