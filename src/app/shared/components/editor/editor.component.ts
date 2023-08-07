import { Component, Input, SimpleChanges } from '@angular/core';
import EditorJS, { BlockToolData, OutputBlockData, OutputData} from '@editorjs/editorjs';
import Header from '@editorjs/header';
// import List from '@editorjs/list';
import ImageTool, { ImageToolData} from '@editorjs/image';
import { FileService } from '@shared/services/file.service';
// import SimpleImage from '@editorjs/simple-image'
// import Underline from '@editorjs/underline';
// import Paragraph from '@editorjs/paragraph';
import createGenericInlineTool, { UnderlineInlineTool } from 'editorjs-inline-tool'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent {
  editor!: EditorJS
  @Input() blocks!: OutputBlockData[]
  isFocused: boolean = false;

  constructor(private fileService: FileService) {
    console.log(this.blocks)
    // console.log(this.editor.data.blocks)
  }

  ngOnInit(): void {
    console.log(this.blocks)


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blocks'] && changes['blocks'].currentValue) {
      if (this.editor) {
        this.editor.destroy()
      }
      this.editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          underline: UnderlineInlineTool,
          // image: {
          //   class: ImageTool,
          //   config: {
              // endpoints: {
              //   byFile: 'https://console.firebase.google.com/project/personal-diary-cbdfa/firestore/data/Upload', // Your backend file uploader endpoint
              //   byUrl: 'https://console.firebase.google.com/project/personal-diary-cbdfa/firestore/data/Upload', // Your endpoint that provides uploading by Url
              // },
              // onUpload: async (image: ImageToolData) => {
              //   console.log('upload')
              //   const imageUrl = image.data.url
              //   this.fileService.saveMetaDataOfFile(image)
              // }
              // uploader: {
              //   uploadByFile(file) {
              //     const formData = new FormData()
              //     formData.append('file', file)
              //     const reposnse = await axios.post(

              //     )
              //   }
              // }
            // }
          // }
        },
        data: {
          blocks: this.blocks
        }
        // placeholder: 'Создайте заметку'
      });
    }
  }

  async save(): Promise<any> {
    try {
      const outputData = await this.editor.save();
      return outputData;
    } catch (error) {
      throw error;
    }
  }

}
