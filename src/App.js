import React from 'react';
import DynamicForm from './components/DynamicForm'
import Card from './components/Card'
import Table from './components/Table'
import './css/theme.css';
import { MdEdit, MdDelete } from 'react-icons/md';

const paramFormModel = [
  { key: "name", label: "Name", props: { required: true } },
  { key: "value", label: "Value", props: { required: true } }
];

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      params: [],
      page: "scenario"
    };
  }

  getUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  openAddParamForm = (e) => {
    var id = this.getUniqueId();
    this.setState({ page: 'paramForm', formId: id });
    console.log("Add Param id:: " + id);
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

  render() {

    function LabelValue(props) {
      return (
        <div className="row">
          <div className="form-group col-sm-3 text-right">
            <label className="control-label">{props.label}</label>
          </div>
          <div className="form-group col-sm-9">{props.value}</div>
        </div>
      );
    }

    const paramsTableHeaders = [
      { key: "name", value: "Name" },
      { key: "value", value: "Value" },
      { key: "action", value: "Action" }
    ]

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

    var testsBody =
      <>
      </>;

    if (this.state.page === 'scenario') {
      return (
        <>
          <div className="col-sm-10 offset-sm-1" style={{marginTop: 20}}>
            <Card title="Scenario" body={scenarioBody} />
          </div>

          <hr/>
          <div className="col-sm-10 offset-sm-1">
            <Card title="Tests" headerRight={<button>Add Test</button>} body={testsBody} />
          </div>
        </>
      );

    } else if (this.state.page === 'paramForm') {
      return (
        <div className="col-sm-10 offset-sm-1">
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

    } else {
      return ("");
    }
  }
}

export default App;
