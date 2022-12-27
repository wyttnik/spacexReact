import * as d3 from "d3";
import * as Geo from "../geo.json";
import React, {useRef, useEffect} from "react";

function Map(props){
    if (props.target) {
        let index;
        for (let i = 0; i < props.pads.length; i++)
            if (props.pads[i].id === props.target)
                index = i;
        props.pads.push(props.pads.splice(index,1)[0]);
    }
    const width = 1000;
    const height = 600;
    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 100
    };
    const containerRef = useRef(null);
    useEffect(()=> { 
        d3.select(containerRef.current).select('svg').remove();
        const svg = d3.select(containerRef.current).append("svg");
        svg.selectAll("*").remove();
        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom )
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)

        const projection = d3.geoMercator()
            .scale(70)
            .center([0, 20])
            .translate([width/2 - margin.left, height/2 - margin.top]);

        const featureCollection = {
            features: props.pads.map(d=> {
                return {
                    'type':'Feature',
                    'geometry':{
                        'type':'Point',
                        'coordinates':[d.longitude,d.latitude]
                    },
                    'properties': { 'id':d.id }
                }
            })
        };
        const g = svg.append("g");

        g.selectAll("path")
            .data(Geo.features)
            .enter()
            .append("path")
            .attr("class", "topo")
            .attr("d", d3.geoPath().projection(projection))
            .style("opacity", .7)
        
        g.append("g")
            .attr('class','launchpads')
            .selectAll("path")
            .data(featureCollection.features)
            .enter()
            .append("path")
            .attr('id',d=>d.properties.id)
            .attr("d", d3.geoPath()
                    .projection(projection)
                )
            .attr("fill", (d)=>{
                if (d.properties.id === props.target) return 'red';
                else return 'blue';
            });

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on('zoom', function(event) {
                g.selectAll('path')
                    .attr('transform', event.transform);
            });

        svg.call(zoom); }
    );

    return(
        <div className="mapContainer map" ref={containerRef}>
        </div>
    )
}

export {Map}