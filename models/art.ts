export interface Art{
  id:number
  name: string
  description: string
  medium: string
  imageUrl: string
  owner: string
  alt: string
}

export interface ArtHeading{
  id:number
  name: string
  imageUrl: string
  alt: string
}

export interface NewArt{
  name: string
  description: string
  medium: string
  imageUrl: string
  owner: string
  alt:string
}
export interface NewDetailsAndId{
    newDetails: {
        name: string;
        description: string;
        medium: string;
        owner: string;
        alt: string;
    };
    id: string | undefined;
}

export interface PatchArtInfo{
  name: string
  description: string
  medium: string
  imageUrl: string
  owner: string
  alt:string
}