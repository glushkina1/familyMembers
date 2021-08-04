import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Person {
    readonly id: string;
    name: string;
    sex: string;
    relationship: string;
    picture: string;
    // distance: string;
}

    export const savePerson = async (Person) => {
        try {
            const jsonValue = JSON.stringify(Person)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }


    export const getPerson = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e)
        }
    }



