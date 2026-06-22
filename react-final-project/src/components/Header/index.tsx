import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const Nav = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
`

const Logo = styled(Link)`
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
`

const NavLinks = styled.nav`
  display: flex;
  gap: 8px;
`

const NavLink = styled(Link)<{ $active: boolean }>`
  color: #fff;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.2s;
  background: ${({ $active }) => ($active ? 'rgba(255,255,255,0.25)' : 'transparent')};

  &:hover {
    background: rgba(255,255,255,0.2);
  }
`

export default function Header() {
  const { pathname } = useLocation()

  return (
    <Nav>
      <Logo to="/">🍽️ Recipes</Logo>
      <NavLinks>
        <NavLink to="/" $active={pathname === '/'}>Home</NavLink>
        <NavLink to="/favorites" $active={pathname === '/favorites'}>⭐ Favorites</NavLink>
      </NavLinks>
    </Nav>
  )
}
