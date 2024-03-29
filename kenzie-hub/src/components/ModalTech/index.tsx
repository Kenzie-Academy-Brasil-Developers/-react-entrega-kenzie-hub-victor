import { ModalDiv, DivHeaderForm, ModalPage, DivForm } from "./style"
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import api from "../../services/api";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

interface iModalIsOpen {
    setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface iCreatTech {
    title: string,
    status: string
}

function ModalTech ({setModalState}: iModalIsOpen) {
    
    const X = require("../../assets/X.png") 
    
    const { loadUser } = useContext(UserContext)


    const onSubmitFunction = (data: iCreatTech) => {
        creatTech(data)
        setModalState(false)
        loadUser()
        reset()
        
    }
    
    async  function creatTech (data: iCreatTech) {
        
        const token = localStorage.getItem("@TOKEN")
        if (token) {
    
            try {
                api.defaults.headers.authorization = `Bearer ${token}`
                await api.post<iCreatTech>('/users/techs', data)

            } catch (error) {
                console.error(error)
            }
    
        }
    }
    
    const formSchema = yup.object().shape({
        title: yup
            .string()
            .required("Nome da tecnologia obrigatorio"),
    })

    const { register, handleSubmit, formState:{ errors }, reset} = useForm<iCreatTech>({
        resolver: yupResolver(formSchema)
    })


    return(
        <ModalPage>
            <ModalDiv>
                <DivHeaderForm>
                    <h2>Cadastrar Tecnologia</h2>
                    <img 
                        src={X} 
                        alt="Imagem de X" 
                        onClick={() => setModalState(false)}
                    />
                </DivHeaderForm>
                <DivForm>
                    <form onSubmit={handleSubmit(onSubmitFunction)}>
                        <div>
                            <p>Nome</p>
                            <input type="text" {...register("title")}/>
                            {errors.title?.message}
                        </div>
                        <div>
                            <p>Selecionar Status</p>
                            <select {...register("status")}>
                                <option value="Iniciante">Iniciante</option>
                                <option value="Intermediário">Intermediário</option>
                                <option value="Avançado">Avançado</option>
                            </select>
                        </div>
                        <button type="submit">Cadastrar Tecnologia</button>
                    </form>
                </DivForm>
            </ModalDiv>
        </ModalPage>
    )
}

export default ModalTech;