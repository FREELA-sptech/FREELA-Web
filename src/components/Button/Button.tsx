import { ButtonConfig } from "../../models/button/button.model";


function Button(buttonConfig: ButtonConfig ){    
    return (
        <button onClick={buttonConfig.onClickButton} className={buttonConfig.type}>
            {buttonConfig.title}
        </button>
    );
}
export default Button;

