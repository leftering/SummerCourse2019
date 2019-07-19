import React from "react"
import * as d3 from "d3"
import "./App.css"
import { Col, Row, Button } from "antd"
import Snapshots from "./snapshots"
import Graph from "./graph"
import Degree from "./degree"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snapshots: [],
            graph: {},
            node: {},
            snapnum: 0,
            spoint:{},
            datasetpath:0
        }
    Object.assign(this.state,this.props)
    this.setGraph = this.setGraph.bind(this)
    this.setDegree = this.setDegree.bind(this)
    this.selectpoint = this.selectpoint.bind(this)
    }

    componentDidMount() {
        d3.json("./t-SNE_data.json").then(snapshots => {
            // console.log(snapshots[0].graph);
            this.setState({
                snapshots: snapshots,
                graph: snapshots[this.state.snapnum].graph,
                //node: snapshots[this.state.snapnum].graph.nodes
            })
        })
    }

    selectpoint(d){
        this.setState({
            spoint:d
        })
    }

    setGraph(num) {
        // if(num !== this.state.snapnum)
        this.setState({
            snapnum: num,
            graph: this.state.snapshots[num].graph
        })
            // d3.select("#graph").remove()
            // this.render()
        // this.render()
    }

    setDegree(num) {
        // if(num !== this.state.snapnum)
        this.setState({
            snapnum: num,
           // node: this.state.snapshots[num].graph.nodes
            graph: this.state.snapshots[num].graph
        })

            // d3.select("#graph").remove()
            // this.render()
        // this.render()
    }

    render() {
        const snapshots = this.state.snapshots
        const graph = this.state.graph
        const degree = this.state.degree
        return (
            <div className="App">
                <Row span={1}> <div><h1/></div></Row>
                <Row>
                    <Col span={4} >
                        <Row span={1}>
                            <h3 className="TextColor">><font color="white">Degree Distribution</font></h3>
                        </Row>
                        <div className="DColor">
                        <Degree graph={graph} />
                        <Row span={1}>
                            <div className="textColor">
                                <font color="white">Name: {this.state.spoint.id + this.state.spoint.cls ? this.state.spoint.id + this.state.spoint.cls : ""}</font>
                                <br/>
                                <font color="white">Degree: {this.state.spoint.degree}</font>
                            </div>
                            <div>
                                {/* <Button onClick={this.sdataset}>Change sDataSet</Button> */}
                                {/* <Button onclick={this.sdataset}>DataSet 2</Button> */}
                            </div>
                        </Row>
                        </div>
                    </Col>
                    <Col span={10}>
                        <div className="AColor">
                            <h1><big><font color="grey">&ensp;PROJECTION</font></big></h1>
                            <Snapshots snapshots={snapshots} setnum={this.setGraph} />
                        </div>
                    </Col>
                    <Col span={10}>
                        <div className="BColor BGraph">
                            <h1><big><font color="grey">&ensp;&ensp;NETWORK</font></big></h1>
                            <Graph graph={graph} selectpoint={this.selectpoint} />
                        </div>
                    </Col>
                </Row>
                <Row span={1}> <div><h1/></div></Row>
            </div>
        )
    }
}
export default App