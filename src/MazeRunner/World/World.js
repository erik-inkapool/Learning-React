import React, { Component } from 'react';
import Measure from 'react-measure'
import './World.css';
import Path from '../Path/Path';

class World extends Component {
    render() {
        return (
            <Measure>
                {({width, height}) => {
                    return (
                        <div className="World">
                            <Path maxX={width ? width : 0} maxY={height ? height : 0} />
                        </div>
                    );
                }
                }
            </Measure>
        );
    }
}

export default World;
