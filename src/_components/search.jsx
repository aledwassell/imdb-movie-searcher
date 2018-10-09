import React, {Component} from 'react';

class Search extends Component {
    state = {
    };
    handleChange = (event) => {
        this.setState({value: event.target.value});
    };
    handleSubmit = (event) => {
        console.log(this.state.value);
        this.props.getMovies(this.state.value);
        event.preventDefault();
    };
    render() {
        return (
            <form className="search" onSubmit={this.handleSubmit}>
                <label>
                    <input placeholder="search" type="text" name="name" onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default Search;