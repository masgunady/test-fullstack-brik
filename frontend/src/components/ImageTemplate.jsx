import propTypes from "prop-types";

const ImageTemplate = ({ src, defaultImg, ...rest }) => {
  return (
    <img
      {...rest}
      src={
        src
          ? src.startsWith("https")
            ? src
            : `${import.meta.env.VITE_BACKEND_URL}/uploads/${src}`
          : defaultImg
      }
      alt=""
    />
  );
};

ImageTemplate.propTypes = {
  src: propTypes.string,
  defaultImg: propTypes.node,
};

export default ImageTemplate;
