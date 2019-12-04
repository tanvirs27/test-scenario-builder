import React from 'react';

function Card(props) {
    return (
        <div className="card">
            <div className="card-header">
                <span className="card-title h5">{props.title}</span>
                <span className="float-sm-right">
                    {props.headerRight}
                </span>
            </div>
            <div className="card-body">
                {props.body}
            </div>
        </div>
    );
}

export default Card;