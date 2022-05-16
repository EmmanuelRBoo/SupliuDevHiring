import { MouseEventHandler, useState } from 'react'
import { api } from '../../../lib/api'

interface Props {
  isOpen: boolean
  setIsOpen: (type: boolean) => void
  loading: (type: boolean) => void
}

export function AddAlbum(props: Props) {
  const [name, setName] = useState('')
  const [year, setYear] = useState<number | undefined>(undefined)

  function bg(event: any) {
    event.stopPropagation()
    event.preventDefault()
  }

  function addAlbum() {
    const config = { 
      headers: { 
        'Authorization': 'EmmanuelHonoratoBoo@gmail.com',
        'Content-type': 'application/json'
      } 
    }

    api.post('/album', {
      name,
      year,
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
          <span className='font-semibold text-xl'>Adicionar álbum</span>
            <label htmlFor="name">
              Nome do álbum:
              <input 
                type="text" 
                name='name'
                placeholder='Digite o nome do álbum...'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='rounded-md w-full'
              />
            </label>
            <label htmlFor="year">
              Ano do álbum:
              <input
                type="number"
                name="year"
                placeholder='Digite o ano do álbum...'
                value={Number(year)}
                onChange={(e) => setYear(e.target.valueAsNumber)}
                className='rounded-md w-full'
              />
            </label>
          <div className='flex'>
            <button 
              type='submit'
              disabled={!name || !year || year < 1000 || year > 2022}
              onClick={() => {
                addAlbum()

                props.setIsOpen(false)

                alert('Álbum adicionado com sucesso!')
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