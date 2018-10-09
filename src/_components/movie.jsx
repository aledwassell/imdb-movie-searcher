import React, {Component} from 'react';

class Movie extends Component {
    state = {}
    render() {
        var divStyle = {
            backgroundImage: 'url(' + this.props.poster + ')'
        };
        console.log('props ', this.props);
        return (
            <div style={divStyle} className="movie">
                <div>
                    <span>
                        <div className="f6 fw2">{this.props.type}</div>
                        <div className="f3 fw9">{this.props.title}</div>
                    </span>
                </div>
            </div>
        );
    }
}

export default Movie;