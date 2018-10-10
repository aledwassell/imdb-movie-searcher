import React, {Component} from 'react';
import Search from './search';
import Movie from './movie';
import MovieDetail from './movieDetail';
import Nav from './nav';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

class Movies extends Component {
    //state holds all the data the app is going tuse, this data can be mutated using setState()
    state = {
        defaultSearch: 'batman',
        movies: [],
        moviesUrl: `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=`,
        listView: true,
        movieView: false,
        selectedMovieId: ''
    };

    //instead of bind this to the handleGetMovies method
    // constructor(){
    //     super();
    //     this.handleGetMovies = this.handleGetMovies.bind(this)
    // }

    // we can use an arrow function to bind the this key word from this scope to the method's scope, rather than using handleGetMovies.bind(this) in the constructor
    handleGetMovies = (title) => {
        let ts = [];
        if(title){
            this.setState({moviesUrl: this.state.moviesUrl += title})
        } else {
            this.setState({moviesUrl: this.state.moviesUrl += 'batman'})
        }
        axios.get(this.state.moviesUrl)
            .then(resp => {
                for (let i = 0; i < 3; i++){
                    ts.push(resp.data.Search[i]);
                }
                this.setState({movies: ts});

            }).then(() => {
            this.setState({moviesUrl: `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=`});
        });
    };
    handleMovieSelect = (movieId) => {
        console.log(movieId);
        this.setState({selectedMovieId: movieId});
        this.setState(prevState => ({
            movieView: !prevState.movieView
        }));
        this.setState(prevState => ({
            listView: !prevState.listView
        }));
    };
    componentDidMount() {
        this.handleGetMovies();
    }
    render() {
        return (
            <React.Fragment>
                <div className="main">
                    {
                        this.state.listView &&
                        <div className="movie-container">
                            <Search getMovies={this.handleGetMovies}/>
                            {this.state.movies.map(m =>
                                <Movie updateView={this.handleMovieSelect} key={m.imdbID} imdbID={m.imdbID} title={m.Title} poster={m.Poster} type={m.Type}/>
                            )}
                        </div>
                    }
                    {
                        this.state.movieView &&
                        <div>
                            <FontAwesomeIcon className='dim fa-2x back-button' onClick={this.handleMovieSelect} icon={faArrowLeft} />
                            <MovieDetail imdbId={this.state.selectedMovieId} />
                        </div>
                    }
                    <Nav />
                </div>
            </React.Fragment>
        );
    }
}

export default Movies;
