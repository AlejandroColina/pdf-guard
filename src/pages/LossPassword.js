import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRestorePassword } from '../redux/action'



const LossPassword = () => {

    const dispatch = useDispatch()
    const { lossPassword } = useSelector(state => state)

    const [email, setEmail] = useState('')

    const handleInput = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getRestorePassword(email))
    }

    return (
        <section>
            <h2>Recupera tu cuenta</h2>
            <h4>Introduce el correo electrónico para buscar tu cuenta.</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='correo' onChange={handleInput} />
                <input type="submit" value="Enviar" />
                {
                    lossPassword &&
                    <span>{lossPassword}</span>
                }
            </form>
        </section>
    )
}

export default LossPassword