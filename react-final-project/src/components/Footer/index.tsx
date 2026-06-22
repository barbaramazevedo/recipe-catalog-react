import styled from 'styled-components'

const FooterBar = styled.footer`
  margin-top: auto;
  padding: 20px 24px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export default function Footer() {
  return (
    <FooterBar>
      🍽️ Recipe Catalog — ADA Tech React II
    </FooterBar>
  )
}
