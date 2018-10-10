import React, {Component} from 'react';
import axios from 'axios';

class MovieDetail extends Component {
    state = {
        title: '',
        type: '',
        poster: '',
        movieUrl: `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=`,
    };
    handleGetMovieDetails = () => {
        axios.get(this.state.movieUrl += this.props.imdbId)
            .then(resp => {
                console.log(resp);
                this.setState({
                    title: resp.data.Title,
                    type: resp.data.Type,
                    poster: resp.data.Poster,
                    released: resp.data.Released,
                    director: resp.data.Director
                });
            }).then(() => {
            this.setState({moviesUrl: `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=`});
        });
    };
    componentDidMount(){
        this.handleGetMovieDetails()
    }
    render() {
        let backgroundStyle = {
            backgroundImage: 'url(' + this.state.poster + ')'
        };
        return (
            <div className="movie-details" style={backgroundStyle}>
                <span>
                    <div className="f4 fw2">{this.state.type}</div>
                    <div className="f1 fw9">{this.state.title}</div>
                    <div className="f4">{this.state.released}</div>
                    <div className="f4">Directed by {this.state.director}</div>
                </span>
            </div>
        );
    }
}

export default MovieDetail;