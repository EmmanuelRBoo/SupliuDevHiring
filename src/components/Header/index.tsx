import logo from '../../assets/logo.png'

export function Header() {
  return (
    <header className='bg-white w-full p-4 flex items-center justify-between shadow-md shadow-zinc-900'>
      <img
        className=''
        src={logo}
      />
      <span className='font-extralight text-4xl'>Discografia</span>
    </header>
  )
}
