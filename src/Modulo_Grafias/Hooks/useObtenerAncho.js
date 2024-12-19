import {useEffect, useState} from "react";

export const useObtenerAncho = ({contenedor}) => {
    const [ancho, setAncho] = useState(0)

    useEffect(() => {

        if (contenedor) {
            let resizable = new ResizeObserver((e) => {
                let anchoContenedor = e[0].contentRect.width
                if (anchoContenedor) {
                    setAncho(anchoContenedor)
                }
            })

            resizable.observe(contenedor.current)
        }

    }, [contenedor]);

    return {
        ancho
    }
}