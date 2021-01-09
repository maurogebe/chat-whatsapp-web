import React, { useRef, useEffect } from 'react'
import firebase from '../../firebase'
import {
    Link,
    useHistory,
  } from "react-router-dom";

// Import Style
import './authentication.css'

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'


function LogIn(props) {

    let email = useRef()
    let password = useRef()
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    const history = useHistory()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                history.push('/chat')
            }
            
        });
    }, [])

    // Iniciando sesion con google
    const showGooglePopup = async(event) => {
        event.preventDefault()
        try {
            let result = await firebase.auth().signInWithPopup(googleProvider)
            let token = result.credential.accessToken
            console.log("Autenticado satisfactoriamente", result.user);
            // props.setUserFn(result.user)
            history.push('/chat')
        } catch (error) {
            console.log("Error en la autenticacion", error);
        }

    }


    // Iniciando sesion con facebook
    const showFacebookPopup = async(event) => {
        event.preventDefault()
        facebookProvider.addScope('user_photos')
        try {
            let result = await firebase.auth().signInWithPopup(facebookProvider)
            let token = result.credential.accessToken
            console.log(token)
            console.log("Autenticado satisfactoriamente", result.user);
            // props.setUserFn(result.user)
            history.push('/chat')
        } catch (error) {
            console.log("Error en la autenticacion", error);
            console.log("Error de Token", error.credential)
        }

    }

    // Iniciando Sesion con correo y contrasena
    const showSignInUserWithEmail = async(event) => {
        event.preventDefault()
        try {
            let result = await firebase.auth().signInWithEmailAndPassword(email.current.value, password.current.value)
            console.log("Autenticado satisfactoriamente", result.user);
            history.push('/chat')
        } catch (error) {
            alert('')
            console.log("Error en la autenticacion", error);
        };
    }

    return(
        <>
            <div className="contain-authentication">
                <h2 className="title-authentication">Log In</h2>
                <form onSubmit={showSignInUserWithEmail} className="form-authentication">
                    <label className="label-authentication" for="email">Enter your email</label>
                    <input ref={email} className="input-authentication" id="email" type="email" required />
                    <label className="label-authentication" for="password">Enter your password</label>
                    <input ref={password} className="input-authentication" id="password" type="password" minLength="8" required />
                    <input className="button-authentication" type="submit" />
                    <h4 className="text-authentication">OR</h4>
                    <button onClick={showGooglePopup} className="button-authentication-social">
                        <FontAwesomeIcon className="icon-authentication-social" icon={faGoogle} size="lg" /> Continue whit Google
                    </button>
                    <button onClick={showFacebookPopup} className="button-authentication-social">
                        <FontAwesomeIcon className="icon-authentication-social" icon={faFacebookF} size="lg" /> Continue whit Facebook
                    </button>
                    <p className="text-authentication text-authentication--position">
                    You are not a member? <Link to="/sign-in" className="link-to-sign">Sign In</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default LogIn