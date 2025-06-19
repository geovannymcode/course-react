import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const {
    title,
    price,
    discountPercentage,
    thumbnail,
    category,
    rating,
    stock
  } = product;

  const discountedPrice = price * (1 - discountPercentage / 100);

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={thumbnail} 
          alt={title}
          className={styles.image}
          loading="lazy"
        />
        {discountPercentage > 0 && (
          <span className={styles.discount}>
            -{Math.round(discountPercentage)}%
          </span>
        )}
      </div>
      
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        
        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>
            ${discountedPrice.toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <span className={styles.originalPrice}>
              ${price.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className={styles.footer}>
          <div className={styles.rating}>
            ⭐ {rating.toFixed(1)}
          </div>
          <div className={styles.stock}>
            {stock > 0 ? `${stock} disponibles` : 'Sin stock'}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;