import React from 'react';
import NumberFormat from 'react-number-format';
import cartcss from '../css/Cart.module.css';
import { Link } from 'react-router-dom';
import ShoppingCarts from './ShoppingCarts';

const Cart = ({ items }) => {
  const totalItems = items.length;
  return (
    <section className={cartcss.cart_section}>
      <div className={cartcss.cart_content}>
        <div className={cartcss.cart_items}>
          {totalItems === 0 && (
            <div className={cartcss.empty}>
              <div className={cartcss.item_list}>
                <div className={cartcss.item_list_img}>
                  <Link to='/products/single-product'>
                    <img
                      src='https://m.media-amazon.com/images/I/719ZywAmvOL._AC_AA180_.jpg'
                      alt=''
                    />
                  </Link>
                </div>
                <div className={cartcss.item_list_content}>
                  <h2>Your Amazon Basket is empty!</h2>
                  <Link to='/'>
                    <p>See recommedations</p>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {totalItems !== 0 && (
            <div className={cartcss.filled}>
              <h2>Shopping Cart</h2>
              <ShoppingCarts showSubtotal={false} />
            </div>
          )}
        </div>

        <div className={cartcss.cart_subtotal}>
          <div>
            <img
              src='https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png'
              alt='100% Protection'
            />
          </div>
          <div className={cartcss.cart_subtotal_content}>
            <p>
              Subtotal (0 items):{' '}
              <strong>
                <NumberFormat
                  decimalScale={2}
                  value={2499}
                  thousandsGroupStyle={'lakh'}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'₹ '}
                  fixedDecimalScale={true}
                />
              </strong>
            </p>
            <small className={cartcss.subtotal_gift}>
              <input type='checkbox' /> This order contains a gift
            </small>
            <button className={cartcss.buy_button}>Proceed to Buy</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
