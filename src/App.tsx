import { Body } from './components/Body';
import { Header } from './components/Header';

export function App() {
  return (
    <div className='App'>
      <div className=' flex flex-col items-center justify-center w-full h-full max-h-[80%] max-w-[80%]'>
        <Header />
        <Body />
      </div>
    </div>
  )
}
