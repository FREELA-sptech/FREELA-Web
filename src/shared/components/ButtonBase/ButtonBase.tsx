import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import './style.scss'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'

type Props = {
  onClick: () => void
  buttonType: string
  label: string
  className?: string
  isLoading?: boolean
  icon?: ReactJSXElement
  type?: "submit"
}

function ButtonBase({ onClick, buttonType, label, className, isLoading, icon, type }: Props) {
  return (
    <button
      onClick={onClick}
      className={`button-base ${buttonType} ${className} ${isLoading ? "disabled-button" : ""}`}
      type={type ?? "button"}
    >
      <Box display='flex' alignItems='center' justifyContent='center' gap='5px'>
        {label}
        {!isLoading ? (
          icon ? icon : null
        ) : (
          <CircularProgress sx={{ height: '15px !important', width: '15px !important' }} />
        )}
      </Box>
    </button>
  );
}
export default ButtonBase;

