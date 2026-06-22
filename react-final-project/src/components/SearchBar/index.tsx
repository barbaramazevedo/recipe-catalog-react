import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`

const Input = styled.input`
  flex: 1;
  min-width: 220px;
  padding: 12px 18px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 0.95rem;
  font-family: inherit;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Button = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 0.95rem;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="search"
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search recipes"
      />
      <Button type="submit">Search</Button>
    </Form>
  )
}
