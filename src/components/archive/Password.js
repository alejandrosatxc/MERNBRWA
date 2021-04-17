import React from 'react';
import{ Form } from 'react-bootstrap';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { useState } from 'react';

const Password = () => {

    const [password, setPassword] = useState({
        firstPassword: "",
        secondPassword: "",
    });

    const [
        validLength,
        hasNumber,
        upperCase,
        lowerCase,
        match,
        specialChar,
    ] = usePasswordValidation({
        firstPassword: password.firstPassword,
        secondPassword: password.secondPassword,
    });

    const setFirst = (event) => {
        setPassword({ ...password, firstPassword: event.target.value });
    };

    const setSecond = (event) => {
        setPassword({ ...password, secondPassword: event.target.value });
    };
    

    return (
        <Form.Row>
            <Form.Group controlId="signup.password">
                <Form.Label srOnly="true">Password</Form.Label>
                <Form.Control 
                    required
                    type="password" 
                    placeholder="Password"
                    onChange={setFirst} 
                />
                <Form.Text>Valid Length: {validLength ? <span>True</span> : <span>False</span>}</Form.Text>
                <Form.Text>Has a Number: {hasNumber ? <span>True</span> : <span>False</span>}</Form.Text>
                <Form.Text>UpperCase: {upperCase ? <span>True</span> : <span>False</span>}</Form.Text>
                <Form.Text>LowerCase: {lowerCase ? <span>True</span> : <span>False</span>}</Form.Text>
                <Form.Text>Special Character:{" "} {specialChar ? <span>True</span> : <span>False</span>}</Form.Text>
                <Form.Control.Feedback type="invalid">Password does not meet requirements</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="signup.confirmpw">
                <Form.Label srOnly="true">Confirm Password</Form.Label>
                <Form.Control 
                    required 
                    type="password" 
                    placeholder="Confirm Password"
                    onChange={setSecond}
                    isValid={match}
                />
                <Form.Text>Match: {match ? <span>True</span> : <span>False</span>}</Form.Text>
                <Form.Control.Feedback type="invalid">Password does not meet requirements</Form.Control.Feedback>

            </Form.Group>
        </Form.Row>
    );
};

export default Password
