import styles from "./Button.module.scss";
import PropTypes from "prop-types";

export enum ButtonTypes {
  PRIMARY = "primary",
  OUTLINE = "outline",
  WHITE = "white",
}

const Button = ({
  type,
  onClick = () => {},
  name,
  href,
  classes = "",
  ...otherProps
}: {
  type: ButtonTypes;
  onClick?: () => void;
  name: string;
  href: string;
  classes?: string;
  [key: string]: string | (() => void);
}) => {
  const buttonClasses =
    "py-2 px-7 font-medium rounded text-base md:text-xl tracking-wide link duration-300 flex items-center";

  return (
    <a
      {...otherProps}
      onClick={onClick}
      href={href}
      className={`${getButtonTypeStyles(type)} ${buttonClasses} ${classes}`}
    >
      {name}
    </a>
  );

  function getButtonTypeStyles(type: ButtonTypes) {
    return type === ButtonTypes.PRIMARY
      ? styles.primary
      : type === ButtonTypes.WHITE
      ? styles.white
      : styles.outline;
  }
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  href: PropTypes.string,
  classes: PropTypes.string,
};

export default Button;
