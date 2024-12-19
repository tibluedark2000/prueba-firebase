import {Controller, useForm} from 'react-hook-form'
import {canConstructReadableStream} from "workbox-core/_private";

export const useFormulario = ({valoresDefecto = {}}) => {
    const {
        getValues,
        reset,
        setValue,
        register,
        control,
        formState,
        handleSubmit,
        watch,
    } = useForm({defaultValues: valoresDefecto})

    const {errors} = formState

    const props = {
        register: register,
        errors: errors,
        control: control,
        setValue: setValue,
        getValues: getValues,
        watch: watch
    }

    const limpiarEntidad = () => {
        reset()
    }
     const obtenerEntidad = () => {
        return new Promise(resolve => {
            handleSubmit((e, event) => {

                let obj = {}
                for (const property in e) {
                    if (e[property] !== undefined) {
                        obj[property] = e[property]
                    }
                }
                return resolve(obj)
            }).call()

        }).catch(errors => {
            return errors
        })
    }


    return {
        props: props,
        obtenerEntidad,
        setEntidad: reset,
        limpiarEntidad
    }
}