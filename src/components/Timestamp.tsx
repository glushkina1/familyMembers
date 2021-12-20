import {Text, View} from "react-native";
import React from "react";


type Props = {
    MemberTimestamp: number,
}

const Timestamp = ({MemberTimestamp}: Props) => {

    const getTimestamp = () => {

        let NowTimestamp = new Date().getTime()/1000;

        if (MemberTimestamp === null ) {
            return 'updating...';
        }

        let diffTimeSecs = Math.round(NowTimestamp - MemberTimestamp)
        let diffTimeMins = Math.round(diffTimeSecs/60)
        let diffTimeHrs = Math.round(diffTimeMins/60)
        let diffDays = Math.round(diffTimeHrs/24)


        return diffDays >= 1 ? (diffDays + ' day(s) ago') :
                diffTimeHrs >= 1 ? (diffTimeHrs + ' hour(s) ago') :
                diffTimeMins >= 1 ? (diffTimeMins + ' min(s) ago') :
                    (diffTimeSecs + ' sec(s) ago')
    };




    return (
        <View>
            <Text style={{ fontVariant:['small-caps']}}>{getTimestamp()}</Text>
        </View>
    );
};

export default Timestamp;
