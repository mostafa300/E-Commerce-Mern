import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
  const dispach = useDispatch()
  const prosuctListState = useSelector(state => state.productListState)
  const { loading, error, products } = prosuctListState;

  useEffect(() => {
    dispach(listProducts()) // which the Action of consumming the request 
  }, [])
  // ************************************************************
  //*               Without useing Reducer
  //*************************************************************
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const featchData = async () => {
  //     const { data } = await axios.get(`/api/products`);
  //     setProducts(data);
  //   }

  //   featchData()
  // }, [])
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
      }

    </>
  )
}

export default HomeScreen
