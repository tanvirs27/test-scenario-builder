import React from 'react';
import Card from '../components/Card'
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
                        <button className="btn btn-sm btn-primary" onClick={(e) => target.openAddInputForm(e, test.key)} >Add Input</button>
                    </span>
                </div>

                {test.inputs.map((input) => {
                    return <Card title={input.name}
                        headerRight={
                            <>
                                <button className="btn btn-sm btn-primary" style={{ marginRight: 10 }} onClick={(e) => target.openEditInputForm(e, input.key, test.key)} >Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={(e) => target.removeInput(e, input.key, test.key)} >Remove</button>
                            </>
                        }
                        body={makeSingleTestComponent(input)} />
                })}

            </div>

            <div className="card-body">
                <Card title="Action"
                    headerRight={
                        <>
                            <button className="btn btn-sm btn-primary" style={{ marginRight: 10 }} onClick={(e) => target.openEditActionForm(e, test.key)} >Edit</button>
                        </>
                    }
                    body={makeSingleTestComponent(test.action)} />
            </div>

            <div className="card-body">
                <div className="card-header">
                    <span className="card-title h5">Outputs</span>
                    <span className="float-sm-right">
                        <button className="btn btn-sm btn-primary" onClick={(e) => target.openAddOutputForm(e, test.key)} >Add Output</button>
                    </span>
                </div>

                {test.outputs.map((output) => {
                    return <Card title={output.name}
                        headerRight={
                            <>
                                <button className="btn btn-sm btn-primary" style={{ marginRight: 10 }} onClick={(e) => target.openEditOutputForm(e, output.key, test.key)} >Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={(e) => target.removeOutput(e, output.key, test.key)} >Remove</button>
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
