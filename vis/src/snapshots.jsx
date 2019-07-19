import React, { Component } from "react"
import * as d3 from "d3"

class Snapshots extends Component {
    // constructor(props) {
        // super(props)
    // }

    componentWillReceiveProps(props) {
        const snapshots = props.snapshots
        // console.log(d3.select("#snapshot"))
        const snapshotSVG = d3.select("#snapshot")
        const padding = 40
        const width = snapshotSVG.node().parentNode.clientWidth
        snapshotSVG.attr("width", width).attr("height", width)

        const max = {}
        const min = {}
        max.x = d3.max(snapshots, snpst => snpst.vector[0])
        max.y = d3.max(snapshots, snpst => snpst.vector[1])
        min.x = d3.min(snapshots, snpst => snpst.vector[0])
        min.y = d3.min(snapshots, snpst => snpst.vector[1])
        const xScale = d3
            .scaleLinear()
            .domain([min.x, max.x])
            .range([padding, width - padding])
        const yScale = d3
            .scaleLinear()
            .domain([min.y, max.y])
            .range([padding, width - padding])
        const snapshotLinkData = []
        // console.log(snapshotLinkData)
        for (let i = 0; i < snapshots.length - 1; i++) {
            snapshotLinkData.push([
                snapshots[i].vector,
                snapshots[i + 1].vector
            ])
        }
        const snapshotLink = snapshotSVG
            .selectAll("line")
            .data(snapshotLinkData)
        snapshotLink.exit().remove()
        snapshotLink
            .enter()
            .append("line")
            .attr("x1", d => xScale(d[0][0]))
            .attr("x2", d => xScale(d[1][0]))
            .attr("y1", d => yScale(d[0][1]))
            .attr("y2", d => yScale(d[1][1]))
            .attr("stroke", "#FFFFFF")
            .attr("stroke-width", 1)
        // console.log(snapshotLink)
        const pointsData = snapshots.map(snpst => snpst.vector)
        const points = snapshotSVG.selectAll("circle").data(pointsData)
        points.exit().remove()

        //加入渐变
        var maxvalue = d3.max(snapshots,function(d,i){return i});
        var minvalue = 0;
        var linear = d3.scaleLinear()
                        .domain([minvalue,maxvalue])
                        .range([0,1]);
        
        var a = d3.rgb(255,251,213);
        var b = d3.rgb(178,10,44);

        var computeColor = d3.interpolate(a,b);
        
        //加入颜色标志
        var defs = snapshotSVG.append("defs")
        var linearGradient = defs.append("linearGradient")
                            .attr("id","linearGradient")
                            .attr("x1","0%")
                            .attr("y1","0%")
                            .attr("x2","100%")
                            .attr("y2","0%");
                           
        linearGradient.append("stop")
                    .attr("offset","0%")
                    .style("stop-color",a.toString());

        linearGradient.append("stop")
                    .attr("offset","100%")
                    .style("stop-color",b.toString());
        
        snapshotSVG.append("rect")
                    .attr("x", width-150)
                    .attr("y", 0)
                    .attr("width", 120)
                    .attr("height", 10)
                    .attr("stroke","grey")
                    .attr("stroke-width",2)
                    .style("fill","url(#" + linearGradient.attr("id") + ")");

        snapshotSVG.append("text")
                    .attr("class","valueText")
                    .attr("x", width-180)
                    .attr("y", 28)
                    .attr("fill","white")
                    .attr("font-size",10)
                    .text("2012-11-19 06:30");

        snapshotSVG.append("text")
                    .attr("class","valueText")
                    .attr("x", width-80)
                    .attr("y", 28)
                   // .attr("dy", "-0.3em")
                    .attr("fill","white")
                    .attr("font-size",10)
                    .text("2012-11-27 16:14");

        //画点
        points
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 4)
            .attr("fill", (d, i) => {
                var t = linear(i);
                var color = computeColor(t);
                return color.toString();

                // t = 255/2500
                // r = (t * i).toString(16)
                // console.log("#" + (Math.floor(255 / 2400 * (i+300))).toString(16) + "F0F0")
                //return "#" + "dc9f" + (Math.floor(255 / 2400 * (i+300))).toString(16)
            })
            .attr("stroke", "rgba(0,0,0,0.4)")
            .attr("stroke-width",1)
            .attr("id", (d, i) => {
                return "s" + i
            })
            .on("mouseover", (d, i) => {
                // console.log(d3.select("#s"+i))
                d3.select("#s" + i)
                   .attr("r", 6)
                   .attr("stroke","white")
                   .attr("stroke-width",5)
                    //this.props.setnum(i)
                    // .attr("fill", "#9B30FF")
                // console.log(i)
            })
            .on("mouseout", (d, i) => {
                d3.select("#s" + i)
                    .attr("r", 4)
                    .attr("stroke", "rgba(0,0,0,0.4)")
                    .attr("stroke-width",1)
                    // .attr("fill", "#98F5FF")
            })
            .on("mousedown",(d, i) => {
                 d3.select("#s" + i)
                    .attr("r", 6)
                    this.props.setnum(i)
                    // .attr("fill", "#9B30FF")
               // this.props.setnum(i)
            })
        // console.log(points.data)
        // console.log(snapshotSVG.selectAll("circle"))
    }
    render() {
        return <svg id="snapshot" />
    }
}

export default Snapshots
