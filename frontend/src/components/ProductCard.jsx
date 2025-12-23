function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <img
        src={`/images/${product.image_url}`}
        alt={product.name}
        className="card-image"
      />

      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="price">₹{product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
