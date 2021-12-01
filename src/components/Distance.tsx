import React from "react";
import {useSelector} from "react-redux";


export const distanceCalculation = (userPhoneNumber, memberPhoneNumber) => {

    const members = useSelector((state: any) => state.members);
    let User = members.filter(el => el.phoneNumber == userPhoneNumber)
    let Member = members.filter(el => el.phoneNumber == memberPhoneNumber)
    console.log('mam',User,Member)

    // let latUsr = ;
    // let lonUser = ;
    // let latMember =;
    // let longMember = ;
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
    //
    // function toRad(Value)
    // {
    //     return Value * Math.PI / 180;
    // }
    return 33;
};

