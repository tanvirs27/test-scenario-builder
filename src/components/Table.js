import React from 'react';

function Table(props) {

    var body;
    if (props.data) {
        body = props.data.map((singleRow) =>
            <tr key={singleRow.key}>
                {props.model.map((model) =>
                    <td key={props.name + "_" + singleRow.key + "_" + model.key}>{singleRow[model.key]}</td>
                )}
            </tr>
        );
    }

    return (
        <table className="table table-striped table-light">
            <thead>
                <tr>
                    {props.model.map((model) =>
                        <th key={props.name + "_" + model.key}>{model.value}</th>
                    )}
                </tr>
            </thead>

            <tbody>
                {body}
            </tbody>
        </table>
    );
}

export default Table;