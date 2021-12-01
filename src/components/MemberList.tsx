import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Provider} from "react-native-paper";
import {resetEverything, updateMemberLocation} from '../store/memberActions';
import {getCurrentLocation} from "../firebase.config"
import FlatListWeb from "./FlatListWeb";
import FlatListMobile from "./FlatListMobile";

export const MemberList = ({navigation}) => {

    const userPhoneNumber: number = 79955981630;
    const dispatch = useDispatch();
    // dispatch(resetEverything())



    const members = useSelector((state: any) => state.members);
    console.log(members)


    useEffect(() => {
        const interval = setInterval(async () => {
            members.map(function (el) {
                getCurrentLocation(el.phoneNumber, (locationParams: any) => {
                    let userLat = locationParams.latitude;
                    let userLon = locationParams.longitude;
                    // console.log('get data every 1min',userLon,userLat)
                    dispatch(updateMemberLocation(el.phoneNumber, userLat, userLon))
                })
            })
        }, 9999999999);

        return () => clearInterval(interval);
    },[]);

    return (
        <Provider>
                {Platform.OS === "web" ?
                    <FlatListWeb navigation={navigation}/>
                    : <FlatListMobile navigation={navigation}/>}
        </Provider>
    )
}

export default MemberList;
