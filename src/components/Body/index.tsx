import { useEffect, useState } from 'react'
import { SearchBar } from '../SearchBar'
import { AddAlbum } from './Models/AddAlbum'
import { api } from '../../lib/api'
import { List } from './List'
import { GrAdd } from 'react-icons/all'

export function Body() {
  const [search, setSearch] = useState('')
  const [albums, setAlbums] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpenAlbumAdd, setIsOpenAlbumAdd] = useState(false)

  const config = { 
    headers: { 
      'Authorization': 'EmmanuelHonoratoBoo@gmail.com',
      'Content-type': 'application/json'
    } 
  }

  useEffect(() => {
    api.get(`/album?keyword=${search}`, config)
      .then(response => {
        setAlbums(response.data.data)
        console.log(response.data.data)
        setIsLoading(false);
      })
  }, [isLoading])

  return (
    <div className='bg-white bg-opacity-60 w-full h-full p-4 overflow-y-scroll scrollbar-track-black scrollbar-thin'>
      <SearchBar 
        setLoading={setIsLoading}
        setAlbums={setAlbums} 
        search={search} 
        setSearch={setSearch} 
      />

      {
        isLoading
        ?
          <div className='flex h-44 items-end justify-center'>
            <div className='circle bg-transparent w-16 h-16 border-4 border-zinc-900 border-l-zinc-400 rounded-full animate-spin opacity-80' />
          </div>
        :
          <>
            {
              albums.length < 1
              ?
                <div className='flex h-36 flex-col items-center justify-end'>
                  <span>Nenhum álbum não encontrado</span>
                  <button onClick={() => setIsOpenAlbumAdd(true)} className='bg-blue-500 h-12 rounded-full w-48 text-white text-lg font-light hover:bg-blue-600 transition-colors'>Adicionar álbum</button>
                  <AddAlbum isOpen={isOpenAlbumAdd} setIsOpen={setIsOpenAlbumAdd} loading={setIsLoading}/>
                </div>
              :
                <>
                  <button
                    type='button'
                    onClick={() => setIsOpenAlbumAdd(true)}
                    className='w-36 h-10 m-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all'
                  >
                    Adicionar Álbum
                  </button>
                  <AddAlbum isOpen={isOpenAlbumAdd} setIsOpen={setIsOpenAlbumAdd} loading={setIsLoading}/>
                  <List search={search} albums={albums} setIsLoading={setIsLoading}/>
                </>
            }
          </>
      }
      </div>
  )
}