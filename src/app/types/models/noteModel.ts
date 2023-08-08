import { OutputData } from '@editorjs/editorjs';

export interface INote {
  id: string;
  title: string;
  body: OutputData;
  images: string[];
}
