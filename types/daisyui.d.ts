declare module 'daisyui';
declare module 'react-quill' {
    import * as React from 'react';
  
    export interface ReactQuillProps {
      value: string;
      onChange: (value: string) => void;
      theme?: string;
      readOnly?: boolean;
    }
  
    const ReactQuill: React.FC<ReactQuillProps>;
    export default ReactQuill;
  }