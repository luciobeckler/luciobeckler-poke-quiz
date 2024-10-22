import React from "react";

export default function useForm(getFreshModelObject) {
  const [values, setValues] = React.useState(getFreshModelObject());
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values, 
    setValues, 
    errors, 
    setErrors, 
    handleInputChange
  };
}
