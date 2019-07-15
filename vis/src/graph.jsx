import React, { Component } from "react"
import * as d3 from "d3"

class Graph extends Component {
    componentWillReceiveProps(props) {
        const graph = props.graph
        // console.log(d3.select("#snapshot"))]
        // console.log(props)
        graph.links = graph.links.map(link =>({
            source: link.source.id ? link.source.id : link.source,
            target: link.target.id ? link.target.id : link.target,
            weight: link.weight
        }))
        graph.nodes = graph.nodes.map(node =>({
            id: node.id,
            cls: node.cls,
            degree: node.degree
        }))
        // console.log(JSON.stringify(graph))
        d3.selectAll("#graph > *").remove()
        const graphSVG = d3.select("#graph")
        // console.log(graphSVG.node())
        const padding = 100
        const width = graphSVG.node().parentNode.clientWidth
        graphSVG.attr("width", width).attr("height", width)
        const simulation = d3
            .forceSimulation()
            .force(
                "link",
                d3.forceLink().id(function(d) {
                    return d.id
                })
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, width / 2))
        simulation.nodes(graph.nodes).on("tick", ticked)
        simulation.force("link").links(graph.links)
        // console.log(JSON.stringify(graph.links))
        // simulation.stop()
        const link = graphSVG
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter()
            .append("line")
            .attr("stroke", "#d9dde2")
        const node = graphSVG
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("r", (d) => {
                return 3 + d.degree/2 > 7 ? 7 : 4 + d.degree/2
            })
            .attr("id", (d,i) => {
                return "gp" + i
            })
            .attr("stroke", "#d9dde2")
            .attr("fill", (d,i)=>{
                if(d.cls==="PC")
                    return "#D9043D"
                else if(d.cls==="PC*")
                    return "#7BB255"
                else if(d.cls==="MP*1")
                    return "#5EBBE7"
                else if(d.cls==="PSI*")
                    return "#F2B705"
                else if(d.cls==="MP*2")
                    return "#F25C05"
                else
                    return "white"
            })
            .on("mouseover", (d, i) => {
                d3.select("#gp" + i)
                    .attr("stroke-width", 4)
                    .attr("stroke", "white")
            })
            .on("mouseout", (d, i) => {
                d3.select("#gp" + i)
                    .attr("stroke-width", 1)
                    .attr("stroke", "#d9dde2")                
            })
            .on("mousedown", (d, i) => {
                this.props.selectpoint(d)
            })

        var dataset = [
            "MP*1","MP*2","PSI*","PC*","PC"
        ];
        var rectHeight = 13;
        const blocks = graphSVG
            .append("g")
            .selectAll("rect")
            .data(dataset)
                .enter()
            .append("rect")
            .attr("x",function(d,i){
                return width-padding*0.8 - i * rectHeight*2.5
            })
            .attr("y",0)
            .attr("width", rectHeight) 
            .attr("height", rectHeight)
            .attr("fill", (d,i)=>{
                if(d==="MP*1")
                    return "#F25C05"
                else if(d==="MP*2")
                return "#F2B705"
                else if(d==="PSI*")
                    return "#5EBBE7"
                else if(d==="PC*")
                    return "#7BB255"
                else if(d==="PC")
                    return "#D9043D"
            })
            
        const text = graphSVG
            .append("g")
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("x",function(d,i){
                return width-padding*0.8 - i * rectHeight*2.5
            })
            .attr("y",25)
            .attr("fill","white")
            .attr("font-size",10)
            .attr("font-family","Arial")
            .attr("stroke","white")
            .attr("stroke-width",".5")
            .text((d,i)=>d)
            
        // console.log(node)
        function ticked() {
            // console.log(graph.nodes)
            let max = {}
            let min = {}
            max.x = d3.max(graph.nodes, n => n.x)
            max.y = d3.max(graph.nodes, n => n.y)
            min.x = d3.min(graph.nodes, n => n.x)
            min.y = d3.min(graph.nodes, n => n.y)
            const xScale = d3
                .scaleLinear()
                .domain([min.x, max.x])
                .range([padding, width - padding])
            const yScale = d3
                .scaleLinear()
                .domain([min.y, max.y])
                .range([padding, width - padding])
            link.attr("x1", function(d) {
                return xScale(d.source.x)
            })
                .attr("y1", function(d) {
                    return yScale(d.source.y)
                })
                .attr("x2", function(d) {
                    return xScale(d.target.x)
                })
                .attr("y2", function(d) {
                    return yScale(d.target.y)
                })
                .attr("stroke-width", (d) => {
                    // return 7
                    return 1+ d.weight/15 > 7 ? 7 : 1+ d.weight/15
                })
            node.attr("cx", function(d) {
                return xScale(d.x)
            }).attr("cy", function(d) {
                return yScale(d.y)
            })
        }
    }
    render() {
        return <svg id="graph" />
    }
}

export default Graph
