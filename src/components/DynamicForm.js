import React from 'react'
import Card from './Card'

export default class DynamicForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            ...props.defaultValues
        };

        // if (props.defaultValues) {
        //     // props.model.forEach((model) => {

        //     //     this.setState({ [model.key]: props.defaultValues[model.key] })

        //     // });
        // }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {

    //     console.log("default values in next line");
    //     console.log(nextProps.defaultValues);

    //     if (nextProps.defaultValues && nextProps.id !== prevState.id) {
    //         return {
    //             ...nextProps.defaultValues
    //         };
    //     }

    //     console.log("no state change");
    //     return null;
    // }

    onSubmit = e => {
        e.preventDefault();

        if (this.props.onSubmit) this.props.onSubmit(this.state);
    };

    onChange = (e, key, type = "single") => {

        if (type === "single") {
            this.setState(
                {
                    [key]: e.target.value
                },
                () => { }
            );
        } else {

            let found = this.state[key]
                ? this.state[key].find(d => d === e.target.value)
                : false;

            if (found) {
                let data = this.state[key].filter(d => {
                    return d !== found;
                });
                this.setState({
                    [key]: data
                });
            } else {
                console.log("found", key, this.state[key]);
                // this.setState({
                //   [key]: [e.target.value, ...this.state[key]]
                // });
                let others = this.state[key] ? [...this.state[key]] : [];
                this.setState({
                    [key]: [e.target.value, ...others]
                });
            }
        }
    };

    renderForm = () => {
        let model = this.props.model;

        let formUI = model.map(m => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name = m.name;
            let value = m.value;

            let target = key;
            value = this.state[target] || "";

            let input = (
                <input
                    {...props}
                    className="form-input"
                    type={type}
                    key={key}
                    name={name}
                    value={value}
                    onChange={e => {
                        this.onChange(e, target);
                    }}
                />
            );

            if (type === "radio") {
                input = m.options.map(o => {
                    let checked = o.value === value;
                    return (
                        <React.Fragment key={"fr" + o.key}>
                            <input
                                {...props}
                                className="form-input"
                                type={type}
                                key={o.key}
                                name={o.name}
                                checked={checked}
                                value={o.value}
                                onChange={e => {
                                    this.onChange(e, o.name);
                                }}
                            />
                            <label key={"ll" + o.key}>{o.label}</label>
                        </React.Fragment>
                    );
                });
                input = <div className="form-group-radio">{input}</div>;
            }

            if (type === "select") {
                input = m.options.map(o => {

                    return (
                        <option
                            {...props}
                            className="form-input"
                            key={o.key}
                            value={o.value}
                        >
                            {o.value}
                        </option>
                    );
                });

                input = (
                    <select
                        value={value}
                        onChange={e => {
                            this.onChange(e, m.key);
                        }}
                    >
                        {input}
                    </select>
                );
            }

            if (type === "checkbox") {
                input = m.options.map(o => {

                    let checked = false;
                    if (value && value.length > 0) {
                        checked = value.indexOf(o.value) > -1 ? true : false;
                    }

                    return (
                        <React.Fragment key={"cfr" + o.key}>
                            <input
                                {...props}
                                className="form-input"
                                type={type}
                                key={o.key}
                                name={o.name}
                                checked={checked}
                                value={o.value}
                                onChange={e => {
                                    this.onChange(e, m.key, "multiple");
                                }}
                            />
                            <label key={"ll" + o.key}>{o.label}</label>
                        </React.Fragment>
                    );
                });

                input = <div className="form-group-checkbox">{input}</div>;
            }

            return (
                <div className="row" key={"g" + key}>
                    <div className="form-group col-sm-3 text-right">
                        <label className="control-label" key={"l" + key} htmlFor={key}>{m.label}</label>
                    </div>
                    <div className="form-group col-sm-9">{input}</div>
                </div>
            );
        });
        return formUI;
    };

    render() {
        let title = this.props.title || "Dynamic Form";

        let form =
            <form className="form"
                onSubmit={e => {
                    this.onSubmit(e);
                }}>
                {this.renderForm()}
                <div className="text-right">
                    <button className="btn btn-primary" type="submit">submit</button>
                </div>
            </form>;

        return (
            <Card title={title} body={form} />
        );
    }
}
