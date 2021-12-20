import React from "react";
import {Text, View} from "react-native";

type Props = {
    MemberLatitude: number,
    MemberLongitude: number,
    MainUserLatitude: number,
    MainUserLongitude: number,
}

const Distance = ({MemberLatitude, MemberLongitude, MainUserLatitude, MainUserLongitude} : Props) => {

     const getDistance = () => {
         if (MemberLatitude == null || MemberLongitude == null ) {
             return -1;
         }

         let R = 6371; // km
         let dLat = toRad(MainUserLatitude - MemberLatitude);
         let dLon = toRad(MainUserLongitude - MemberLongitude);
         let lat1 = toRad(MemberLatitude);
         let lat2 = toRad(MainUserLatitude);

         let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
         let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
         return Math.round(R * c) + ' km';

         function toRad(Value) {
             return Value * Math.PI / 180;
         }
     };



    return (
      <View style={{flexDirection:'row'}}>
         <Text style={{ fontVariant:['small-caps']}}>{ getDistance()}</Text>
      </View>
    );
};

export default Distance;
