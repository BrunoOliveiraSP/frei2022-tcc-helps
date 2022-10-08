import './index.scss'

export default function Login() {

    return (
        <div className='pagina-admin-login'>
            <h1> Login Administrador </h1>

            <div className='form-container'>

                <div className='form'>

                    <div>
                        <label> E-mail: </label>
                        <input type='text' placeholder="Ex.: admin@devmonk.com.br" />
                    </div>

                    <div>
                        <label> Senhha: </label>
                        <input type='password' placeholder="***" />
                    </div>

                    <div className='btn-right'>
                        <label></label>
                        <button> Logar </button>
                    </div>

                    <div></div>

                </div>

            </div>
        </div>
    )
}