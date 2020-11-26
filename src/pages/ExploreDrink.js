import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrink(props) {
  const { history: { location: { pathname } }, pageConfig } = props;
  const { header } = pageConfig;
  return (
    <div>
      <Header pathname={ pathname } componentConfig={ header } />
      <p>Pagina de explorar bebidas</p>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageConfig: state.sitemap.explorarBebidas,
});

export default connect(mapStateToProps, null)(ExploreDrink);

ExploreDrink.propTypes = {
  pageConfig: PropTypes.shape({
    header: PropTypes.shape({
      title: PropTypes.string.isRequired,
      profileButton: PropTypes.bool.isRequired,
      searchButton: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};