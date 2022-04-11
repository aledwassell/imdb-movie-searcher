import React from "react";
import "./App.scss";
import { InputField } from "./components/input";
import { List } from "./components/list";
import { Movie } from "./components/movie";
import { TextAreaField } from "./components/text_area";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

interface Props {
  propA?: number;
}
export interface State {
  loading: boolean;
  movies: any[] | null;
  moviesError: string | null;
  moviesUrl: string;
  selectedMovieId: string | null;
  positiveReview: boolean;
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

export interface PredictionResp {
  prediction: number;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      movies: [],
      moviesError: null,
      moviesUrl: `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=`,
      selectedMovieId: null,
      positiveReview: false,
    };
    this.handleMovieSearch = this.handleMovieSearch.bind(this);
    this.handlePredictReview = this.handlePredictReview.bind(this);
    this.handleSelectedMoview = this.handleSelectedMoview.bind(this);
  }

  handleMovieSearch(text: string) {
    this.setState({ loading: true, moviesError: null, selectedMovieId: null });
    fetch(`${this.state.moviesUrl}${text}`)
      .then((resp: Response) => {
        if (resp.ok) {
          return resp.json();
        }
        throw resp;
      })
      .then((resp: ImdbResp) => {
        if (resp.Response === "True") {
          this.setState({ loading: false, movies: resp.Search ?? null });
        } else {
          this.setState({ loading: false, moviesError: resp.Error ?? null });
        }
      });
  }

  handleSelectedMoview(selectedMovieId: string) {
    this.setState({ selectedMovieId });
  }

  handlePredictReview(text: string) {
    this.setState({ loading: true });
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
      .then(({ prediction }) => {
        this.setState({ positiveReview: prediction >= 50 });
      });
  }

  render() {
    const movie = (
      <div className="movie">
        <Movie
          movie={this.state.movies?.find(
            (m) => m.imdbID === this.state.selectedMovieId
          )}
          clearSelection={() => this.setState({ selectedMovieId: null })}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <TextAreaField
            submit={this.handlePredictReview}
            placeholder="Write review"
          />
          {this.state.positiveReview ? <ThumbUp /> : <ThumbDown />}
        </div>
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
