import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top-color: #e67e22;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin: 40px auto;
`

export default function Loading() {
  return <Spinner />
}
