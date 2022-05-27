export interface VideoDetails {
  id:          string;
  title:       string;
  description: string;
  thumbnail:   Thumbnail;
  metadata:    Metadata;
}

export interface Metadata {
  embed:                           Embed;
  length_seconds:                  string;
  channel_url:                     string;
  external_channel_id:             string;
  is_family_safe:                  boolean;
  available_countries:             string[];
  is_unlisted:                     boolean;
  has_ypc_metadata:                boolean;
  view_count:                      number;
  category:                        string;
  publish_date:                    Date;
  channel_name:                    string;
  upload_date:                     Date;
  keywords:                        string[];
  channel_id:                      string;
  allow_ratings:                   boolean;
  is_private:                      boolean;
  is_live_content:                 boolean;
  is_liked:                        boolean;
  is_disliked:                     boolean;
  is_subscribed:                   boolean;
  subscriber_count:                string;
  current_notification_preference: string;
  publish_date_text:               string;
  likes:                           Likes;
  owner_badges:                    any[];
  available_qualities:             string[];
}

export interface Embed {
  iframeUrl:      string;
  flashUrl:       string;
  width:          number;
  height:         number;
  flashSecureUrl: string;
}

export interface Likes {
  count:            number;
  short_count_text: string;
}

export interface Thumbnail {
  url:    string;
  width:  number;
  height: number;
}
