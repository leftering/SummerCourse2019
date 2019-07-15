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
            degree: {},
            snapnum: 0,
            spoint: {},
            datasetpath: 0
        }
    Object.assign(this.state,this.props)
    this.setGraph = this.setGraph.bind(this)
    this.setDegree = this.setDegree.bind(this)
    this.selectpoint = this.selectpoint.bind(this)
    }

    componentDidMount() {
        d3.json("./t-SNE_data2.json").then(snapshots => {
            // console.log(snapshots)
            this.setState({
                snapshots: snapshots,
                graph: snapshots[this.state.snapnum].graph,
                degree: snapshots[this.state.snapnum].degree
            })
        })
    }

    selectpoint(d) {
        // console.log(d)
        this.setState({
            spoint: d
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
            degree: this.state.snapshots[num].degree
        })
            // d3.select("#graph").remove()
            // this.render()
        // this.render()
    }

    // sdataset = () => {
    //     if(this.state.datasetpath === 1) {
    //         this.setState({
    //             datasetpath: 0
    //         })
    //     }
    //     else {
    //         this.setState({
    //             datasetpath: 1
    //         })
    //     }
    // }

    render() {
        const snapshots = this.state.snapshots
        const graph = this.state.graph
        const degree = this.state.degree
        return (
            <div className="App">
                <Row span={1}>
                <div>
                    <h1> </h1>
                </div>
                </Row>
                <Row>
                    <Col span={4} >
                        <Row span={1}>
                            <h3><font color="grey">Degree Distribution</font></h3>
                        </Row>
                        <div className="BDColor">
                        <Degree degree={degree}/>
                        <Row span={1}>
                            <div>
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
                        <div className="BDColor BGraph">
                            <h1><big><font color="grey">&ensp;&ensp;NETWORK</font></big></h1>
                            <Graph graph={graph} selectpoint={this.selectpoint} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default App
