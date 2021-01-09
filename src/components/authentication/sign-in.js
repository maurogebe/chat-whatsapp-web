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


function SignIn(props) {

    let firstName = useRef()
    let lastName = useRef()
    let username = useRef()
    let email = useRef()
    let password = useRef()
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const history = useHistory()

    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if(user) {
    //             history.push('/chat')
    //         }
            
    //     });
    // }, [])

    // Iniciando sesion con google
    const showGooglePopup = async(event) => {
        event.preventDefault()
        try {
            let result = await firebase.auth().signInWithPopup(googleProvider)
            let token = result.credential.accessToken
            console.log("Autenticado satisfactoriamente", result.user);
            // props.setUserFn(result.user)
            // history.push('/chat')
        } catch (error) {
            console.log("Error en la autenticacion", error);
        }

    }

    // Creando usuario con correo y contrasena
    const showCreateUserWithEmail = async(event) => {
        event.preventDefault()

        

        try {
            let result = await firebase.auth().createUserWithEmailAndPassword(email.current.value, password.current.value)
            console.log("Autenticado satisfactoriamente", result.user);

            // Actualizando Usuario
            const user = firebase.auth().currentUser;

                // Datos para el POST de la API de chat whatsapp
                let myHeaders = new Headers()
                myHeaders.append("Content-Type", "application/json")
                let raw = JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email:email,
                    uid: user.uid,
                    username: username,
                    photoUrl: user.providerData[0].photoURL
                });
                let requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                user.updateProfile({
                    displayName: `${firstName.current.value} ${lastName.current.value}`,
                }).then(function() {

                    // Anadiendo usuario a API de Chat Whatsapp
                    fetch("https://academlo-whats.herokuapp.com/api/v1/users", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result)
                        // history.push('/chat')
                    })
                    .catch(error => console.log('error', error));
                }).catch(function(error) {
                // An error happened.
                    console.log('no se actualizo perfil Firebase', error)
                });
        } catch (error) {
            alert('Error en la autenticacion')
            console.log("Error en la autenticacion", error);
            // console.log(email.current)
        }
    }

    return(
        <>
            <div className="contain-authentication">
                <h2 className="title-authentication">Sign In</h2>
                <form onSubmit={showCreateUserWithEmail} className="form-authentication">
                    <div className="contain-form">
                        <div className="contain-input-label">
                            <label for="first-name" className="label-authentication">
                                Enter First Name
                            </label>
                            <input ref={firstName} type="text" className="input-authentication" id="firs-name" required />
                        </div>
                        <div className="contain-input-label">
                            <label for="last-name" className="label-authentication">
                                Enter Last Name
                            </label>
                            <input ref={lastName} type="text" className="input-authentication" id="last-name" required />
                        </div>
                        <div className="contain-input-label">
                            <label for="email" className="label-authentication">
                                Enter Email
                            </label>
                            <input ref={email} className="input-authentication" id="email" type="email" required />
                        </div>
                        <div className="contain-input-label">
                            <label for="username" className="label-authentication">
                                Enter Username
                            </label>
                            <input ref={username} type="text" className="input-authentication" id="username" required />
                        </div>
                        <div className="contain-input-label">
                            <label for="password" className="label-authentication">
                                Enter Password
                            </label>
                            <input ref={password} className="input-authentication" id="password" type="password" minLength="8" required />
                        </div>
                        <div className="contain-input-label">
                            <label for="confirm-password" className="label-authentication">
                                Confirm Password
                            </label>
                            <input className="input-authentication" id="confirm-password" type="password" minLength="8" required />
                        </div>
                    </div>
                    <input className="button-authentication" type="submit" />
                    <h4 className="text-authentication">OR</h4>
                    <button onClick={showGooglePopup} className="button-authentication-social">
                        <FontAwesomeIcon className="icon-authentication-social" icon={faGoogle} size="lg" /> Continue whit Google
                    </button>
                    <p className="text-authentication text-authentication--position">
                    You are not a member? <Link to="/" className="link-to-sign">Log In</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default SignIn