import   styled,{ css, keyframes } from "styled-components";
import { RiArrowUpSFill }     from 'react-icons/ri';

interface ArrowType {
    invert:number;
}

const GirarUp = keyframes`
    from {transform: rotate(0deg);}
    to{transform: rotate(180deg);}
`

const GirarDown = keyframes`
    from {transform: rotate(180deg);}
    to{transform: rotate(0deg);}
`

export const Container = styled.div`
    display:flex;
    align-items:center;
    background:#0C0C0C;
    height:68px;
    padding-left:40px;
    position: relative;
    width: 100%;
`

export const ContainerButtonsRoutes = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
`

export const Button = styled.div`
    margin-left:10px;
    margin-right:10px;
    color:#FFF;
    font-size:16px;
    cursor: pointer;
`

export const ContainerActions = styled.div`
    display: flex;
    position: absolute;
    right: 0;
    flex-direction: row;
    align-items:center;
`
export const Arrow = styled(RiArrowUpSFill)<ArrowType>`
    ${props => props.invert === 1 && css`
        animation: ${GirarUp} 0.5s forwards;
    `
    }
    ${props => props.invert !== 1 && css`
        animation: ${GirarDown} 0.5s forwards;
    `
    }
`