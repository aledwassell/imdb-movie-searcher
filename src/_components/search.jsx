import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';

class Search extends Component {
    state = {
    };
    handleChange = (event) => {
        this.setState({value: event.target.value});
    };
    handleSubmit = (event) => {
        this.props.getMovies(this.state.value);
        event.preventDefault();
    };
    render() {
        return (
            <form className="search" onSubmit={this.handleSubmit}>
                <label>
                    <input onChange={this.handleChange} placeholder="search" type="text" name="name" data-tip="Movie search" data-for="tooltip"/>
                    <ReactTooltip id='tooltip' className="react-tooltip" getContent={() => { return null }}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default Search;