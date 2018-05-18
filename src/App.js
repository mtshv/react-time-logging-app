import React, { Component } from 'react';
import './App.css';
import AddNewTimer from "./Components/AddNewTimer";
import EditableTimerList from "./Components/EditableTimerList";
import uuid from 'uuid4';

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

    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList timers={this.state.timers} />
                    <AddNewTimer
                        isOpen={true}
                    />
                </div>
            </div>
        );
    }
}

export default App;
