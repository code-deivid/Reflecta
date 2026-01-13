import { auth } from '@/firebase/config'
// import { ref } from 'vue'
import {
    createUserWithEmailAndPassword,
    // onAuthStateChanged,
    sendEmailVerification, // Escuchar cambios de autenticación
    // signInWithEmailAndPassword,
    signOut,
    type User
} from 'firebase/auth'


export interface IAuthResponse {
    ok: boolean
    mensaje: string
    usuario?: User | null
}

export const register = async (email: string, password: string): Promise<IAuthResponse> => {

    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const user = userCredential.user

        await sendEmailVerification(user, { url: `${window.location.origin}/perfil` })

        await signOut(auth) //Cerrar sesión hasta que verifique el email

        return {
            ok: true,
            mensaje: 'Usuario creado. Revisa tu email para verificar la cuenta.',
            usuario: user,
        }

    } catch (error) {

        return {
            ok: false,
            mensaje: 'Error al crear el usuario',
            usuario: null,
        }
    }
}