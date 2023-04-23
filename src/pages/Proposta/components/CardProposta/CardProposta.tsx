
import ButtonBase from "../../../../shared/components/ButtonBase/ButtonBase";
import "./style.scss"




function CardProposta() {
    const handleSubmit = (event: { preventDefault: () => void; target: {
        [x: string]: any; valorPorHora: { value: any; }; prazoEntrega: { value: any; }; orcamento: { value: any; }; 
        }; }) => {

      event.preventDefault();
      const valorPorHora = event.target.valorPorHora.value;
      const prazoEntrega = event.target.prazoEntrega.value;
      const orcamento = event.target.orcamento.value;
      const descricao = event.target.descricao.value;

      if (valorPorHora === '' || prazoEntrega === '' || orcamento === '' || descricao == '') {
        
    
      } else if (valorPorHora <= 0 || prazoEntrega <= 0 || orcamento <= 0 || descricao <= 0) {
        
        
     }  else {
        alert("proposta enviada")
        // enviar formulário
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="card align-self-start p-3">
          <div className="topo">
            <h4>
              <b>Inicio</b> / Fazer proposta
            </h4>
          </div>
          <div className="p-4">
            <h2>Orçamento</h2>
          </div>
          <div className="d-flex justify-content-evenly box">
            <div className="col-sm-3 teste p-4">
              <h4>Valor por hora:</h4>
              <input type="text" name="valorPorHora" placeholder="$RS:XXXX,XX" required min="0"  />
            </div>
            <div className="col-sm-3 teste p-4">
              <h4>Prazo de entrega:</h4>
              <input type="text" name="prazoEntrega" placeholder="0" required pattern="[1-9][0-9]*"  />
            </div>
            <div className="col-sm-3 teste p-4">
              <h4>Orçamento:</h4>
              <input type="text" name="orcamento" placeholder="$RS:XXXX,XX" required min="0"  />
            </div>
          </div>
          <div className="cardDetalhes p-4">
            <h2>Detalhes</h2>
            <div className="mb-3">
              <label className="form-label" >Descrição</label>
              <textarea className="form-control" name='descricao' required min="10" ></textarea>
            </div>
            <div className="p-2">
              <button type="submit" className="primary-standart">
                Confirma
              </button>
              <button type="button" className="primary-text">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
  

export default CardProposta