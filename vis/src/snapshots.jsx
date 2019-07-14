import React, { Component } from "react"
import * as d3 from "d3"

class Snapshots extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(props) {
        const snapshots = props.snapshots
        // console.log(d3.select("#snapshot"))
        const snapshotSVG = d3.select("#snapshot")
        const padding = 100
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
            .attr("stroke", "#d9dde2")
            .attr("stroke-width", 3)
        // console.log(snapshotLink)
        const pointsData = snapshots.map(snpst => snpst.vector)
        const points = snapshotSVG.selectAll("circle").data(pointsData)
        points.exit().remove()
        points
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 5)
            .attr("fill", (d, i) => {
                // t = 255/2500
                // r = (t * i).toString(16)
                // console.log("#" + (Math.floor(255 / 2400 * (i+300))).toString(16) + "F0F0")
                return "#" + "F0F0" + (Math.floor(255 / 2400 * (i+300))).toString(16)
            })
            .attr("stroke", "#A1A1A1")
            .attr("id", (d, i) => {
                return "s" + i
            })
            .on("mouseover", (d, i) => {
                // console.log(d3.select("#s"+i))
                d3.select("#s" + i)
                    .attr("r", 15)
                    // .attr("fill", "#9B30FF")
                // console.log(i)
            })
            .on("mouseout", (d, i) => {
                d3.select("#s" + i)
                    .attr("r", 5)
                    // .attr("fill", "#98F5FF")
            })
            .on("mousedown",(d, i) => {
                this.props.setnum(i)
            })
        // console.log(points.data)
        // console.log(snapshotSVG.selectAll("circle"))
    }
    render() {
        return <svg id="snapshot" />
    }
}

export default Snapshots
