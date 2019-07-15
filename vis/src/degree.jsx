import React, { Component } from "react"
import * as d3 from "d3"

class Degree extends Component {
    componentWillReceiveProps(props) {
        const degree = props.degree
        const degreeSVG = d3.select("#degree")
        const padding = 100
        const width = degreeSVG.node().parentNode.clientWidth
        degreeSVG.attr("width", width).attr("height", width)
        var dataset = [
            {x: 20, y: 20},
            {x: 40, y: 40},
            {x: 60, y: 60}
            ];
        const point = degreeSVG
            .append("g")
            // .attr("class", "nodes")
            // .attr("line", [10,20,30,40])
            // .attr("stroke", "white")
            .attr("fill", "white")
            .selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx",function(d){return d.x})
            .attr("cy",function(d){return d.y})
            .attr("r",3)
    }
    render() {
        return <svg id="degree" />
    }
}

export default Degree
