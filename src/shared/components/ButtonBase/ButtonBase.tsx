function ButtonBase(){    
    return (
        <button onClick={buttonConfig.onClickButton} className={buttonConfig.type}>
            {buttonConfig.title}
        </button>
    );
}
export default ButtonBase;

