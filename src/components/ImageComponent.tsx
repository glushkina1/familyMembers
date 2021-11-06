import React, {useEffect} from "react";
import {Image, Platform, StyleSheet, Text, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {Button} from "react-native-paper";


type Props = {
    personImage: string,
    setPersonImage: (currency: string) => void,
}

const ImageComponent = ({personImage, setPersonImage}:Props) => {

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (result.cancelled === false) {
            setPersonImage(result.uri);
        }
    };


    return (
        <View>
            {personImage ?
                <View style={{flexDirection: 'row'}}>
                    <Image
                        source={{uri: personImage}}
                        style={{width: 70, height: 70}}
                    />
                    <Button icon='delete'
                            mode='text'
                            style={{justifyContent: 'center', alignItems: 'center'}}
                            labelStyle={{color: '#D73A3A', fontSize: 25}}
                            onPress={() => setPersonImage(null)}>
                    </Button>
                </View>
                : <Button style={styles.imagePickerButton}
                          icon='camera'
                          mode='text'
                          labelStyle={styles.labelStyleImagePicker}
                          onPress={pickImage}>
                    <Text style={styles.imagePickerButtonText}>Choose an image for your member</Text>
                </Button>}
        </View>


    )

};

const styles = StyleSheet.create({
    imagePickerButton: {
        ...Platform.select({
            ios: {
                width: '80%',
            },
            web: {},
            android: {
                width: '80%',
            }
        }),
        marginTop: 10,
        backgroundColor: '#ddd'
    },
    imagePickerButtonText: {
        ...Platform.select({
            ios: {
                width: '90%',
                fontSize: 13,
            },
            web: {},
            android: {
                width: '90%',
            }
        }),
    },
    labelStyleImagePicker: {
        color: '#aaa',
        marginTop: 10,
    },


});

export default ImageComponent;
