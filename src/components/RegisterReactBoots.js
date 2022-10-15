import { createUserWithEmailAndPassword, getAuth, updatePassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../fairecase/firebase.init';

const auth = getAuth(app)


const RegisterReactBoots = () => {
    const [passError, setPassError] = useState(``);
    const [success, setSuccess] = useState(false)



    const handleRegisrter = event => {
        setSuccess(false)
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const pass = form.password.value;
        console.log(email, pass)

        if (!/([0-9])/.test(pass)) {
            setPassError(`please provide a number`)
            return;
        }
        if (pass.length < 6) {
            setPassError(`minimum 6 chreacter set please`)
            return;
        }
        setPassError(``);

        createUserWithEmailAndPassword(auth, email, pass)
            .then(resualt => {
                const user = resualt.user;
                console.log(user)
                setSuccess(true);
                form.reset()
            })
            .catch(error => {
                console.error("error", error);
                setPassError(error.message)
            })
    }


    return (
        <div className='w-50 mx-auto'>
            <Form onSubmit={handleRegisrter}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{passError}</p>
                {success && <p className='text-success'>user create successfully</p>}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p><small>already have an account. <Link to={'/login'}>Log in</Link></small></p>
         
        </div>
    );

};
export default RegisterReactBoots;