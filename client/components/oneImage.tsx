import { useState, useRef} from "react"
import { uploadArt } from "../apis/apiClient"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { renderMatches } from 'react-router-dom'
import { useParams } from "react-router-dom"

export default function OneImage({isEditing}) {
  const [file, setFile] = useState<string|Blob|undefined>(undefined)
  const [name, setName]= useState<string>("")
  const [description, setDescription]= useState<string>("")
  const [medium, setMedium]= useState<string>("")
  const [owner, setOwner]= useState<string>("")
  const [alt, setAlt]= useState<string>("")
  const id:number = Number(useParams<{id:string}>().id)

  const queryClient = useQueryClient()
  const formData = new FormData()
  const fileReference = useRef(null)

  const uploadArtMutation = useMutation({ 
    mutationFn: uploadArt, 
    onSuccess: async()=>{
      setName("")
      setDescription("")
      setMedium("")
      setOwner("")
      setAlt("")
      fileReference.current.value = ""
      isEditing(false)
      queryClient.invalidateQueries({queryKey:['art']})
      
    }
  })

  // ()=>{uploadArt(formData)}

  const uploadFile = async (event: React.FormEvent<Element>) => {
    event.preventDefault()
    formData.append('file', file!)
    formData.append("name", name);
    formData.append("description", description);
    formData.append("medium", medium);
    formData.append("owner", owner);
    formData.append("alt", alt);
    try{
      uploadArtMutation.mutate(formData)
    }catch(error){
      console.error('An error occurred during uploading:', error)
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }
  const handleMediumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMedium(event.target.value)
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0])
  }
  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(event.target.value)
  }
  const handleAltChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlt(event.target.value)
  }

  return (<>
  <div className='addNew vflex'>
    <h2>Add a new Artwork</h2>
    <form className= 'vflex'>
    <label className='hflex'>
        Artwork Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <br />

      <label className='hflex'>
        Description:
        <textarea
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>
      <br />

      <label className='hflex'>
        Medium:
        <input
          type="text"
          name="medium"
          value={medium}
          onChange={handleMediumChange}
          
        />
        
      </label>
      <br />

      <label className='hflex'>
        Image Upload:
        <input
          type="file"
          name='file'
          ref={fileReference}
          onChange={handleFileChange}
          required
        />
      </label>
      <br />
      
      <label className='hflex'>
        Owner:
        <input
          type="text"
          name="owner"
          value={owner}
          onChange={handleOwnerChange}
        ></input>
      </label>
    <br/>
    <label className='hflex'>
        Alt Text (required)
        <input
          type="text"
          name="owner"
          value={alt}
          onChange={handleAltChange}
          required
        ></input>
      </label>
    <br/>
      <button type="submit" onClick={uploadFile} disabled={!file||!alt}>Upload</button>
    </form>
    </div>
    </>
  )
}