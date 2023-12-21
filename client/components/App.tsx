import { useQuery } from '@tanstack/react-query'
import { getAllArtHeadings } from '../apis/apiClient'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import OneImage from './oneImage'
import { deleteArt } from '../apis/apiClient'

export default function App() {
  const [editing, isEditing] = useState(false)
  const {
    data: art,
    isLoading,
    isError,
    error,
  } = useQuery(['art'], getAllArtHeadings, {})  
  
  const queryClient = useQueryClient()
  const deleteArtMutation = useMutation({ 
    mutationFn: deleteArt, 
    onSuccess: async()=>{
      console.log("invalidate queries loop for art")
      queryClient.invalidateQueries({queryKey:['art']})
    }
  })




  if (isError) {
    console.error('error grabbing the art list', error)
    return <p>hmm, not sure what happened</p>
  }
  if (!art || isLoading) {
    return <p>drafting artworks...</p>
  }



  function handleClick() {
    isEditing(!editing)
  }

  function handleDeleteClick(id) {
    deleteArtMutation.mutate(id)
  }

  return (
    <>
      <h2>Artwork List</h2>
      <div className="collection hflex">
        {art?.map((item) => {
          return (
            <>
              <div className = 'vflex artTile'>
                <Link to={`/${item.id}`} key={item.id}>
                  <div className="vflex upperArtTile">
                    <h3>{item.name}</h3>
                    <img src={item.imageUrl} alt={item.alt} />
                  </div>
                </Link>
                <div className="hflex center deleteDiv">
                  <button onClick={()=>{handleDeleteClick(item.id)}} className="delete">
                    X
                  </button>
                </div>
              </div>
            </>
          )
        })}
      </div>
      <button onClick={handleClick} className={!editing ? 'visible' : 'hidden'}>
        Add New Image
      </button>
      <div className={editing ? 'visible' : 'hidden'}>
        <OneImage />
      </div>
    </>
  )
}
