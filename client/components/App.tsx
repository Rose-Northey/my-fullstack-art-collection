import { useQuery, QueryKey} from '@tanstack/react-query'
import { getAllArtHeadings } from '../apis/apiClient'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import OneImage from './oneImage'
import { deleteArt } from '../apis/apiClient'
import {ArtHeading} from '../../models/art'

export default function App() {
  const [editing, isEditing] = useState(false)
  const {
    data: art,
    isLoading,
    isError,
    error,
  } = useQuery<ArtHeading[]>(['art'], getAllArtHeadings, {})  
  
  const queryClient = useQueryClient()
  const deleteArtMutation = useMutation({ 
    mutationFn: deleteArt, 
    onSuccess: async()=>{
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

  function handleDeleteClick(id:number) {
    deleteArtMutation.mutate(id)
  }

  
  return (
    <>
      <h2>Artwork List</h2>
      <div className="collection hflex">
        {art?.map((artItem:ArtHeading) => {
          return (
            <div key={artItem.id} className = 'vflex artTile'>
              <Link to={`/${artItem.id}`} key={artItem.id}>
                <div className="vflex upperArtTile">
                  <h3>{artItem.name}</h3>
                  <img src={artItem.imageUrl} alt={artItem.alt} />
                </div>
              </Link>
              <div className="hflex center deleteDiv">
                <button onClick={()=>{handleDeleteClick(artItem.id)}} className="delete">
                  X
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <button onClick={handleClick} className={!editing ? 'visible' : 'hidden'}>
        Add New Image
      </button>
      <div className={editing? 'visible' : 'hidden'}>
        <OneImage isEditing= {isEditing}/>
      </div>
    </>
  )
}
