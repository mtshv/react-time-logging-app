import React, { Component } from 'react';
import './App.css';
import AddNewTimer from "./Components/AddNewTimer";
import EditableTimerList from "./Components/EditableTimerList";
import uuid from 'uuid4';
import {newTimer} from "./utils";

class App extends Component {
    state = {
        timers: [
            {
                title: 'Practice squat',
                project: 'Gym Chores',
                id: uuid(),
                elapsed: 5456099,
                runningSince: Date.now(),
            },
            {
                title: 'Bake squash',
                project: 'Kitchen Chores',
                id: uuid(),
                elapsed: 1273998,
                runningSince: null,
            },
        ],
    };

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };

    handleEditFormSubmit = (attrs) => {
        this.updateTimer(attrs);
    };

    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    };

    createTimer = (timer) => {
        const t = newTimer(timer);
        this.setState({
            timers: this.state.timers.concat(t),
        });
    };

    updateTimer = (attrs) => {
        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === attrs.id) {
                    return Object.assign({}, timer, {
                        title: attrs.title,
                        project: attrs.project,
                    });
                } else {
                    return timer;
                }
            }),
        });
    };

    deleteTimer = (timerId) => {
        this.setState({
            timers: this.state.timers.filter(t => t.id !== timerId),
        });
    };

    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList
                        timers={this.state.timers}
                        onFormSubmit={this.handleEditFormSubmit}
                        onTrashClick={this.handleTrashClick}
                    />
                    <AddNewTimer
                        onFormSubmit={this.handleCreateFormSubmit}
                    />
                </div>
            </div>
        );
    }
}

export default App;
