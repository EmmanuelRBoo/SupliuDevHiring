import { FormEvent } from 'react'
import { RiAlbumFill } from 'react-icons/ri'

interface Props {
  search: string
  setSearch: (type: string) => void
  setAlbums: (type: Array<any>) => void
  setLoading: (type: boolean) => void
}

export function SearchBar({ search, setSearch, setAlbums, setLoading }: Props) {

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    
    setLoading(true)
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className='flex items-end'
    >
      <label 
        htmlFor='search'
        className='flex flex-col w-full '
      >
        <span className='font-light text-zinc-600 ml-4'>Digite uma palavra chave</span>
        <input 
          type='search' 
          name='search'
          placeholder='Digite aqui...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full p-2 pl-8 h-12 text-lg border-collapse border-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-0 resize-none rounded-full text-zinc-600 font-light'
        />
      </label>

      <button 
        type='submit'
        className='bg-blue-500 h-12 rounded-full w-56 ml-4 text-white text-lg font-light hover:bg-blue-600 transition-colors'
      >
        Procurar
      </button>
    </form>
  )
}