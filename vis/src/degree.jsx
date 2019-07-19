import React, { Component } from "react"
import * as d3 from "d3"

class Degree extends Component {
    // constructor(props) {
    //     super(props)
    // }

    componentWillReceiveProps(props) {
    
        const graph = props.graph
   //     graph.nodes = graph.nodes.map(node =>({
     //       degree: node.degree
       // }))
        d3.selectAll("#degree > *").remove()
     
        const degreeSVG = d3.select("#degree")
        // const padding = 100
        const width = degreeSVG.node().parentNode.clientWidth
        degreeSVG.attr("width", width).attr("height", width)
        
        //统计度的分布 遍历所有，统计度数    
        
     //   var degreeData = []
        var degreeNum = [0,0,0,0,0,0,0,0,0,0]

        for(let j=0;j < graph.nodes.length;j++){
           degreeNum[Math.floor(Math.log(graph.nodes[j].degree)/Math.log(2))]++;
        }
        
        var padding2 = {left:30, right:15, top:15, bottom:30};

        const xScale2 = d3
            .scaleLinear()
            .domain([0,9])
            .range([padding2.left, width - padding2.right])

        const yScale2 = d3
            .scaleLinear()
            .domain([0, 60])
            .range([width-padding2.bottom-padding2.top, padding2.top])
        
    /*   let tooltip = d3.select('body')
      	    .append('div')
      	    .style('position', 'absolute')
            .style('z-index', '10')
      	    .style('color', 'red')
            .style('visibility', 'hidden')   // 是否可见（一开始设置为隐藏）
            .style('font-size', '12px')
      	    .style('font-weight', 'bold')
      	    .text('')*/

        degreeSVG
                .append("g")
            // .attr("class", "nodes")
            .attr("fill","white")
            .selectAll("circle")
            .data(degreeNum)
            .enter()
            .append("circle")
            .attr("cx",function(d,i){return xScale2(i)})
            .attr("cy",function(d){return yScale2(d)})
            .attr("r",3)
            .attr("id",(d,i) =>{
                return "c" + i
            })
            .on ("mouseover",(d,idx) =>{
                d3.select("#c" + idx)
                    .attr("stroke","red")
                    .attr("stoke-width",2)

            degreeSVG
                    .append("g")
                    .attr("class","idname")
                    .selectAll("text")
                    .data(degreeNum)
                    .enter()
                    .append("text")
                    .attr("x",function(d,i){
                        console.log(i,idx);
                        if(i===idx)
                            return xScale2(i);
                        else 
                            return 1000000000000})
                    .attr("y",function(d){return yScale2(d)-10})
                    .attr("fill","white")
                    .attr("font-size",10)
                    .text((d,i)=>{return d.toString()})
                    })
            .on ("mouseout",(d,i)=>{
                d3.select("#c" + i)
                    .attr("stroke","white")
                    .attr("stoke-width",2)
                console.log('hello',i,d)
                // d3.select(".idname").selectAll("text").remove()
                d3.select(".idname").remove()
            })
      

         var degreeLink =[]
         for(let i=0;i<degreeNum.length -1;i++){
            degreeLink.push([
                xScale2(i),
                yScale2(degreeNum[i]),
                xScale2(i+1),
                yScale2(degreeNum[i+1])
            ])
         }
        
        degreeSVG
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(degreeLink)
            .enter()
            .append("line")
            .attr("x1",function(d){return d[0]})
            .attr("y1",function(d){return d[1]})
            .attr("x2",function(d){return d[2]})
            .attr("y2",function(d){return d[3]})
            .attr("stroke", "#FFFFFF")
            var dataset1 = ["1-", "2-", "4-", "8-", "16-", "32-", "64-","128-","256-","512-"];
            var dataset2 = ["1","3","7","15","31","63","127","255","511","1023"];
            var dataset3 = ["0","9","18","27","36","45","54"];
           // var strs = {}
           /* for(var i=0;i<dataset2.length;i++)
            {
                for(var j=0;j<dataset2[i].length;j++){
                     strs[i][j] = dataset2[i].split("-")

                }
               
            }*/
            
            //console.log(strs);
        degreeSVG
            .append("g")
            .selectAll("text")
            .data(dataset1)
            .enter()
            .append("text")
            //.selectAll("tspan")
            //.append("tspan")
            .attr("x",function(d,i){
                return  xScale2(i)-5
            })
            .attr("y",width-padding2.bottom/5*4)
            .attr("dy","1em")
            .attr("fill","white")
            .attr("font-size",8)
            .attr("font-family","Arial")
            .text((d,i)=>d)

        degreeSVG
            .append("g")
            .selectAll("text")
            .data(dataset2)
            .enter()
            .append("text")
            .attr("x",function(d,i){
                return  xScale2(i)-5
            })
            .attr("y",width-padding2.bottom/2)
            .attr("dy","1em")
            .attr("fill","white")
            .attr("font-size",8)
            .attr("font-family","Arial")
            .text((d,i)=>d)


        degreeSVG
            .append("g")
            .selectAll("text")
            .data(dataset3)
            .enter()
            .append("text")
            .attr("x", padding2.left/3)
            .attr("y",function(d,i){
                return yScale2(i*9)-5
            })
            .attr("dy","1em")
            .attr("fill","white")
            .attr("font-size",8)
            .attr("font-family","Arial")
            .text((d,i)=>d)


      /*  
            
            //x轴的比例尺
            var xScale = d3.scaleBand()
    		.domain(dataset2)
            .range([0,width-padding2.left-padding2.right]);
            
        var g = degreeSVG.append("g");
        var xAxis = d3.axisBottom(xScale)
                    
        g.append("g")
        .attr("transform","translate("+padding2.left+","+(width-padding2.top-padding2.bottom)+")")
        .attr("color","white")
        .attr("font-size",3)
        .call(xAxis);
        
 */
   
    }
    
    render() {
    return <svg id="degree" />
    }
}

export default Degree
