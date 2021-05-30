import   React       from "react";
import { Button, 
         Container, 
         ContainerButtonsRoutes,
         ContainerActions,
         Arrow 
       } from "./style";
import   Logo              from "../../Assets/NetflixLogo";
import { AiOutlineSearch } from 'react-icons/ai';
import { GiPresent }       from 'react-icons/gi';
import { BsFillBellFill }  from 'react-icons/bs';
import   Smille            from './../../Assets/Smille.png';
import { useState }        from "react";
import { useCallback }     from "react";

const BarraMenu:React.FC = () => {
    const [mouseHover,setMouseHover] = useState(-1)
    
    const MouseEnter = useCallback((type) => {
        setMouseHover(type)
    },[])

    const MouseLeave = useCallback((type) => {
        setMouseHover(-1)
    },[])

    return (
        <Container>
            <Logo/>
            <ContainerButtonsRoutes>
                <Button>Início</Button>
                <Button>Séries</Button>
                <Button>Filmes</Button>
                <Button>Bombando</Button>
                <Button>Minha Lista</Button>
            </ContainerButtonsRoutes>
            <ContainerActions>
                <Button>
                    <AiOutlineSearch size={25} color="#FFF"/>
                </Button>
                <Button>INFANTIL</Button>
                <Button>
                    <GiPresent size={25} color="#FFF"/>
                </Button>
                <Button>
                    <BsFillBellFill size={25} color="#FFF"/>
                </Button>
                <Button onMouseEnter={()=>MouseEnter(1)} onMouseLeave={MouseLeave}>
                    <img src={Smille} alt='Perfil' style={{height:30,borderRadius:5}}/>
                    <Arrow invert={mouseHover === 1 ? 1 : 0} size={25} color="#FFF" />
                </Button>
            </ContainerActions>
        </Container>
    )
}

export default BarraMenu;