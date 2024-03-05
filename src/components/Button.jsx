import PropTypes from 'prop-types';

const Button = ({onClick, label, type, borderRadius, borderColor, width, height, backgroundColor, color, fontSize, fontFamily, margin, padding}) => {
    return(
        <button type={type}
                onClick={onClick}
                style={{borderRadius,
                        borderColor,
                        width,
                        height,
                        backgroundColor,
                        color,
                        fontSize,
                        fontFamily,
                        margin,
                        padding}}>
            {label}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"])
};

Button.defaultProps = {
    type: "button",
};

export default Button;