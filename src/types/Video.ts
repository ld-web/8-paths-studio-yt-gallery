export default class Video {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  thumbnailUrl(): string {
    return `https://img.youtube.com/vi/${this.id}/hqdefault.jpg`;
  }
}
