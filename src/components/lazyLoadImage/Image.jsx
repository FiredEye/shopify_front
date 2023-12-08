import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./image.scss";
const Image = ({ src, alt }) => {
  return <LazyLoadImage src={src} alt={alt} effect="blur" />;
};

export default Image;
