import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <div>
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
          <Link to="/carrinho" data-testid="shopping-cart-button">
            Ir para o Carrinho de Compras
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default Home;
