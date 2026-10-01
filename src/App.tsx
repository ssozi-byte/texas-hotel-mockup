import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Signatures from './components/Signatures'
import About from './components/About'
import Menu from './components/Menu'
import Experience from './components/Experience'
import Gallery from './components/Gallery'
import Reservation from './components/Reservation'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-charcoal font-body text-cream">
      <Navbar />
      <main>
        <Hero />
        <Signatures />
        <About />
        <Menu />
        <Experience />
        <Gallery />
        <Reservation />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
