import React, {Component} from 'react';

class Movie extends Component {
    state = {}
    render() {
        console.log('props ', this.props);
        return (
            <div>
                movie
                {this.props.value}
            </div>
        );
    }
}

export default Movie;