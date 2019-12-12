import React from 'react';
import DynamicForm from './components/DynamicForm'
import Card from './components/Card'
import Table from './components/Table'
import LabelValue from './components/LabelValue'
import './css/theme.css';
import './App.css';
import { MdEdit, MdDelete } from 'react-icons/md';
import Files from "react-files";

import makeTestsList from './helper/helper';

const scenarioFormModel = [
  { key: "name", label: "Name", props: { required: true } },
  { key: "url", label: "URL", props: { required: true } },
  { key: "waitForSelector", label: "Wait for Selector", props: { required: true } }
];

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
  { key: "type", label: "Type", props: { required: true } },
];

const testComponentFormModel = [
  { key: "name", label: "Name", props: { required: true } },
  { key: "type", label: "Type", props: { required: true } },
  { key: "selector", label: "Selector", props: { required: true } },
  { key: "value", label: "Value" },
  { key: "waitForSelector", label: "Wait for Selector" }
];

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      url: "",
      params: [],
      tests: [],
      page: "scenario"
    };

    this.fileReader = new FileReader();
    this.fileReader.onload = event => {
      var jsonFile = JSON.parse(event.target.result);

      this.setState({
        name: jsonFile.name,
        url: jsonFile.url,
        // params: [...jsonFile.params],
        tests: [...jsonFile.tests],
        page: "scenario"
      }, () => {
        console.log(this.state.jsonFile);
      });
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

  escapeDots(value) {
    return value.replace(/\./g, '\\.').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
  };

  download = (e) => {
    window.download(JSON.stringify(this.state), this.state.name + ".json", "text/plain");
  }

  uploadFile = (e) => {
    this.setState({ page: 'uploadFilePage' });
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

  openAddInputForm = (e, testKey) => {
    var id = this.getUniqueId();
    this.setState({ page: 'inputForm', formId: id, extraParam: testKey });
    console.log("Add Input id:: " + id);
  }

  openAddOutputForm = (e, testKey) => {
    var id = this.getUniqueId();
    this.setState({ page: 'outputForm', formId: id, extraParam: testKey });
    console.log("Add Output id:: " + id);
  }

  openEditScenarioForm = (e) => {
    var id = this.state.key ? this.state.key : this.getUniqueId();

    var defaultFormValues = {
      name: this.state.name,
      url: this.state.url,
      waitForSelector: this.state.waitForSelector
    };

    this.setState({ page: 'scenarioForm', formId: id, defaultFormValues: defaultFormValues });
    console.log("Edit Scenario id:: " + id);
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

    if (testIndex === -1) {
      return;
    }

    var tempInputs = [...tempTests[testIndex].inputs];
    var index = this.findIndexByKey(tempInputs, key);

    if (index !== -1) {
      this.setState({
        page: 'inputForm',
        formId: key,
        defaultFormValues: tempInputs[index],
        extraParam: testKey
      });
    }

    // this.setState({ page: 'inputForm', formId: key }); 
    console.log("Edit Input id:: " + key);
  }

  openEditActionForm = (e, testKey) => {
    e.preventDefault();

    var tempTests = [...this.state.tests];
    var index = this.findIndexByKey(tempTests, testKey);

    if (index !== -1) {
      this.setState({ page: 'actionForm', formId: testKey, defaultFormValues: tempTests[index].action });
    }

    // this.setState({ page: 'testForm', formId: key });
    console.log("Edit Test id:: " + testKey);
  }

  openEditOutputForm = (e, key, testKey) => {
    e.preventDefault();

    var tempTests = [...this.state.tests];
    var testIndex = this.findIndexByKey(tempTests, testKey);

    if (testIndex === -1) {
      return;
    }

    var tempOutputs = [...tempTests[testIndex].outputs];
    var index = this.findIndexByKey(tempOutputs, key);

    if (index !== -1) {
      this.setState({
        page: 'outputForm',
        formId: key,
        defaultFormValues: tempOutputs[index],
        extraParam: testKey
      });
    }

    // this.setState({ page: 'inputForm', formId: key }); 
    console.log("Edit Output id:: " + key);
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

  removeInput = (e, key, testKey) => {
    e.preventDefault();
    var tempTests = [...this.state.tests];
    var testIndex = this.findIndexByKey(tempTests, testKey);

    if (testIndex === -1) {
      return;
    }

    var tempInputs = [...tempTests[testIndex].inputs];
    var index = this.findIndexByKey(tempInputs, key);

    if (index !== -1) {
      tempTests[testIndex].inputs.splice(index, 1);
      this.setState({ tests: tempTests });
    }
  }

  removeOutput = (e, key, testKey) => {
    e.preventDefault();
    var tempTests = [...this.state.tests];
    var testIndex = this.findIndexByKey(tempTests, testKey);

    if (testIndex === -1) {
      return;
    }

    var tempOutputs = [...tempTests[testIndex].outputs];
    var index = this.findIndexByKey(tempOutputs, key);

    if (index !== -1) {
      tempTests[testIndex].outputs.splice(index, 1);
      this.setState({ tests: tempTests });
    }
  }

  submitScenarioForm = model => {
    var name = model.name;
    var url = model.url;
    var waitForSelector = model.waitForSelector;

    this.setState((state) => {
      return ({ key: model.id, name: name, url: url, waitForSelector: waitForSelector, page: "scenario", formId: null, defaultFormValues: [] });
    });
  };

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
      return ({ params: tempParams, page: "scenario", formId: null, defaultFormValues: [] });
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

    } else {
      var test = {
        key: model.id,
        name: model.name,
        type: model.type,
        inputs: [],
        action: { key: this.getUniqueId() },
        outputs: []
      };
      tempTests = tempTests.concat(test);
    }

    this.setState((state) => {
      return ({ tests: tempTests, page: "scenario", formId: null, defaultFormValues: [] });
    });
  };

  submitActionForm = model => {
    var tempTests = [...this.state.tests];
    var index = this.findIndexByKey(tempTests, model.id);

    if (index !== -1) {
      tempTests[index].action.name = model.name;
      tempTests[index].action.type = model.type;
      tempTests[index].action.selector = model.selector;
      tempTests[index].action.value = model.value;
      tempTests[index].action.waitForSelector = model.waitForSelector;
    }

    this.setState((state) => {
      return ({ tests: tempTests, page: "scenario", formId: null, defaultFormValues: [] });
    });
  };

  submitInputForm = model => {
    var testKey = model.extraParam;
    var tempTests = [...this.state.tests];
    var testIndex = this.findIndexByKey(tempTests, testKey);

    if (testIndex === -1) {
      return;
    }

    var tempInputs = [...tempTests[testIndex].inputs];
    var index = this.findIndexByKey(tempInputs, model.id);

    if (index !== -1) {

      tempTests[testIndex].inputs[index].name = model.name;
      tempTests[testIndex].inputs[index].type = model.type;
      tempTests[testIndex].inputs[index].selector = model.selector;
      tempTests[testIndex].inputs[index].value = model.value;
      tempTests[testIndex].inputs[index].waitForSelector = model.waitForSelector;

    } else {
      var input = {
        key: model.id,
        name: model.name,
        type: model.type,
        selector: model.selector,
        value: model.value,
        waitForSelector: model.waitForSelector,
      };

      tempInputs = tempInputs.concat(input);
      tempTests[testIndex].inputs = tempInputs;
    }

    this.setState((state) => {
      return ({ tests: tempTests, page: "scenario", formId: null, defaultFormValues: [], extraParam: null });
    });
  };

  submitOutputForm = model => {
    var testKey = model.extraParam;
    var tempTests = [...this.state.tests];
    var testIndex = this.findIndexByKey(tempTests, testKey);

    if (testIndex === -1) {
      return;
    }

    var tempOutputs = [...tempTests[testIndex].outputs];
    var index = this.findIndexByKey(tempOutputs, model.id);

    if (index !== -1) {
      tempTests[testIndex].outputs[index].name = model.name;
      tempTests[testIndex].outputs[index].type = model.type;
      tempTests[testIndex].outputs[index].selector = model.selector;
      tempTests[testIndex].outputs[index].value = model.value;
      tempTests[testIndex].outputs[index].waitForSelector = model.waitForSelector;

    } else {
      var output = {
        key: model.id,
        name: model.name,
        type: model.type,
        selector: model.selector,
        value: model.value,
        waitForSelector: model.waitForSelector,
      };

      tempOutputs = tempOutputs.concat(output);
      tempTests[testIndex].outputs = tempOutputs;
    }

    this.setState((state) => {
      return ({ tests: tempTests, page: "scenario", formId: null, defaultFormValues: [], extraParam: null });
    });
  };


  render() {

    var table = <Table name="paramTable" model={paramsTableHeaders} data={this.state.params} />;

    var scenarioBody =
      <>
        <LabelValue label="Name" value={this.state.name} />
        <LabelValue label="URL" value={this.state.url} />
        <LabelValue label="Wait For Selector" value={this.state.waitForSelector} />
        <LabelValue label="Params" value={table} />
        <div className="text-right">
          <button className="btn btn-sm btn-primary" name="_add_params" onClick={this.openAddParamForm}>Add Param</button>
        </div>
      </>;

    if (this.state.page === 'scenario') {
      return (
        <>
          <div className="col-sm-10 offset-sm-1" style={{ marginTop: 20 }}>
            <Card title="Scenario"
              headerRight={
                <>
                  <button className="btn btn-sm btn-primary" style={{ marginRight: 10 }} onClick={(e) => this.openEditScenarioForm(e)}>Edit</button>
                  <button className="btn btn-sm btn-success" style={{ marginRight: 10 }} onClick={(e) => this.download(e)}>Download</button>
                  <button className="btn btn-sm btn-success" onClick={(e) => this.uploadFile(e)}>Upload</button>
                </>
              }
              body={scenarioBody} />
          </div>

          <hr />
          <div className="col-sm-10 offset-sm-1">
            <div className="card-header">
              <span className="card-title h5">Tests</span>
              <span className="float-sm-right">
                <button className="btn btn-sm btn-primary" onClick={this.openAddTestForm} >Add Test</button>
              </span>
            </div>
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

    } else if (this.state.page === 'inputForm') {
      return (
        <div className="col-sm-10 offset-sm-1" style={{ marginTop: 20 }}>
          <DynamicForm
            key={this.state.formId}
            id={this.state.formId}
            extraParam={this.state.extraParam}
            title="Input Form"
            model={testComponentFormModel}
            defaultValues={this.state.defaultFormValues}
            onSubmit={model => {
              this.submitInputForm(model);
            }}
          />
        </div>
      );

    } else if (this.state.page === 'outputForm') {
      return (
        <div className="col-sm-10 offset-sm-1" style={{ marginTop: 20 }}>
          <DynamicForm
            key={this.state.formId}
            id={this.state.formId}
            extraParam={this.state.extraParam}
            title="Output Form"
            model={testComponentFormModel}
            defaultValues={this.state.defaultFormValues}
            onSubmit={model => {
              this.submitOutputForm(model);
            }}
          />
        </div>
      );

    } else if (this.state.page === 'actionForm') {
      return (
        <div className="col-sm-10 offset-sm-1" style={{ marginTop: 20 }}>
          <DynamicForm
            key={this.state.formId}
            id={this.state.formId}
            title="Action Form"
            model={testComponentFormModel}
            defaultValues={this.state.defaultFormValues}
            onSubmit={model => {
              this.submitActionForm(model);
            }}
          />
        </div>
      );

    } else if (this.state.page === 'scenarioForm') {
      return (
        <div className="col-sm-10 offset-sm-1" style={{ marginTop: 20 }}>
          <DynamicForm
            key={this.state.formId}
            id={this.state.formId}
            title="Scenario Form"
            model={scenarioFormModel}
            defaultValues={this.state.defaultFormValues}
            onSubmit={model => {
              this.submitScenarioForm(model);
            }}
          />
        </div>
      );

    } else if (this.state.page === 'uploadFilePage') {
      return (<div>
        <Files
          className="file-upload"
          onChange={file => {
            this.fileReader.readAsText(file[0]);
          }}
          onError={err => console.log(err)}
          accepts={[".json"]}
          multiple={false}
          maxFiles={1}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          <p>Drop Scenario file here or click to upload</p>
        </Files>
      </div>
      );
    }
    else {
      return ("");
    }
  }
}

export default App;
