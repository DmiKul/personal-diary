import { SafeHtml } from "@angular/platform-browser";
import { OutputData } from "@editorjs/editorjs";

export interface INote {
  id: string,
  title: string,
  // body: any[]
  body: OutputData
}
