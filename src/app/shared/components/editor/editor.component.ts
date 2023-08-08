import { Component, Input, SimpleChanges } from '@angular/core';
import EditorJS, { OutputBlockData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool, { ImageToolData } from '@editorjs/image';
import createGenericInlineTool, {
  UnderlineInlineTool,
} from 'editorjs-inline-tool';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
})
export class EditorComponent {
  editor!: EditorJS;
  @Input() blocks!: OutputBlockData[];
  isFocused: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['blocks'] && changes['blocks'].currentValue) {
      if (this.editor) {
        this.editor.destroy();
      }
      this.editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          underline: UnderlineInlineTool,
        },
        data: {
          blocks: this.blocks,
        },
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
