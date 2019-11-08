export class Photo {
  id: number;
  type: string;
  user_id: number;
  pic50x50: string;
  pic128x128: string;
  pic640x480: string;
  text: string;
  comments_count: number;
  mark_count: number;
}

export class Photos {
  totalCount: number;
  anchor: string;
  photos: Photo[];
}
