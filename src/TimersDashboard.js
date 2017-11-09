import React,{Component} from 'react';
import uuid from 'uuid';
import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from './ToggleableTimerForm';
import helpers from './util/helpers';


class TimersDashboard extends Component {
	state = {
		timers: [
			{
				title: 'Practice squate',
				project: 'Gym Chores',
				id: uuid.v4(),
				elapsed: 5456099,
				runningSince: Date.now()
			},
			{
				title: 'Bake squash',
				project: 'Kitchen Chores',
				id: uuid.v4(),
				elapsed: 1273998,
				runningSince: null
			}
		]
	};

	handleCreateFormSubmit = timer => {
		this.createTimer(timer);
	};

	handleEditFormSubmit = attrs => {
		this.updateTimer(attrs);
	};
	
	handleDelete = (id) =>{
		this.deleteTimer(id);
	};
    
	createTimer = timer => {
		const t = helpers.newTimer(timer);
		this.setState({ timers: this.state.timers.concat(t) });
	};

    updateTimer = (attrs) => {
        this.setState({
            timers: this.state.timers.map((timer) =>{
                if (timer.id === attrs.id) {
                    return Object.assign({},timer,{
                        title:attrs.title,
                        project:attrs.project
                    })
				}else{
                    return timer;
                }
            })
        })
	};
	
	deleteTimer = (id) =>{
		this.setState({timers:this.state.timers.filter(t=>id !== t.id)})
	};


	render() {
		return (
			<div className="ui three column centered grid">
				<div className="column">
					<EditableTimerList timers={this.state.timers}
                    onFormSubmit={this.handleEditFormSubmit} 
					handleDelete={this.handleDelete}/>
					<ToggleableTimerForm
						onFormSubmit={this.handleCreateFormSubmit}
					/>
				</div>
			</div>
		);
	}
}


export default TimersDashboard;