import './index.scss'




export default function ModalEndereco({ exibir }) {



    return (
        <div className='comp-modal-endereco'>
            <div className={`modal-endereco ${exibir ? 'exibir' : ''}`}>
                <div className='conteudo'>
                    <h1> Novo Endereço </h1>

                    <div className='form'>
                        <div>
                            <label> Referência: </label>
                            <input type='text' />
                        </div>
                        <div>
                            <label> &nbsp; </label>
                        </div>
                        <div>
                            <label> CEP: </label>
                            <input type='text' />
                        </div>
                        <div>
                            <label> Logradouro: </label>
                            <input type='text' />
                        </div>
                        <div>
                            <label> Número: </label>
                            <input type='text' />
                        </div>
                        <div>
                            <label> Complemento: </label>
                            <input type='text' />
                        </div>
                        <div>
                            <label> &nbsp; </label>
                        </div>
                        <div>
                            <label> Bairro: </label>
                            <input type='text' />
                        </div>
                        <div>
                            <label> Cidade: </label>
                            <input type='text' />
                        </div>
                        <div>
                            <label> Estado: </label>
                            <input type='text' />
                        </div>
                        <div>
                            <label></label>
                            <div className='btn'>
                                <button> Salvar </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}