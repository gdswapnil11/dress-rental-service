export interface Collection {
  id: string;
  title: string;
  description: string;
  highlight: string;
  image: string;
  active: boolean;
  occasionTags: string[];
  cityAvailability: string[];
  featuredDressIds: string[];
}
