import React from 'react';
import DynamicForm from './components/DynamicForm'
import Card from './components/Card'
import Table from './components/Table'
import LabelValue from './components/LabelValue'
import './css/theme.css';
import { MdEdit, MdDelete } from 'react-icons/md';

import makeTestsList from './helper/helper';

const paramFormModel = [
  { key: "name", label: "Name", props: { required: true } },
  { key: "value", label: "Value", props: { required: true } }
];

const paramsTableHeaders = [
  { key: "name", value: "Name" },
  { key: "value", value: "Value" },
  { key: "action", value: "Action" }
];

const testFormModel = [
  { key: "name", label: "Name", props: { required: true } },
  { key: "type", label: "Type" , props: { required: true }},
];

const testComponentFormModel = [
  { key: "name", label: "Name", props: { required: true } },
  { key: "type", label: "Type" , props: { required: true }},
  { key: "selector", label: "Selector" , props: { required: true }},
  { key: "value", label: "Value" },
  { key: "waitForSelector", label: "Wait for Selector" }
];

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      params: [],
      tests: [],
      page: "scenario"
    };
  }

  getUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  findIndexByKey(list, key) {
    var index = -1;

    list.forEach((element, idx) => {
      if (element.key === key) {
        index = idx;
        return;
      }
    });

    return index;
  }

  openAddParamForm = (e) => {
    var id = this.getUniqueId();
    this.setState({ page: 'paramForm', formId: id });
    console.log("Add Param id:: " + id);
  }

  openAddTestForm = (e) => {
    var id = this.getUniqueId();
    this.setState({ page: 'testForm', formId: id });
    console.log("Add Test id:: " + id);
  }

  openAddInputForm = (e) => {
    var id = this.getUniqueId();
    this.setState({ page: 'inputForm', formId: id });
    console.log("Add Input id:: " + id);
  }

  openEditParamForm = (e, key) => {
    e.preventDefault();

    var tempParams = [...this.state.params];
    var index = -1;

    tempParams.forEach((param, idx) => {
      if (param.key === key) {
        index = idx;
        return;
      }
    });

    if (index !== -1) {
      this.setState({ page: 'paramForm', formId: key, defaultFormValues: tempParams[index] });
    }

    this.setState({ page: 'paramForm', formId: key });
    console.log("Edit Param id:: " + key);
  }

  openEditTestForm = (e, key) => {
    e.preventDefault();

    var tempTests = [...this.state.tests];
    var index = -1;

    tempTests.forEach((param, idx) => {
      if (param.key === key) {
        index = idx;
        return;
      }
    });

    if (index !== -1) {
      this.setState({ page: 'testForm', formId: key, defaultFormValues: tempTests[index] });
    }

    // this.setState({ page: 'testForm', formId: key });
    console.log("Edit Test id:: " + key);
  }

  openEditInputForm = (e, key, testKey) => {
    e.preventDefault();

    var tempTests = [...this.state.tests];
    var testIndex = this.findIndexByKey(tempTests, testKey);

    if(testIndex === -1) {
      return;
    }

    var tempInputs = [...tempTests[testIndex].inputs];
    var index = this.findIndexByKey(tempInputs, key);

    if (index !== -1) {
      this.setState({ page: 'inputForm', formId: key, defaultFormValues: tempInputs[index] }); //TODO we might need to pass testKey
    }

    // this.setState({ page: 'inputForm', formId: key }); 
    console.log("Edit Input id:: " + key);
  }

  removeParam = (e, key) => {
    e.preventDefault();

    var tempParams = [...this.state.params];
    var index = -1;

    tempParams.forEach((param, idx) => {
      if (param.key === key) {
        index = idx;
        return;
      }
    });

    if (index !== -1) {
      tempParams.splice(index, 1);
      this.setState({ params: tempParams });
    }
    console.log(key + " " + index);
  }

  removeTest = (e, key) => {
    e.preventDefault();

    var tempTests = [...this.state.tests];
    var index = -1;

    tempTests.forEach((param, idx) => {
      if (param.key === key) {
        index = idx;
        return;
      }
    });

    if (index !== -1) {
      tempTests.splice(index, 1);
      this.setState({ tests: tempTests });
    }
    console.log(key + " " + index);
  }

  submitParamForm = model => {
    var tempParams = [...this.state.params];
    var index = -1;

    tempParams.forEach((param, idx) => {
      if (param.key === model.id) {
        index = idx;
        return;
      }
    });

    if (index !== -1) {
      tempParams[index].name = model.name;
      tempParams[index].value = model.value;

    } else {
      var param = {
        key: model.id,
        name: model.name,
        value: model.value,
        action: <><span onClick={(e) => this.openEditParamForm(e, model.id)}> <MdEdit /> </span>
          <span onClick={(e) => this.removeParam(e, model.id)}> <MdDelete /></span> </>
      };
      tempParams = tempParams.concat(param);
    }

    this.setState((state) => {
      return ({ params: tempParams, page: "scenario", addParamId: null, defaultFormValues: [] });
    });
  };

  submitTestForm = model => {
    var tempTests = [...this.state.tests];
    var index = -1;

    tempTests.forEach((test, idx) => {
      if (test.key === model.id) {
        index = idx;
        return;
      }
    });

    if (index !== -1) {
      tempTests[index].name = model.name;
      tempTests[index].type = model.type;
      // tempTests[index].selector = model.selector;
      // tempTests[index].value = model.value;
      // tempTests[index].waitForSelector = model.waitForSelector;

    } else {
      var test = {
        key: model.id,
        name: model.name,
        type: model.type,
        inputs: [],
        action: {},
        outputs: [],
        // selector: model.selector,
        // value: model.value,
        // waitForSelector: model.waitForSelector,
        action: <><span onClick={(e) => this.openEditTestForm(e, model.id)}> <MdEdit /> </span>
          <span onClick={(e) => this.removeParam(e, model.id)}> <MdDelete /></span> </>
      };
      tempTests = tempTests.concat(test);
    }

    this.setState((state) => {
      return ({ tests: tempTests, page: "scenario", formId: null, defaultFormValues: [] });
    });
  };

  render() {

    var sampleTests =  [
      {
          "name": "test-1",
          "type": "validation",
          "inputs": [
              {
                  "name": "input 1",
                  "type": "link",
                  "selector": "#pageContent > div > section.panel.panel-info > div.panel-body > div:nth-child(2) > a",
                  "value": "click",
                  "waitForSelector": "input[name='_action_select_service']"
              }
          ],
          "action": {
              "type": "button",
              "selector": "input[name='_action_select_service']",
              "waitForSelector": ".alert-danger"
          },
          "outputs": [
              {
                  "name": "output 1",
                  "type": "text",
                  "selector": "#preAuth\\.waiver\\.errors",
                  "value": "Required"
              }
          ]
      },
      {
          "name": "test-2",
          "type": "validation",
          "inputs": [
              {
                  "name": "input 1",
                  "type": "select-with-search",
                  "selector": "preAuth\\.waiver",
                  "value": "TH002 - LTSS Caregiver Program"
              },
              {
                  "name": "input 2",
                  "type": "button",
                  "selector": "input[name='_action_select_service']",
                  "value": "click",
                  "waitForSelector": "#preAuth\\.service"
              }
          ],
          "action": {
              "type": "button",
              "selector": "input[name='_action_select_service_provider']",
              "waitForSelector": ".alert-danger"
          },
          "outputs": [
              {
                  "name": "output 1",
                  "type": "text",
                  "selector": "#preAuth\\.service\\.errors",
                  "value": "Required"
              },
              {
                  "name": "output 2",
                  "type": "text",
                  "selector": "#preAuth\\.fromDate\\.errors",
                  "value": "Required"
              },
              {
                  "name": "output 3",
                  "type": "text",
                  "selector": "#preAuth\\.toDate\\.errors",
                  "value": "Required"
              },
              {
                  "name": "output 4",
                  "type": "text",
                  "selector": "#preAuth\\.totalUnit\\.errors",
                  "value": "Cannot be negative or empty"
              }
          ]
      }];

    var table = <Table name="paramTable" model={paramsTableHeaders} data={this.state.params} />;

    var scenarioBody =
      <>
        <LabelValue label="Name" value="A Brand new Scenario" />
        <LabelValue label="URL" value="A Brand new URL" />
        <LabelValue label="Params" value={table} />
        <div className="text-right">
          <button className="btn btn-primary" name="_add_params" onClick={this.openAddParamForm}>Add Param</button>
        </div>
      </>;

    // var singleTest =
    //   <>
    //     <LabelValue label="Type" value="type" />
    //     <LabelValue label="Selector" value="selector" />
    //     <LabelValue label="Value" value="value" />
    //     <LabelValue label="Wait For Selector" value="wait for selector" />
    //   </>;

    // var testsBody =
    //   <>
    //     <div className="card">
    //       <div className="card-header">
    //         Test 1 :: (Type: Validation)
    //       </div>
    //       <div className="card-body">
    //         <div className="card-header">Inputs</div>
    //         <Card title="Input 1" body={singleTest}/>
    //       </div>
    //     </div>
    //   </>;

    if (this.state.page === 'scenario') {
      return (
        <>
          <div className="col-sm-10 offset-sm-1" style={{ marginTop: 20 }}>
            <Card title="Scenario" body={scenarioBody} />
          </div>

          <hr />
          <div className="col-sm-10 offset-sm-1">
            <div className="card-header">
              <span className="card-title h5">Tests</span>
              <span className="float-sm-right">
                <button className="btn btn-sm btn-primary" onClick={this.openAddTestForm} >Add Test</button>
              </span>
            </div>
            {/* <Card title="Tests" headerRight={<button>Add Test</button>} body={testsBody} /> */}
            {makeTestsList(this.state.tests, this)}
          </div>
        </>
      );

    } else if (this.state.page === 'paramForm') {
      return (
        <div className="col-sm-10 offset-sm-1" style={{ marginTop: 20 }}>
          <DynamicForm
            key={this.state.formId}
            id={this.state.formId}
            title="Param Form"
            model={paramFormModel}
            defaultValues={this.state.defaultFormValues}
            onSubmit={model => {
              this.submitParamForm(model);
            }}
          />
        </div>
      );

    } else if (this.state.page === 'testForm') {
      return (
        <div className="col-sm-10 offset-sm-1" style={{ marginTop: 20 }}>
          <DynamicForm
            key={this.state.formId}
            id={this.state.formId}
            title="Test Form"
            model={testFormModel}
            defaultValues={this.state.defaultFormValues}
            onSubmit={model => {
              this.submitTestForm(model);
            }}
          />
        </div>
      );

    }
     else {
      return ("");
    }
  }
}

export default App;
