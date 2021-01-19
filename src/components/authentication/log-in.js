import React, { useRef, useEffect, useState } from 'react'
import firebase from '../../firebase'
import {
    Link,
    useHistory,
  } from "react-router-dom";

// Import Style
import './authentication.css'

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'


function LogIn(props) {

    let [user, setUser] = useState([])
    let email = useRef()
    let password = useRef()
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const history = useHistory()

    useEffect(() => {
        let uid = localStorage.getItem('uid')
            if(uid) {
                history.push('/chat')
            }
    }, [])

    // Iniciando sesion con google
    const showGooglePopup = async(event) => {
        event.preventDefault()
        try {
            let result = await firebase.auth().signInWithPopup(googleProvider)
            let token = result.credential.accessToken

            // Mandando al local Storage el uid de Firebase para autenticar rutas protegidas
            localStorage.setItem('uid', result.user.uid)

            console.log("Autenticado satisfactoriamente", result.user);
            // props.setUserFn(result.user)
            history.push('/chat')
        } catch (error) {
            console.log("Error en la autenticacion", error);
        }

    }

    // Iniciando Sesion con correo y contrasena
    const showSignInUserWithEmail = async(event) => {
        event.preventDefault()

        let users = []
        try {
            let resultFire = await firebase.auth().signInWithEmailAndPassword(email.current.value, password.current.value)

            // Mandando al local Storage el uid de Firebase para autenticar rutas protegidas
            localStorage.setItem('uid', resultFire.user.uid)

            // Accediendo a los usuarios que existen en la API Academlo Chat
            fetch("https://academlo-whats.herokuapp.com/api/v1/users")
                    .then(response => response.text())
                    .then(result => {
                        console.log(JSON.parse(result))
                        users = JSON.parse(result)
                        let user = users.find( u => u.uid === resultFire.user.uid)
                        console.log(user)
                        // history.push('/chat')
                    })
                    .catch(error => console.log('error', error));
            console.log("Autenticado satisfactoriamente", resultFire.user);
        } catch (error) {
            alert('Error')
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
                    <p className="text-authentication text-authentication--position">
                    You are not a member? <Link to="/sign-in" className="link-to-sign">Sign In</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default LogIn