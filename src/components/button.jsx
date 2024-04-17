import React from 'react'
import Button from 'react-bootstrap/Button'

const MyButton = ({ variant, onClick, children }) => {
    return (
        <Button variant={variant} onClick={onClick}>
            {children}
        </Button>
    );
};

export default MyButton