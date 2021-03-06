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

    componentDidMount() {
        const getLsTimers = localStorage.getItem('timers');
        if (getLsTimers) {
            if ( Object.keys(getLsTimers).length ) {
                this.setState({ timers : JSON.parse(getLsTimers) });
            } else {
                localStorage.clear()
            }
        }
    }

    componentDidUpdate() {
        if (this.state.timers.length) {
            localStorage.setItem('timers', JSON.stringify(this.state.timers));
        } else {
            localStorage.clear()
        }
    }


    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };

    handleEditFormSubmit = (attrs) => {
        this.updateTimer(attrs);
    };

    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    };

    handleStartClick = (timerId) => {
        this.startTimer(timerId);
    };

    handleStopClick = (timerId) => {
        this.stopTimer(timerId);
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

    startTimer = (timerId) => {
        const now = Date.now();

        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === timerId) {
                    return Object.assign({}, timer, {
                        runningSince: now,
                    });
                } else {
                    return timer;
                }
            }),
        });
    };

    stopTimer = (timerId) => {
        const now = Date.now();

        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === timerId) {
                    const lastElapsed = now - timer.runningSince;
                    return Object.assign({}, timer, {
                        elapsed: timer.elapsed + lastElapsed,
                        runningSince: null,
                    });
                } else {
                    return timer;
                }
            }),
        });
    };

    render() {
        return (
            <div className="main ui text container">
                <h1 className="ui dividing centered header">Timers</h1>
                <div className='ui two column centered grid'>
                    <div className='column'>
                        <EditableTimerList
                            timers={this.state.timers}
                            onFormSubmit={this.handleEditFormSubmit}
                            onTrashClick={this.handleTrashClick}
                            onStartClick={this.handleStartClick}
                            onStopClick={this.handleStopClick}
                        />
                        <AddNewTimer
                            onFormSubmit={this.handleCreateFormSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
