import { useState } from 'react'
import { api } from '../../../lib/api'

interface Props {
  isOpen: boolean
  albumId: number | null
  tracksLength: number
  setIsOpen: (type: boolean) => void
  loading: (type: boolean) => void
}

export function AddTrack(props: Props) {
  const [trackName, setTrackName] = useState('')
  const [trackDuration, setTrackDuration] = useState<number | undefined>(undefined)

  function bg(event: any) {
    event.stopPropagation()
    event.preventDefault()
  }

  function addTrack() {
    const config = { 
      headers: { 
        'Authorization': 'EmmanuelHonoratoBoo@gmail.com',
        'Content-type': 'application/json'
      } 
    }

    api.post('/track', {
      album_id: props.albumId,
      number: props.tracksLength + 1,
      title: trackName,
      duration: trackDuration
    }, config)

    props.loading(true)
  }

  if (!props.isOpen) return null

  return (
    <div 
      className='absolute flex z-50 items-center justify-center w-full h-full top-0 left-0 bg-zinc-400 bg-opacity-50'
      onClick={() => props.setIsOpen(false)}
    >
      <div onClick={bg} className='h-[300px] w-[350px] z-0 bg-slate-200 border-2 border-slate-600 rounded-2xl ring-2 ring-slate-200'>
        <form className='p-2 py-2 flex flex-col justify-between h-full'>
          <span className='font-semibold text-xl'>Adicionar faixa</span>
            <label htmlFor="name">
              Nome da faixa:
              <input 
                type="text" 
                name='name'
                placeholder='Digite o nome da faixa...'
                value={trackName}
                onChange={(e) => setTrackName(e.target.value)}
                className='rounded-md w-full'
              />
            </label>
            <label htmlFor="track">
              Duração da faixa:
              <input
                type="number"
                name="track"
                placeholder='Digite a duração em segundos...'
                value={Number(trackDuration)}
                onChange={(e) => setTrackDuration(e.target.valueAsNumber)}
                className='rounded-md w-full'
              />
            </label>
          <div className='flex'>
            <button 
              type='submit'
              disabled={!trackName || !trackDuration}
              onClick={() => {
                addTrack()

                props.setIsOpen(false)

                alert('Faixa adicionada com sucesso!')
              }}
              className='w-[50%] h-10 rounded-md border border-black mt-3 mr-2 hover:text-xl hover:text-white hover:bg-blue-400 disabled:hover:bg-transparent disabled:hover:text-black disabled:hover:text-base disabled:opacity-50 transition-all'
            >
              Adicionar
            </button>
            <button 
              type='button'
              onClick={() => props.setIsOpen(false)}
              className='w-[50%] h-10 rounded-md border border-black mt-3 ml-2 hover:text-xl hover:text-white hover:bg-blue-400 transition-all'
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}