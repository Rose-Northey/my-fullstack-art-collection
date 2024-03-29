import React, { useState} from 'react'
import { editDetailsPatch, getArtById } from '../apis/apiClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'


export default function Edit({setEditing}) {
  const id = Number(useParams().id)
  const {
    data: artDetail,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['art', id], queryFn: () => getArtById(Number(id)) })

  const [newName, setNewName] = useState<string>(artDetail?.name || '')
  const [newDescription, setNewDescription] = useState<string>(artDetail?.description ||'')
  const [newMedium, setNewMedium] = useState<string>(artDetail?.medium ||'')
  const [newOwner, setNewOwner] = useState<string>(artDetail?.owner||'')
  const [newAlt, setNewAlt] = useState<string>(artDetail?.alt||'')

  const queryClient = useQueryClient()
  let newDetails = { name: '', description: '', medium: '', owner: '', alt:'' }

  const editDetailsMutation = useMutation({
    mutationFn: editDetailsPatch,
    onSuccess: async()=>{
      queryClient.invalidateQueries({queryKey:['art', id]})
    }
  })

  const editDetails = async (event: React.FormEvent<Element>) => {
    event.preventDefault()
    newDetails = {
      name: newName,
      description: newDescription,
      medium: newMedium,
      owner: newOwner,
      alt: newAlt,
    }
    const newDetailsAndId = {
      newDetails,
      id,
    }
    try {
      editDetailsMutation.mutate(newDetailsAndId)
      setEditing(false)
    } catch (error) {
      console.error('An error occurred during uploading:', error)
    }
  }

  const handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
  }
  const handleNewDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDescription(event.target.value)
  }
  const handleNewMediumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMedium(event.target.value)
  }

  const handleNewOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOwner(event.target.value)
  }

  const handleNewAltChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAlt(event.target.value)
  }

  if (isError) {
    return <p>hmm, not sure what happened</p>
  }
  if (!artDetail || isLoading) {
    return <p>drafting artworks...</p>
  }

  return (
    <>
      <div className="addNew vflex">
        <h2>Edit artwork details</h2>
        <form className="vflex">
          <label className="hflex">
            Edit artwork name:
            <input
              type="text"
              name="newName"
              value={newName}
              onChange={handleNewNameChange}
            />
          </label>
          <br />

          <label className="hflex">
            Edit description:
            <textarea
              name="newDescription"
              value={newDescription}
              onChange={handleNewDescriptionChange}
            />
          </label>
          <br />

          <label className="hflex">
            Edit medium:
            <input
              type="text"
              name="newMedium"
              value={newMedium}
              onChange={handleNewMediumChange}
            />
          </label>
          <br />

          <label className="hflex">
            Edit owner:
            <input
              type="text"
              name="newOwner"
              value={newOwner}
              onChange={handleNewOwnerChange}
            ></input>
          </label>
          <br />
          <label className="hflex">
            Edit Alt Text:
            <input
              type="text"
              name="newAlt"
              value={newAlt}
              onChange={handleNewAltChange}
            ></input>
          </label>
          <br />
          <button type="submit" onClick={editDetails}>
            Save and Submit
          </button>
        </form>
      </div>
    </>
  )
}
