import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

type Category = {
  id: string,
  name: string,
};

function Home() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  useEffect(() => {
    async function fetchCategories() {
      const result = await getCategories();
      setCategories(result);
    }

    fetchCategories();
  }, []);

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
      <div>
        <h3>Categorias:</h3>
        <ul>
          {categories.map(({ id, name }) => (
            <li key={ id }>
              <label data-testid="category" htmlFor={ id }>
                <input
                  type="radio"
                  name="category"
                  value={ id }
                />
                { name }
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
