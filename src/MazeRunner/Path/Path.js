import React, { Component } from 'react';
import _ from 'lodash';
import './Path.css';
import Block from './Block';

class Path extends Component {
    render() {
        let blockWidth = 50;
        let maxX = this.props.maxX;
        let maxY = this.props.maxY;
        let maze = prims(maxX,  maxY - (blockWidth*2), blockWidth);
        let blocks = [];
        for (let i = 0; i < maze.length; i++) {
            let columns = maze[i];
            for (let j = 0; j < columns.length; j++) {
                let visited = columns[j][4];
                if (visited) {
                    let yPos = (i + 1) * blockWidth;
                    let xPos = j * blockWidth;
                    blocks.push(<Block
                        blockWidth={blockWidth}
                        walls={columns[j]}
                        xPos={xPos}
                        yPos={yPos}
                        color="white"                       
                        key={(i * columns.length) + j + 1} />);
                    if (i === 0 && columns[j][1]) {
                        blocks.push(<Block
                        blockWidth={blockWidth}
                        walls={[false, true, false, true]}
                        xPos={xPos}
                        yPos={yPos - blockWidth}
                        color="green"                       
                        key={0} />);
                    }
                    if (i === maze.length - 1 && columns[j][3]) {
                        blocks.push(<Block
                            blockWidth={blockWidth}
                            walls={[false, true, false, true]}
                            xPos={xPos}
                            yPos={yPos + blockWidth}
                            color="red"
                            key={((i + 1) * columns.length) + 1} />);
                    }
                }
            }
        }
        return (<div>{blocks}</div>);
    }
}

function prims(maxX, maxY, blockWidth) {
    if (maxX <= 0 || maxY <= 0) {
        return [];
    }
    var rows = Math.floor(maxY / blockWidth);
    var columns = Math.floor(maxX / blockWidth);
    let theMaze = maze(rows, columns); // no openings
    let r = 0;
    let c = Math.floor(columns / 2);
    // we start at center top
    theMaze[r][c][1] = true; // we come from top;
    let history = [[r, c]]; 
    while (history.length) {
        theMaze[r][c][4] = true; // mark as visited;
        let possibleDirections = [];
        if (c > 0 && !theMaze[r][c - 1][4]) {
            possibleDirections.push('L');
        }
        if (c < columns - 1 && !theMaze[r][c + 1][4]) {
            possibleDirections.push('R');
        }
        if (r > 0 && !theMaze[r - 1][c][4]) {
            possibleDirections.push('U');
        }
        if (r < rows - 1 && !theMaze[r + 1][c][4]) {
            possibleDirections.push('D');
        }
        if (possibleDirections.length) {
            history.push([r, c]);
            let randomDirection = Math.floor(Math.random() * possibleDirections.length);
            let moveTo = possibleDirections[randomDirection];
            switch (moveTo) {
                case 'L':
                    theMaze[r][c][0] = true;
                    c -= 1;
                    theMaze[r][c][2] = true;
                    break;
                case 'R':
                    theMaze[r][c][2] = true;
                    c += 1;
                    theMaze[r][c][0] = true;
                    break;
                case 'U':
                    theMaze[r][c][1] = true;
                    r -= 1;
                    theMaze[r][c][3] = true;
                    break;
                case 'D':
                    theMaze[r][c][3] = true;
                    r += 1;
                    theMaze[r][c][1] = true;
                    break;
                default:
                    throw new Error(moveTo + ' is not a valid direction!');
            }
        } else {
            [r, c] = history.pop();
        }
    }

    // open goal  
    theMaze[rows - 1][Math.floor(columns / 2)][3] = true;

    return theMaze;
}

function maze(rows, cols) {
    let maze = [];
    for (let i = 0; i < rows; i++) {
        let list = [];
        for (let j = 0; j < cols; j++) {
            let walls = [];
            for (let k = 0; k < 5; k++) {
                walls.push(false);
            }
            list.push(walls);
        }
        maze.push(list)
    }
    return maze;
}

export default Path;
