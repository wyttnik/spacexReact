import React from "react";
function LaunchList(props){
    const mouseOver = (e,launch) => {
        props.handler.setTarget(launch.launchpad);
        e.target.style.color='red';
    };

    const mouseOut = (e) => {
        props.handler.setTarget();
        e.target.style.color='';
    };

    return(
        <aside className="aside" id="launchesContainer">
            <ul>
                {props.launches.map(launch=>{
                    return <li key={launch.id} 
                        onMouseOver={(e) => mouseOver(e,launch)}
                        onMouseOut={mouseOut}>{launch.name}</li>
                })}
            </ul>
        </aside>
    )
}

export {LaunchList}