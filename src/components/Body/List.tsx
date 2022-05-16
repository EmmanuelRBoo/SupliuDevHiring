import { Fragment, useState } from 'react'
import { MdDeleteForever, IoMusicalNote, IoCloseSharp } from 'react-icons/all'
import { api } from '../../lib/api'
import { AddTrack} from './Models/AddTrack'
import { DeleteAlbum } from './Models/DeleteAlbum'
import { DeleteTrack } from './Models/DeleteTrack'

interface Props {
  albums: Array<any>
  search: string
  setIsLoading: (type: boolean) => void
}

interface ListProps {
  id: number
  name: string
  year: number
  tracks: Array<MapProps>
}


interface MapProps {
  id: number
  title: string
  number: number
  duration: number
}

export function List({ albums, search, setIsLoading }: Props) {
  const [isOpenAlbumDelete, setIsOpenAlbumDelete] = useState(false)
  const [isOpenTrackDelete, setIsOpenTrackDelete] = useState(false)

  const [isOpenTrackAdd, setIsOpenTrackAdd] = useState(false)

  const [id, setId] = useState<number>(0)
  const [trackLength, setTrackLength] = useState<number>(0)

  function handleDelete(id: number, item: string) {
    const config = { 
      headers: { 
        'Authorization': 'EmmanuelHonoratoBoo@gmail.com',
        'Content-type': 'application/json'
      } 
    }

    const data = Number(id)

    api.delete(`/${item}/${data}`, config)

    setIsLoading(true)
  }

  return (
    <div className='flex flex-col justify-center mx-5'>
      {
        albums.map((res: ListProps) =>(
          <Fragment key={res.id}>
            <div className='flex items-center justify-between'>

              <span className='font-extrabold'>Álbum: {res.name}, {res.year}</span>

              <div>
                <button
                  type='button'
                  onClick={() => {
                    setId(res.id)
                    setTrackLength(res.tracks.length)
                    setIsOpenTrackAdd(true)
                  }}
                  className='h-7 m-2 px-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all'
                >
                  Nova Faixa
                </button>
                <AddTrack albumId={id} tracksLength={trackLength} isOpen={isOpenTrackAdd} setIsOpen={setIsOpenTrackAdd} loading={setIsLoading} />

                <button
                  type='button'
                  onClick={() => {
                    setId(res.id)

                    setIsOpenAlbumDelete(true)
                  }}
                  className='h-7 px-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all'
                >
                  Excluir Álbum
                </button>
                <DeleteAlbum handleDelete={handleDelete} id={id} isOpen={isOpenAlbumDelete} setIsOpen={setIsOpenAlbumDelete} />
              </div>
            </div>
            <ul className='flex font-light m-1 my-2 text-left'>
              <li className='w-[5%]'>N°</li>
              <li className='flex flex-1 w-[90%]'>Faixa</li>
              <li className='w-[5%]'>Duração</li>
            </ul>
            {
              res.tracks.filter(res => res.title.includes(search)).map((res) => {
                const min = Math.floor(res.duration/60)
                let sec = res.duration%60
                return (
                  <div 
                    key={res.id}
                    className='flex '
                  >

                    <button
                      onClick={() => {
                        setId(res.id)
                        setIsOpenTrackDelete(true)
                      }}
                      className='-ml-7 cursor-pointer'
                    >

                      <IoCloseSharp
                        size={20}
                        className='m-1 hover:w-7 hover:h-7 hover:m-0 hover:text-red-600 transition-all'
                      />
                    </button>
                    <DeleteTrack id={id} isOpen={isOpenTrackDelete} setIsOpen={setIsOpenTrackDelete} handleDelete={handleDelete}/>

                    <ul
                      className='flex w-full font-light m-1 my-2'
                    >
                      <li className='w-[5%] flex items-center'>{res.number}</li>
                      <li className='flex flex-1 w-[90%]'>{res.title}</li>
                      <li className='w-[5%]'>{min}:{sec < 10 ? 0+sec.toString() : sec}</li>
                    </ul>
                  </div>
                )
              })
            }
          </Fragment>
        ))
      }
    </div>
  )
}