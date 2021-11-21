import React, { Fragment } from 'react'
import data from '../data'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <Fragment>
      <div className='row center'>
        {data.products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </Fragment>
  )
}

export default HomeScreen
