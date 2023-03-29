import { ButtonConfig } from "../../models/button/button.model";


function Button(buttonConfig: ButtonConfig ){
    
    return (
        <button className={buttonConfig.type} onClick={() => buttonConfig.onClickButton}>{buttonConfig.title}</button>
    );
}
export default Button;

