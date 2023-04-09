import "./style.scss"
import React from 'react';



function CardLogin() {

  return (

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className=" mt-5">
            <div className="card-header bg-gradient">
            <div className="card-border">  
              <h2 className=" title text-center ">Entrar</h2>
              <h4 className="subtitle text-center">Digite suas credenciais e faça login</h4>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <div className="category ">E-mail:</div>
                    <input type="text" className="form-control"/>
                  </div>
                  <div className="form-group">
                    <div className="category  ">Senha:</div>
                    <input type="password" className="form-control"/>
                  </div>
                  <button type="submit" className="btn btn-primary category ">Entrar</button>
                  <div className="text-center"><h6>Ainda não tem uma conta?  Cadastre-se</h6></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}

export default CardLogin