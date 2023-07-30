import { Component } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
// import SimpleImage from '@editorjs/simple-image'
// import Underline from '@editorjs/underline';
// import Paragraph from '@editorjs/paragraph';
import createGenericInlineTool from 'editorjs-inline-tool'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent {
  editor = new EditorJS({
    holder: 'editorjs',
    tools: {
      header: Header,
      list: List,
      image: {
        class: ImageTool,
        // config: {
        //   endpoints: {
        //     byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
        //     byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        //   }
        // }
      },
      // list: List,
      // image: ImageTool,
      // image: SimpleImage,
      // underline: Underline,
      // paragraph: Paragraph,
      bold: {
        class: createGenericInlineTool({
          shortcut: 'CMD+B',
          tagName: 'STRONG',
          toolboxIcon:
            '<img src="../assets/icons/bold-text.png" style="width: 16px"></img>',
        }),
      },
      italic: {
        class: createGenericInlineTool({
          shortcut: 'CMD+K',
          tagName: 'I',
          toolboxIcon:
            '<img src="../assets/icons/italic-text.png" style="width: 16px"></img>',
        }),
      },
      underline: {
        class: createGenericInlineTool({
          shortcut: 'CMD+U',
          tagName: 'U',
          toolboxIcon:
            '<img src="../assets/icons/underline-text.png" style="width: 16px"></img>',
        }),
      }
    },
  });

  isFocused: boolean = false;
}
