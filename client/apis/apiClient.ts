import request from 'superagent'
import * as Art from '../../models/art'
import { response } from 'express'

export async function getAllArtHeadings(){
  const artHeadings = await request.get('/api/v1/artworks')
  console.log(artHeadings.body)
  return artHeadings.body
}

export async function getArtById(id:number){
  const artDetails = await request.get(`/api/v1/artworks/${id}`)
  return artDetails.body
}

export async function postNewArt(){
  await request.get('/api/v1/artworks')
}

export async function uploadArt(formData){
  console.log('client side api')
  console.log(formData)
  const response = await request
  .post('/api/v1/artworks/upload')
  .send(formData)
}

export async function editDetailsPatch(newDetailsAndId:Art.NewDetailsAndId){
  const newDetails = newDetailsAndId.newDetails
  const id = newDetailsAndId.id
  const response = await request
  .patch(`/api/v1/artworks/${id}/edit`)
  .send(newDetails)
}