export default class Video {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  thumbnailUrl(): string {
    return `https://img.youtube.com/vi/${this.id}/hqdefault.jpg`;
  }

  embedUrl(options: VideoOptions = { autoplay: true }): string {
    return `https://www.youtube.com/embed/${this.id}${
      options.autoplay ? '?autoplay=1' : ''
    }`;
  }
}

interface VideoOptions {
  autoplay?: boolean;
}
