import React from "react";
import {useSelector} from "react-redux";


export const distanceCalculation = (userPhoneNumber, memberPhoneNumber) => {

    const members = useSelector((state: any) => state.members);
    let member = members.filter(el => el.phoneNumber == 89178370684)
    console.log('member',member[0].latitude, member[0].longitude)


    //
    // latUsr, lonUser, latMember, longMember
    //
    //     let R = 6371; // km
    //     let dLat = toRad(latUsr-latMember);
    //     let dLon = toRad(lonUser-longMember);
    //     let lat1 = toRad(latMember);
    //     let lat2 = toRad(latUsr);
    //
    //     let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    //         Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    //     let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    //     return R * c;

    // Converts numeric degrees to radians
    function toRad(Value)
    {
        return Value * Math.PI / 180;
    }
};

