import React from "react"
import * as d3 from "d3"
import "./App.css"
import { Col, Row } from "antd"
import Snapshots from "./snapshots"
import Graph from "./graph"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            snapshots: [],
            graph: {},
            snapnum: 0
        }
    Object.assign(this.state,this.props)
    this.setGraph = this.setGraph.bind(this)
    }

    componentDidMount() {
        d3.json("./test_data.json").then(snapshots => {
            this.setState({
                snapshots: snapshots,
                graph: snapshots[this.state.snapnum].graph
            })
        })
    }

    setGraph(num) {
        if(num !== this.state.snapnum)
            this.setState({snapnum: num, graph: this.state.snapshots[num].graph})
            // d3.select("#graph").remove()
            // this.render()
        // this.render()
    }

    render() {
        const snapshots = this.state.snapshots
        const graph = this.state.graph
        return (
            <div className="App">
                <Row>
                    <Col span={12}>
                        <Snapshots snapshots={snapshots} setnum={this.setGraph} />
                    </Col>
                    <Col span={12}>
                        <Graph graph={graph} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default App
