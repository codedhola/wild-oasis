import React, { createContext, useContext } from "react";
import styled from "styled-components";

interface StyledHeaderProps {
  columns: any
}

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props: any) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)<StyledHeaderProps>`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)<StyledHeaderProps>`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

type ContextProps = {
  // children: React.ReactElement;
  columns: any
}

type TableProps = {
  children?: React.ReactElement;
  columns: any
}

type HeaderProps = {
  children: React.ReactElement;
}

type RowProps = {
  children?: React.ReactElement;
  columns?: any
}

type BodyProps = {
  data: any;
  render: (cabin: any) => JSX.Element
}

const TableContext = createContext<ContextProps | null>(null)

export default function Table({ children, columns}: TableProps){
  return (
  <TableContext.Provider value={{ columns }}>
    <StyledTable role="table">
      {children}
    </StyledTable>
  </TableContext.Provider>
  )
}

function Header({ children }: HeaderProps) {
  const { columns } = useContext<any>(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children }: RowProps) {
  const { columns } = useContext<any>(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }: BodyProps) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return (
    <StyledBody>
      {data.map((item: any, index: any) => (
        <React.Fragment key={index}>{render(item)}</React.Fragment>
      ))}
    </StyledBody>
  );
}
Table.Header = Header
Table.Row = Row
Table.Body = Body
Table.Footer = Footer;