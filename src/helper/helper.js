import React from 'react';
import DynamicForm from '../components/DynamicForm'
import Card from '../components/Card'
import Table from '../components/Table'
import LabelValue from '../components/LabelValue'

var target;

function makeSingleTestComponent(component) {
    return <>
        <LabelValue label="Type" value={component.type} />
        <LabelValue label="Selector" value={component.selector} />
        <LabelValue label="Value" value={component.value} />
        <LabelValue label="Wait For Selector" value={component.waitForSelector} />
    </>;
}

// action: <><span onClick={(e) => this.openEditTestForm(e, model.id)}> <MdEdit /> </span>
        //   <span onClick={(e) => this.removeParam(e, model.id)}> <MdDelete /></span> </>

function makeSingleTest(test) {
    return <>
        <div className="card">
            <div className="card-header">
                <span className="card-title h5">{test.name} :: (Type: {test.type})</span>
                <span className="float-sm-right">
                    <button className="btn btn-sm btn-primary" style={{ marginRight: 10 }} onClick={(e) => target.openEditTestForm(e, test.key)} >Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={(e) => target.removeTest(e, test.key)} >Remove</button>
                </span>

            </div>
            <div className="card-body">
                <div className="card-header">
                    <span className="card-title h5">Inputs</span>
                    <span className="float-sm-right">
                        <button className="btn btn-sm btn-primary" onClick="" >Add Input</button>
                    </span>
                </div>

                {test.inputs.map((input) => {
                    return <Card title={input.name}
                        headerRight={
                            <>
                                <button className="btn btn-sm btn-primary" style={{ marginRight: 10 }} onClick="" >Edit</button>
                                <button className="btn btn-sm btn-danger" onClick="" >Remove</button>
                            </>
                        }
                        body={makeSingleTestComponent(input)} />
                })}

            </div>

            <div className="card-body">
                <Card title="Action"
                    headerRight={
                        <>
                            <button className="btn btn-sm btn-primary" style={{ marginRight: 10 }} onClick="" >Edit</button>
                            <button className="btn btn-sm btn-danger" onClick="" >Remove</button>
                        </>
                    }
                    body={makeSingleTestComponent(test.action)} />
            </div>

            <div className="card-body">
                <div className="card-header">
                    <span className="card-title h5">Outputs</span>
                    <span className="float-sm-right">
                        <button className="btn btn-sm btn-primary" onClick="" >Add Output</button>
                    </span>
                </div>

                {test.outputs.map((output) => {
                    return <Card title={output.name}
                        headerRight={
                            <>
                                <button className="btn btn-sm btn-primary" style={{ marginRight: 10 }} onClick="" >Edit</button>
                                <button className="btn btn-sm btn-danger" onClick="" >Remove</button>
                            </>
                        }
                        body={makeSingleTestComponent(output)} />
                })}

            </div>
        </div>
    </>;
}

export default function makeTestsList(tests, instance) {
    target = instance;
    return tests.map((test) => makeSingleTest(test));
}
