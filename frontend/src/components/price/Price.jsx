import React from 'react';
import PropTypes from 'prop-types';



const Price = ({ service_name, base_price }) => {
  return (
    <div className="price-item">
      <strong>{service_name}</strong>:  {base_price} руб.
    </div>
  );
};

Price.propTypes = {
  service_name: PropTypes.string.isRequired,
  base_price: PropTypes.number.isRequired,
};

export default Price;