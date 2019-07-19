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
        const padding = 80
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
            .attr("stroke", "rgba(255,255,255,0.5)")
            .attr("stroke-width", function(d){return Math.sqrt(d.weight)})


            var a0 = d3.rgb(205,0,0);
            var b0 = d3.rgb(240,148,148);
   
            var a1 = d3.rgb(0,90,0);
            var b1 = d3.rgb(144,238,144);
   
            var a2 = d3.rgb(75,10,130);
            var b2 = d3.rgb(147,112,219);
   
            var a3 = d3.rgb(0,0,156);
            var b3 = d3.rgb(0,191,255);
   
            var a4 = d3.rgb(210,105,30);
            var b4 = d3.rgb(255,215,0);
   
            //color0
           var defs = graphSVG.append("defs")
           var linearGradient = defs.append("linearGradient")
                                    .attr("id","color0")
                                    .attr("x1","0%")
                                    .attr("y1","0%")
                                    .attr("x2","100%")
                                    .attr("y2","0%");
                                     
           linearGradient.append("stop")
                              .attr("offset","0%")
                              .style("stop-color",a0.toString());
          
           linearGradient.append("stop")
                              .attr("offset","100%")
                              .style("stop-color",b0.toString());
           
           //color1         
           var linearGradient1 = defs.append("linearGradient")
                                    .attr("id","color1")
                                    .attr("x1","0%")
                                    .attr("y1","0%")
                                    .attr("x2","100%")
                                    .attr("y2","0%");
                                                        
           linearGradient1.append("stop")
                                    .attr("offset","0%")
                                    .style("stop-color",a1.toString());
                             
           linearGradient1.append("stop")
                                    .attr("offset","100%")
                                    .style("stop-color",b1.toString());
           //color2         
           var linearGradient2 = defs.append("linearGradient")
                                    .attr("id","color2")
                                    .attr("x1","0%")
                                    .attr("y1","0%")
                                    .attr("x2","100%")
                                    .attr("y2","0%");
                                                        
           linearGradient2.append("stop")
                                    .attr("offset","0%")
                                    .style("stop-color",a2.toString());
                             
           linearGradient2.append("stop")
                                    .attr("offset","100%")
                                    .style("stop-color",b2.toString());
           
           //color3         
           var linearGradient3 = defs.append("linearGradient")
                                    .attr("id","color3")
                                    .attr("x1","0%")
                                    .attr("y1","0%")
                                    .attr("x2","100%")
                                    .attr("y2","0%");
                                                        
           linearGradient3.append("stop")
                                    .attr("offset","0%")
                                    .style("stop-color",a3.toString());
                             
           linearGradient3.append("stop")
                                    .attr("offset","100%")
                                    .style("stop-color",b3.toString());
   
           //color4         
           var linearGradient4 = defs.append("linearGradient")
                                    .attr("id","color4")
                                    .attr("x1","0%")
                                    .attr("y1","0%")
                                    .attr("x2","100%")
                                    .attr("y2","0%");
                                                        
           linearGradient4.append("stop")
                                    .attr("offset","0%")
                                    .style("stop-color",a4.toString());
                             
           linearGradient4.append("stop")
                                    .attr("offset","100%")
                                    .style("stop-color",b4.toString());
   
           const node = graphSVG
               .append("g")
               .attr("class", "nodes")
               .selectAll("circle")
               .data(graph.nodes)
               .enter()
               .append("circle")
              // .attr("stroke", "#FFFFFF")
               .attr("r", (d) => {
                   return 2 + d.degree > 9 ? 9 : 4 + d.degree
               })
               .attr("id", (d,i) => {
                   return "gp" + i
               })
               .attr("stroke", "rgba(0,0,0,0.4)")
               .attr("fill", (d,i)=>{
                   if(d.cls==="PC")
                       return "url(#color0)"
                   else if(d.cls==="PC*")
                       return "url(#color1)"
                   else if(d.cls==="MP*1")
                       return "url(#color2)"
                   else if(d.cls==="PSI*")
                       return "url(#color3)"
                   else if(d.cls==="MP*2")
                       return "url(#color4)"
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
                    .attr("stroke", "rgba(0,0,0,0.4)")                
            })
            .on("mousedown", (d, i) => {
                this.props.selectpoint(d)
            })
        
        var dataset = [
            "MP*1","MP*2","PSI*","PC*","PC"
        ];
        var rectHeight = 13;
        graphSVG
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
                if(d==="PC")
                return "url(#color0)"
            else if(d==="PC*")
                return "url(#color1)"
            else if(d==="MP*1")
                return "url(#color2)"
            else if(d==="PSI*")
                return "url(#color3)"
            else if(d==="MP*2")
                return "url(#color4)"
            else
                return "white"
            })
         
        
        graphSVG
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
            node.attr("cx", function(d) {
                return xScale(d.x)
            }).attr("cy", function(d) {
                return yScale(d.y)
            })
        }
    }
    render() {
        return <svg id="graph"/>
    }
}

export default Graph
