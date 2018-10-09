import React, {Component} from 'react';

class Movie extends Component {
    state = {}
    render() {
        console.log('props ', this.props);
        return (
            <div className="movie">
                <div>
                    movie
                    {this.props.value}
                </div>
            </div>
        );
    }
}

export default Movie;