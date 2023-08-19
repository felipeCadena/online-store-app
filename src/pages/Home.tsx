import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

type Category = {
  id: string,
  name: string,
};

type Product = {
  id: string,
  title: string,
  thumbnail: string,
  price: string,
};

function Home() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const result = await getCategories();
      setCategories(result);
    }

    fetchCategories();
  }, []);

  const searchProduct = async () => {
    const responseProduct = await getProductsFromCategoryAndQuery(search, search);
    setProducts(responseProduct.results);
  };

  const handleCategoryClick = async (category:string) => {
    const responseCategory = await getProductsFromCategoryAndQuery(category, search);
    setProducts(responseCategory.results);
    setSelectedCategory(category);
  };

  // criar uma arrow function que seá usada no onClick
  // dentro da função primeiro atualizar a categoria selecionada
  // após o passo anterior executar a requisição para pegar os produtos
  // finalizar a função
  // esta função deverá ser chamada no onClick da categoria

  return (
    <>
      <label>
        <input
          name="search"
          value={ search }
          onChange={ handleSearch }
          data-testid="query-input"
        />
        <button
          onClick={ searchProduct }
          data-testid="query-button"
        >
          Procurar
        </button>
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
                  onClick={ () => handleCategoryClick(id) }
                />
                { name }
              </label>
            </li>
          ))}
        </ul>
      </div>
      {products.length > 0 && (
        <div>
          {products.map((product) => (
            <div
              key={ product.id }
              data-testid="product"
            >
              <p>
                { product.title }
              </p>
              <img src={ product.thumbnail } alt="Imagem do Produto" />
              <p>
                R$
                { product.price }
              </p>
            </div>
          ))}
        </div>
      )}
      {products.length === 0 && (
        <h2>Nenhum produto foi encontrado</h2>
      )}
    </>
  );
}

export default Home;
