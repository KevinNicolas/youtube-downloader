export interface PlaylistDetail {
  title:        string;
  description:  string;
  total_items:  string;
  last_updated: string;
  views:        string;
  items:        Item[];
}

export interface Item {
  id:         string;
  title:      string;
  author:     string;
  duration:   Duration;
  thumbnails: Thumbnail[];
}

export interface Duration {
  seconds:             number;
  simple_text:         string;
  accessibility_label: string;
}

export interface Thumbnail {
  url:    string;
  width:  number;
  height: number;
}
