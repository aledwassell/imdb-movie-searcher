import { ImdbMovie } from "../App";

export interface Props {
  list: ImdbMovie[] | null;
  handleClick: (selectedMovieId: string) => void;
}

export const List = (props: Props) => {
  const listItems = props.list?.map((item: ImdbMovie, i: number) => (
    <div key={item.imdbID ?? i} className="movie" onClick={() => props.handleClick(item.imdbID)}>
      {item.Title} - {item.Year}
      <img src={item.Poster} alt={item.Title} />
    </div>
  ));
  return <div className="moviesList">{listItems}</div>;
};
