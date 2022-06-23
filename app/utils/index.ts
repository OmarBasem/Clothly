import {Dimensions} from "react-native";

export const sliceArrIntoRows = (data: Array<any>, n: number) => {
    const result = [];
    let temp = [];
    for (let i = 0; i < data.length; ++i) {
        if (i > 0 && i % n === 0) {
            result.push(temp);
            temp = [];
        }
        temp.push(data[i]);
    }
    if (temp.length > 0) {
        while (temp.length !== n) {
            temp.push(null);
        }
        result.push(temp);
    }
    return result;
};

export const W = (percentage: number) => Dimensions.get('window').width / 100 * percentage;
export const H = (percentage: number) => Dimensions.get('window').height / 100 * percentage;