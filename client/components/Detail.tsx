import {useQuery} from '@tanstack/react-query'
import { getAllArtHeadings } from "../apis/apiClient"
import {Link} from 'react-router-dom'

export default function Detail (){
  
  const {data: art, isLoading, isError} = useQuery({queryKey:['art'], queryFn:getAllArtHeadings})
  if (isError){
    return <p>hmm, not sure what happened</p>
  }
  if(!art || isLoading){
    return <p>drafting artworks...</p>
  }
  
  return(
    <>
    <h2>Artwork List</h2>
    <div className="collection hflex">
      {art.map((item)=>{
      return(
        <>
        <Link to={`/${item.id}`}>
          <div className='vflex artTile'>
          <h3>{item.name}</h3>
          <img src={item.imageUrl}/>
          </div>
        </Link>

        </>
      )
      })}
    </div>
    </>
  )
}