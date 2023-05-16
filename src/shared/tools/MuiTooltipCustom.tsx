import { styled } from '@mui/material/styles'
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { Tooltip } from "@mui/material"

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    margin: '5px !important',
    padding: 0
  },
}));

export default HtmlTooltip
