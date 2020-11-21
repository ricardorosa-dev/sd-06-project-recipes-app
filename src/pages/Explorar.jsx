import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';

function Explorar() {
  const { setDisabledSearchIcon, setTitleHeader } = useContext(ReceitasContext);
  
  useEffect(() => {
    setDisabledSearchIcon(true);
    setTitleHeader('Explorar');
  }, []);

  return (  
    <div>
      <Header />
      <Link to="/comidas">Comidas</Link>
      <Link to="/bebidas">Bebidas</Link>
    </div>
  );
}

export default Explorar;
