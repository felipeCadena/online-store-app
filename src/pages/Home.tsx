import React, { useState } from 'react';

function Home() {
  const [search, setSearch] = useState('');
  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <>
      <label>
        <input
          name="search"
          value={ search }
          onChange={ handleSearch }
        />
      </label>
      {search.length === 0 ? (
        <h3 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      ) : null}
    </>
  );
}

export default Home;
