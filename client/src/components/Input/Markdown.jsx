import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function MarkdownEditor({ label, value, changevalue, name, invalidFields, setInvalidFields }) {
  const handleOnChange = (event) => {
    changevalue(prev => ({
      ...prev,
      [name]: event.target.getContent()
    }));
  }

  const handleOnFocus = () => {
    setInvalidFields && setInvalidFields([]);
  }

  return (
    <div className='flex flex-col gap-2'>
      <span className='mt-4'>{label}</span>
      <Editor
        apiKey={process.env.REACT_APP_MCETINY}
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
      />
      {invalidFields?.some(element => element.name === name) && (
        <small className='text-main text-xs'>{invalidFields?.find(element => element.name === name)?.message}</small>
      )}
    </div>
  );
}