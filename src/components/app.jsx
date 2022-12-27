import {LaunchList} from "./launchList";
import {Map} from "./map";
import React, {useEffect, useState} from "react";
import {SpaceX} from "../api/spacex";

function App(){

    const [launches, setLaunches] = useState();
    const [pads, setPads] = useState();
    const [target, setTarget] = useState();
    const spacex = new SpaceX();
    
    useEffect(()=>{
        spacex.launches().then(data =>{
            spacex.launchpads().then(pads=>{
                setLaunches(data);
                setPads(pads);
            })
        })
    },[])

    return(
        <main className='main'>
            {launches && <LaunchList launches = {launches} handler = {{setTarget}}/>}
            {pads && <Map pads = {pads} target={target}/>}
        </main>
    )
}

export {App};