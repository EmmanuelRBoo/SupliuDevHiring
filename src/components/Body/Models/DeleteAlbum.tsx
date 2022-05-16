interface Props {
  id: number
  isOpen: boolean
  setIsOpen: (type: boolean) => void  
  handleDelete: (id: number, item: string) => void
}

export function DeleteAlbum(props: Props) {
  if (!props.isOpen) return null

  function bg(event: any) {
    event.stopPropagation()
    event.preventDefault()
  }
  
  return (
    <div 
      className='absolute flex z-50 items-center justify-center w-full h-full top-0 left-0 bg-zinc-400 bg-opacity-50'
      onClick={() => props.setIsOpen(false)}
    >
      <div onClick={bg} className='flex flex-col justify-around h-[160px] w-[300px] z-0 bg-slate-200 border-2 border-slate-600 rounded-2xl ring-2 ring-slate-200 p-3'>
        <h1 className='font-semibold text-xl mb-1'>Excluir Álbum?</h1>
        
        <p>Deseja excluir este álbum? Ele será removido permanentemente.</p>

        <div className='flex'>
        <button 
              type='submit'
              onClick={() => {
                props.handleDelete(props.id, 'album')

                props.setIsOpen(false)

                alert('Álbum Excluido com sucesso!')
              }}
              className='w-[50%] h-10 rounded-md border border-black mt-3 mr-2 hover:text-xl hover:text-white hover:bg-blue-400 disabled:hover:bg-transparent disabled:hover:text-black disabled:hover:text-base disabled:opacity-50 transition-all'
            >
              Excluir
            </button>
            <button 
              type='button'
              onClick={() => props.setIsOpen(false)}
              className='w-[50%] h-10 rounded-md border border-black mt-3 ml-2 hover:text-xl hover:text-white hover:bg-blue-400 transition-all'
            >
              Cancelar
            </button>
        </div>
      </div>
    </div>
  )
}
