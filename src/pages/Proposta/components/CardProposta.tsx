import ButtonBase from "../../../shared/components/ButtonBase/ButtonBase";
import "./style.scss"



function CardProposta() {
    return (

        <div className="card  align-self-start p-3">

            <div className="topo">
                <h4> <b>Inicio</b> / Fazer proposta</h4>
            </div>

            <div className="p-4"><h2>Orçamento</h2></div>

            <div className="d-flex justify-content-evenly box ">

                <div className="col-sm-3 teste p-4">
                    <h4>Valor por hora :</h4>
                    <input type="text" placeholder="$RS:XXXX,XX" />
                </div>

                <div className="col-sm-3 teste p-4">
                    <h4>Prazo de entrega :</h4>
                    <input type="text" placeholder="0" />
                </div>

                <div className="col-sm-3 teste p-4">
                    <h4>Orçamento  :</h4>
                    <input type="text" placeholder="$RS:XXXX,XX " />
                </div>
            </div>

            <div className="cardDetalhes p-4">
                <h2>Detalhes</h2>
                <div className="mb-3 ">
                    <label className="form-label">Descrição</label>
                    <textarea className="form-control" ></textarea>
                </div>


                <div className="p-2">
                    <ButtonBase onClick={function (): void {
                        throw new Error("Function not implemented.");
                    }} buttonType={"primary-standart"} label={"Confirma"} />

                    <ButtonBase onClick={function (): void {
                        throw new Error("Function not implemented.");
                    }} buttonType={"primary-text"} label={"Cancelar"} />

                </div>

            </div>
        </div>


    );
}

export default CardProposta