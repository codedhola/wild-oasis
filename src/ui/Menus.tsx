import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: { x: number; y: number } }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props: any) => props.position.x}px;
  top: ${(props: any) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext<any>({ open, close })

export default function Menus({ children}: any){
  const [openId, setOpenId] = useState<string>("")
  const [position, setPosition] = useState<any>({ })

  const close = () => setOpenId("")

  const open = setOpenId

  return (
    <MenusContext.Provider value={{ close, open, openId, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  )
}

function Toggle({ id }: any){
  const { openId, open, close, setPosition } = useContext(MenusContext)
  
  const handleClick = (e: any) => {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }
  
  return (<StyledToggle onClick={(e) => handleClick(e)}>
    <HiEllipsisVertical />
  </StyledToggle>

  )

}

function List({ id, children }: any){
  const { openId, close, position} = useContext(MenusContext)
  const ref = useOutsideClick(close);

  if(openId !== id) return null
  return createPortal(
    <StyledList position={position} ref={ref}>{children}</StyledList>,
    document.body
    )
}

function Button({children, icon, onClick}: any){
  const { close }= useContext(MenusContext)
  const handleClick = () => {
    onClick?.()
    close()
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>{children}<span> {icon}</span></StyledButton>
    </li>
  )
}

Menus.Menu = StyledMenu 
Menus.Toggle = Toggle 
Menus.List = List 
Menus.Button = Button 