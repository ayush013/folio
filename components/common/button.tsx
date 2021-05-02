import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const Button = ({ type, onClick, name, href, newTab }) => {
    return (
        <a onClick={onClick} href={href} target={newTab ? '_blank' : ''} rel={newTab ? 'noreferrer' : ''} className={(type === 'primary' ? styles.primary : type === 'white' ? styles.white : styles.outline) + ' py-2 px-7 font-medium rounded text-xl tracking-wide link duration-300 flex items-center'}>{name}</a>
    )
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    newTab: PropTypes.bool
}

export default Button;