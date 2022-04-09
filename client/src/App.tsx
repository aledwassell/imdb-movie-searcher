import React from "react";
import "./App.scss";
import { InputField } from "./components/input";
import { List } from "./components/list";
import { Movie } from "./components/movie";

interface Props {
  propA?: number;
}
export interface State {
  movies: any[] | null;
  moviesError: string | null;
  moviesUrl: string;
  selectedMovieId: string | null;
}

export interface ImdbMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface ImdbResp {
  Response?: "True";
  Error?: string;
  Search?: ImdbMovie[];
  totalResults?: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log(process.env);
    this.state = {
      movies: [],
      moviesError: null,
      moviesUrl: `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=`,
      selectedMovieId: null,
    };
    this.handleMovieSearch = this.handleMovieSearch.bind(this);
    this.handleSelectedMoview = this.handleSelectedMoview.bind(this);
  }

  handleMovieSearch(text: string) {
    this.setState({ moviesError: null, selectedMovieId: null });
    fetch(`${this.state.moviesUrl}${text}`)
      .then((resp: Response) => {
        if (resp.ok) {
          return resp.json();
        }
        throw resp;
      })
      .then((resp: ImdbResp) => {
        if (resp.Response === "True") {
          console.log(resp);
          this.setState({ movies: resp.Search ?? null });
        } else {
          console.log(resp);
          this.setState({ moviesError: resp.Error ?? null });
        }
      });
  }

  handleSelectedMoview(selectedMovieId: string) {
    this.setState({ selectedMovieId });
  }

  handleSubmitReview(text: string) {
    fetch("/predict", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp: Response) => {
        if (resp.ok) {
          return resp.json();
        }
        throw resp;
      })
      .then((resp: any) => {
        console.log(resp);
      });
  }

  render() {
    const movie = (
      <div>
        <Movie
          movie={this.state.movies?.find(
            (m) => m.imdbID === this.state.selectedMovieId
          )}
          clearSelection={() => this.setState({ selectedMovieId: null })}
        />
        <InputField
          submit={this.handleSubmitReview}
          placeholder="Submit review"
        />
      </div>
    );
    const movieRender = this.state.selectedMovieId ? (
      movie
    ) : (
      <List list={this.state.movies} handleClick={this.handleSelectedMoview} />
    );

    return (
      <div className="app">
        <InputField submit={this.handleMovieSearch} placeholder="Search" />
        {movieRender}
        <label className="error">{this.state.moviesError}</label>
      </div>
    );
  }
}

export default App;
