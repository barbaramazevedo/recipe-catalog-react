import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #c0392b;
`

const Title = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 8px;
`

const Detail = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
`

interface ErrorMessageProps {
  message?: string
}

export default function ErrorMessage({ message = 'Something wrong. Try again.' }: ErrorMessageProps) {
  return (
    <Wrapper>
      <Title>Error</Title>
      <Detail>{message}</Detail>
    </Wrapper>
  )
}
