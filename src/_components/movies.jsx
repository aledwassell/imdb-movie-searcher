import React, {Component} from 'react';
import Movie from './movie';
import Nav from './nav';
import axios from 'axios';

class Movies extends Component {
    //state holds all the data the app is going tuse, this data can be mutated using setState()
    state = {
        movies: [],
        OMDb_API_key: process.env.REACT_APP_OMDB_API_KEY,
        moviesUrl: 'http://www.omdbapi.com/?apikey={}&s=batman'
    };

    //instead of bind this to the handleGetMovies method
    // constructor(){
    //     super();
    //     this.handleGetMovies = this.handleGetMovies.bind(this)
    // }

    // we can use an arrow function to bind the this key word from this scope to the method's scope, rather than using handleGetMovies.bind(this) in the constructor
    handleGetMovies = () => {
        let ts = [];
        axios.get(this.state.moviesUrl)
            .then(resp => {
                console.log(resp);
                for (let i = 0; i < 3; i++){
                    ts.push(resp.data.Search[i]);
                }
                this.setState({movies: ts});
            });
    };
    render() {
        return (
            <React.Fragment>
                <div className="main">
                    <div className="movie-container">
                        {this.state.movies.map(m =>
                            <Movie key={m.id} value={m.Title}/>
                        )}
                    </div>
                    <Nav getMovies={this.handleGetMovies} />
                </div>
            </React.Fragment>
        );
    }

    // getBtnClass() {
    //     let classes = "white br-pill pa3 bn bg-";
    //     classes += (this.state.count === 0) ? 'yellow' : 'green';
    //     return classes;
    // }
}

export default Movies;
