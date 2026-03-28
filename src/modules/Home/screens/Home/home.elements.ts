/**
 * Home form elements — extracted from HomeScreen.
 * Templates (textareaTemplate, imageUploaderTemplate) are passed in as options
 * because they contain JSX and local state references.
 */
import type {IFormElement} from '@lmb-it/kitsconcerto';

export interface IHomeElementOptions {
  textareaTemplate: (props: any) => any;
  imageUploaderTemplate: (props: any) => any;
}

export function getHomeFormElements(
  options: IHomeElementOptions,
): IFormElement[] {
  const {textareaTemplate, imageUploaderTemplate} = options;
  return [
    {
      id: 'description',
      name: 'description',
      type: 'Container',
      children: textareaTemplate,
      colSpan: 12,
    } as any,
    {
      id: 'attachments',
      name: 'attachments',
      type: 'Image',
      initialUri: [],
      template: imageUploaderTemplate,
      colSpan: 12,
    } as any,
  ];
}
