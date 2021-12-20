import React, {useState} from 'react';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {Provider} from "react-native-paper";
import FlatListWeb from "./FlatListWeb";
import FlatListMobile from "./FlatListMobile";
import {startListenLocation} from "../memberLocationListener";

type Props = {
    navigation: any,
}

export const MemberList = ({navigation}: Props) => {
    const [disableListener, setDisableListener] = useState(false);
    const members = useSelector((state: any) => state.members);
    const mainUser = useSelector((state: any) => state.myLocation);

    if (disableListener === false) {
        setDisableListener(true)
        members.map(function (member) {
            startListenLocation(member.phoneNumber)
        })

    }

    return (
        <Provider>
            {Platform.OS === "web" ?
                <FlatListWeb navigation={navigation} members={members} mainUser={mainUser}/>
                : <FlatListMobile navigation={navigation} members={members} mainUser={mainUser}/>}
        </Provider>
    )
}

export default MemberList;


