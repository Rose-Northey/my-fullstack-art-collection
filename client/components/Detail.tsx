import {useQuery} from '@tanstack/react-query'
import { getArtById} from "../apis/apiClient"
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useState} from 'react'
import Edit from './Edit'
import { useMutation, useQueryClient } from '@tanstack/react-query'



export default function Detail() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false)


  // Always call useQuery, and conditionally render based on the result
   const { data: artDetail, isLoading, isError } = useQuery({
    queryKey: ['art', id],
    queryFn: () => getArtById(id),
  });

  if (isError) {
    return <p>hmm, not sure what happened</p>;
  }

  if (!artDetail || isLoading) {
    return <p>drafting artworks...</p>;
  }

  function navigateHome(event) {
    event.preventDefault();
    navigate('/');
  }

  function handleEditClick(event: React.MouseEvent<HTMLElement>) {
    setEditing(!editing)
  }

  return(
    <>
    <div className="fill">
      <div className="vflex detail">
      <div className={editing? 'visible vflex center': 'hidden vflex center'}>
        <Edit setEditing={setEditing}/>

        </div>
        <div className = {editing?'hidden vflex center':'visible vflex center detailText'} >
          <h2>{artDetail.name}</h2>
          <p>{artDetail.description}</p>  
          <div className='hflex infoLine'>
            <p><strong>Medium:</strong> {artDetail.medium}</p>
            <p><strong>Owner:</strong> {artDetail.owner}</p>
          </div>
        </div>
        <br/>
        <button className={editing? 'hidden':''} onClick={handleEditClick}>Edit details</button>
        <img src={`${artDetail.imageUrl}`} alt={artDetail.alt}/>
        
      </div>
      
    </div>
    <button onClick={navigateHome}>
      Back to Home
    </button>
    </>
  )
}