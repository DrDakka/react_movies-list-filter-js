import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function findMovie(moviesList, query) {
  const normalizedQuery = query.replace(/\s+/g, '').toLowerCase();

  const preparedMovies = moviesList.filter(({ title, description }) => {
    const t = title.toLowerCase().replace(/\s+/g, '');
    const d = description.toLowerCase().replace(/\s+/g, '');

    return t.includes(normalizedQuery) || d.includes(normalizedQuery);
  });

  return preparedMovies;
}

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const visibleMovies = findMovie(moviesFromServer, searchQuery);

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={searchQuery}
                onChange={event => {
                  setSearchQuery(event.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
