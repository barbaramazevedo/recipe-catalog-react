import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import { theme } from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import AppRoutes from './routes/AppRoutes'
import Header from './components/Header'
import Footer from './components/Footer'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex: 1;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Layout>
          <Header />
          <Main>
            <AppRoutes />
          </Main>
          <Footer />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
