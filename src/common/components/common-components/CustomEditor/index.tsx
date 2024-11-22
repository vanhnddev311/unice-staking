// import ReactQuill from "react-quill";
import { modifyAllImgSrc, modifyImgSrc } from '@/utils';
import dynamic from 'next/dynamic';
import React, { useCallback, useMemo, useRef, useState } from 'react';

export const MyComponent: React.FunctionComponent<{
  campaign: any;
  desc: string;
  handleProcedureContentChange: (val: string) => void;
}> = ({ campaign, desc, handleProcedureContentChange }) => {
  const myColors = ['purple', '#785412', '#452632', '#856325', '#963254', '#254563', 'white'];
  // const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  const reactQuillRef = useRef<any>(null);
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
  ];
  const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ color: myColors }],
      [{ background: myColors }],
    ],
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
          const { newString, srcUrl } = await modifyImgSrc(desc, file);
          // const url = await uploadToCloudinary(file);
          const quill = reactQuillRef.current;
          if (quill) {
            const range = quill?.getEditorSelection();
            range && quill.getEditor().insertEmbed(range.index, 'image', srcUrl);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  }, [reactQuillRef]);

  return (
    <>
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        placeholder="Tell about your project..."
        value={desc}
        onChange={handleProcedureContentChange}
        modules={{
          toolbar: {
            container: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
              ['image'],
              // ['code-block'],
              // ['clean'],
            ],
            handlers: {
              image: imageHandler,
            },
          },
          clipboard: {
            matchVisual: false,
          },
        }}
      />
    </>
  );
};
