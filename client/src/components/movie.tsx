import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { ImdbMovie } from "../App";

interface Props {
  movie: ImdbMovie;
  clearSelection: () => void;
}

export const Movie = (props: Props) => {
  return (
    <div className="movie-selected">
        <img src={props.movie.Poster} alt={props.movie.Title} />
        <h1>{props.movie.Title}</h1>
        <i>{props.movie.Year}</i>
        <IconButton onClick={props.clearSelection} aria-label="delete">
            <CloseIcon />
        </IconButton>
    </div>
  );
};
