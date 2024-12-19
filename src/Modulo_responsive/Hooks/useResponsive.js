import {useMediaQuery} from "@mui/material";
import {theme} from "../../Tema";

export const useResponsive = () => {
    const masSM = useMediaQuery(theme.breakpoints.up('md'))
    const sCell = useMediaQuery(theme.breakpoints.only('xs'))
    const sTab = useMediaQuery(theme.breakpoints.only('sm'))

    return {
        masSM,
        sCell,
        sTab
    }
}