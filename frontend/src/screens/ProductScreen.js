import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Rating from '../components/Rating.js'
import { Link } from 'react-router-dom'
import { detailsProduct } from '../actions/productActions.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1)
  const productId = props.match.params.id
  const productDetails = useSelector((state) => state.productDetails)
  const { error, loading, product } = productDetails
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detailsProduct(productId))
  }, [dispatch, productId])

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`)
  }

  return (
    <Fragment>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <Fragment>
          <Link to='/'>Back to Home</Link>
          <div className='row top'>
            <div className='col-2'>
              <img className='large' src={product.image} alt={product.name} />
            </div>
            <div className='col-1'>
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>Price: ${product.price}</li>
                <li>
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className='col-1'>
              <div className='card card-body'>
                <ul>
                  <li>
                    <div className='row'>
                      <div>Price: </div>
                      <div className='price'>${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className='row'>
                      <div>Status: </div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className='success'> In Stock</span>
                        ) : (
                          <span className='danger'>Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <Fragment>
                      <li>
                        <div className='row'>
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className='primary block'
                        >
                          Add to Cart
                        </button>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductScreen
