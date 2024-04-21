import styled from "styled-components";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
type Props = { 
  children: React.ReactNode
}

type OpenProps = { 
  children: React.ReactElement
  opens: any
}
type WindowProps = {
  children: React.ReactNode,
  name: React.ReactNode
}

type ContextProps = {
  open: any;
  closeModal: any;
  openName: any
}

const ModalContext = createContext<ContextProps | null>(null)

export default function Modal({ children }: Props){
  const [openName, setOpenName] = useState<string>("")
  const closeModal = () => setOpenName("");

  const open = setOpenName

  return <ModalContext.Provider value={{open, closeModal, openName}}>{children}</ModalContext.Provider>
}

function Open({ children, opens } : OpenProps){
  const { open } = useContext<any>(ModalContext)

  return cloneElement(children, { onClick: () => open(opens) })
}

function Window({ children, name}: WindowProps){
  const { closeModal, openName }  = useContext<any>(ModalContext)

  const ref:any = useOutsideClick(closeModal)

  if(name !== openName) return null
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={closeModal}>
          <HiXMark></HiXMark>
        </Button>
        <div>
        {cloneElement(children  as React.ReactElement<any>, { closeModal })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window