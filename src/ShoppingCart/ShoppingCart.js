import React from "react";
import "./ShoppingCart.css";

const initialState = {
  products: [],
  total: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
        total: state.total + action.payload.price,
      };
    case "REMOVE_PRODUCT":
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      return {
        ...state,
        products: updatedProducts,
        total: state.total - action.payload.price,
      };
    default:
      console.error("ACTION TYPE NOT SUPPORTED");
      return state;
  }
};

const ShoppingCart = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const productNameRef = React.useRef(null);
  const productPriceRef = React.useRef(null);

  const addProduct = (event) => {
    event.preventDefault();
    const newProduct = {
      id: state.products.length + 1,
      name: productNameRef.current.value,
      price: parseFloat(productPriceRef.current.value),
    };
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    productNameRef.current.value = "";
    productPriceRef.current.value = "";
  };

  const removeProduct = (productId, productPrice) => {
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: { id: productId, price: productPrice },
    });
  };

  const totalPrice = React.useMemo(() => {
    return state.total;
  }, [state.total]);

  return (
    <div className="shopping-cart">
      <h2>Carrito de la compra</h2>
      <form onSubmit={addProduct}>
        <input
          className="shopping-cart__input"
          type="text"
          placeholder="Nombre del producto"
          ref={productNameRef}
        />
        <input
          className="shopping-cart__input"
          type="number"
          placeholder="Precio del producto"
          ref={productPriceRef}
        />
        <button type="submit">Añadir producto</button>
      </form>
      <h3>Productos:</h3>
      <ul>
        {state.products.map((product) => (
          <li key={product.id}>
            {product.name} / {product.price}€{" "}
            <button onClick={() => removeProduct(product.id, product.price)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <p className="shopping-cart__total">Total: {totalPrice}€</p>
    </div>
  );
};

export default ShoppingCart;
