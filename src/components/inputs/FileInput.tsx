import uploadSVG from '../../assets/upload.svg';

import './FileInput.scss';

type FileInputProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  fileName: string | undefined;
  handleClear: () => void;
}

export const FileInput = ({handleChange, fileName}: FileInputProps) => {
  
  return <div className="input-wrapper">
    <label>
      <div className="input-container">
        <img alt="search" src={uploadSVG}/>
        <input type="file" onChange={handleChange}/>
      </div>
      <div className="input-text">
        {fileName ? fileName : "Import a file"}
      </div>
    </label>
  </div>
}