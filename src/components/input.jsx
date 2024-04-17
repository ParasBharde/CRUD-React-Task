import React from 'react';
import { Form } from 'react-bootstrap';

const InputField = ({ label, type, placeholder, value, onChange }) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default InputField;