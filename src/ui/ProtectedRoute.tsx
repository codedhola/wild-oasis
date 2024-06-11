import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate()
  const { user, isPending, isAuthenticated } = useUser()

  useEffect(() => {
    if(!isAuthenticated && !isPending) return navigate("/login") 

  }, [isAuthenticated, isPending, navigate])


  if(isPending) return (
    <FullPage>
      <Spinner />
    </FullPage>
  )


  if(isAuthenticated) return children
}

export default ProtectedRoute