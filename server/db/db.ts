import connection from './connection';
import { Art, ArtHeading, NewArt, PatchArtInfo } from '../../models/art';

export async function getArtOverview(): Promise<ArtHeading[]> {
  try {
    const result = await connection('artworks').select('id', 'name', 'imageUrl', 'alt');
    return result;
  } catch (error) {
    console.error('Error in getArtOverview:', error);
    throw error; 
  }
}

export async function getArtById(id: number): Promise<Art> {
  try {
    const result = await connection('artworks')
      .where('id', id)
      .select('*')
      .first();
    return result;
  } catch (error) {
    console.error('Error in getArtById:', error);
    throw error;
  }
}

export async function addArt(newArt: NewArt): Promise<Art> {
  try {
    const [insertedId] = await connection('artworks').insert({
      name: newArt.name,
      description: newArt.description,
      medium: newArt.medium,
      imageUrl: newArt.imageUrl,
      owner: newArt.owner,
      alt: newArt.alt,
    });

    const insertedArt = await getArtById(insertedId);
    return insertedArt;
  } catch (error) {
    console.error('Error in addArt:', error);
    throw error;
  }
}

export async function editArtDescription(newArtInfo:PatchArtInfo, id:number){
  const result = await connection('artworks')
  .where({id}).update({
    name: newArtInfo.name,
    description: newArtInfo.description,
    medium: newArtInfo.medium,
    owner: newArtInfo.owner,
    alt: newArtInfo.alt,
  })
  return result
}

export async function deleteArtById(id:number){
  const result = await connection('artworks')
  .where({id}).delete()
  return result
}