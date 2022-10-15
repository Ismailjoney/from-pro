import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth';
import app from '../../fairecase/firebase.init';


 const auth = getAuth(app)

const Login = () => {
    const [userEmail,setUEmail] = useState();
    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)

        signInWithEmailAndPassword(auth, email, password)
        .then(resualt => {
            const user = resualt.user;
            form.reset()
            verifyEmail()
        })
        .catch(error => {
            console.error(`error`,error)
        })
    }
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser )
        .then(() => {
            alert(`please verify tour email`)
        })

    }

    const handleEmailBlur =(event)=>{
        const email = event.target.value;
        setUEmail(email)
        console.log(email)
    }

    const handleResetpass = ()=>{
        if(!userEmail){
            alert(`please send your email address`)
        }

        sendPasswordResetEmail(auth,userEmail)
        .then( () => {
          alert(`pass reset email send please check your email`)  
        })
        .catch( error =>{
            console.log(error)
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>Log in !!!</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Example label</label>
                    <input onBlur={handleEmailBlur} type="email" name="email" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" required/>
                </div>
                <div className="mb-3">
                    <label  htmlFor="formGroupExampleInput2" className="form-label">Another label</label>
                    <input type="password" name="password" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" required />
                </div>
                <button className="btn btn-primary" type="submit">Button</button>
            </form>
            <p><small>if you have no account. <Link to={'/register'}>Register now</Link></small></p>
            <p>Forget password. please reset <button onClick={handleResetpass} type="button" className='btn btn-link'>Reset pasaword</button></p>
        </div>
    );
};

export default Login;