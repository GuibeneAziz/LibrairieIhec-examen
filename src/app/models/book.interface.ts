export interface Book {
  key: string;
  title: string;
  edition_count?: number;
  cover_id?: number;
  cover_i?: number;
  covers?: number[];
  first_publish_year?: number;
  first_publish_date?: string;
  subtitle?: string;
  description?: string | { value: string };
  authors?: Array<{ name: string } | string>;
  subjects?: string[];
  number_of_pages?: number;
}