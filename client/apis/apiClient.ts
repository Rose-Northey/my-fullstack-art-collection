import request from 'superagent'
import * as Art from '../../models/art'
import { response } from 'express'

export async function getAllArtHeadings(){
  console.log('getAllArtHeadings has run')
  const artHeadings = await request.get('/api/v1/artworks')
  return artHeadings.body
}

export async function getArtById(id:number){
  console.log('getArtById has run')
  const artDetails = await request.get(`/api/v1/artworks/${id}`)
  return artDetails.body
}


export async function uploadArt(formData){
  console.log('uploadArt has run')
  const response = await request
  .post('/api/v1/artworks/upload')
  .send(formData)
}

export async function editDetailsPatch(newDetailsAndId:Art.NewDetailsAndId){
  console.log('editDetailsPatch has run')
  const newDetails = newDetailsAndId.newDetails
  const id = newDetailsAndId.id
  const response = await request
  .patch(`/api/v1/artworks/${id}/edit`)
  .send(newDetails)
  console.log("this is a thing")
  return response
}

export async function deleteArt(id){
  const response = await request
  .delete(`/api/v1/artworks/${id}/delete`)
}