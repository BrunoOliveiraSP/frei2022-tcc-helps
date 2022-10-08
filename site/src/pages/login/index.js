import './index.scss'

import { useState } from 'react'
import { logar } from '../../api/loginCliente';
import { toast } from 'react-toastify';

import Storage from 'local-storage'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function logarCliente() {
        try {
            const r = await logar(email, senha);
            Storage('cliente-logado', r);
            toast.dark('Usuário logado', { autoClose: 400, hideProgressBar: true });

            setTimeout(() => {
                navigate('/');
            }, 1500);
            
        }
        catch (err) {
            toast.error(err.response.data.erro);
        }
    }


    return (
        <div className='pagina-cli-login'>
            <h1> Login Cliente </h1>

            <div className='form-container'>

                <div className='form'>

                    <div>
                        <label> E-mail: </label>
                        <input type='text' placeholder="Ex.: cliente@devmonk.com.br" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label> Senha: </label>
                        <input type='password' placeholder="***" value={senha} onChange={e => setSenha(e.target.value)}  />
                    </div>

                    <div className='btn-right'>
                        <label></label>
                        <button onClick={logarCliente}> Logar </button>
                    </div>

                    <div></div>

                </div>

            </div>
        </div>
    )
}