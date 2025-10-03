import { useState } from "react";
import PropTypes from "prop-types";

const ResponsiveImage = ({
  src,
  alt,
  sizes = "100vw",
  className = "",
  loading = "lazy",
}) => {
  const [isError, setIsError] = useState(false);
  const webpSrc = src.replace(/\.(png|jpe?g)$/, ".webp");
  const baseDir = src.substring(0, src.lastIndexOf("/"));
  const fileName = src.substring(src.lastIndexOf("/") + 1);
  const fileExt = fileName.substring(fileName.lastIndexOf("."));
  const baseName = fileName.substring(0, fileName.lastIndexOf("."));

  // Generate srcSet for both WebP and original format
  const generateSrcSet = (format) => {
    const widths = [320, 640, 960, 1280, 1920];
    return widths
      .map((width) => {
        const resizedFileName = `${baseName}-${width}${format}`;
        return `${baseDir}/${resizedFileName} ${width}w`;
      })
      .join(", ");
  };

  // If WebP fails, fall back to original format
  const handleError = () => {
    if (!isError) {
      setIsError(true);
    }
  };

  return (
    <picture>
      {!isError && (
        <source
          type="image/webp"
          srcSet={generateSrcSet(".webp")}
          sizes={sizes}
        />
      )}
      <img
        src={src}
        srcSet={generateSrcSet(fileExt)}
        sizes={sizes}
        alt={alt}
        loading={loading}
        className={className}
        onError={handleError}
        decoding="async"
      />
    </picture>
  );
};

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  sizes: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.oneOf(["lazy", "eager"]),
};

export default ResponsiveImage;
