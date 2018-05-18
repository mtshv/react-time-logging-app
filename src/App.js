import React, { Component } from 'react';
import './App.css';
import AddNewTimer from "./Components/AddNewTimer";
import EditableTimerList from "./Components/EditableTimerList";

class App extends Component {
    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList />
                    <AddNewTimer
                        isOpen={true}
                    />
                </div>
            </div>
        );
    }
}

export default App;
