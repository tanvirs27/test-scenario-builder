import React from 'react';

export default function LabelValue(props) {
    return (
      <div className="row">
        <div className="form-group col-sm-3 text-right">
          <label className="control-label">{props.label}</label>
        </div>
        <div className="form-group col-sm-9">{props.value}</div>
      </div>
    );
  }
  