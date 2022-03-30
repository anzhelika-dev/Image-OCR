import { useState } from 'react';
import { storage } from './../../firebase'
import Image from './../Image/Image'
import Tesseract from 'tesseract.js';


export default function FileUpload() {

  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState(null);
  const [path, setPath] = useState(null)
  const [text, setText] = useState(null)
  const [progressTes, setprogressTes] = useState(null)

  const onChange = e => {
    setFile(e.target.files[0]);

  };

  function handleSubmit (event) {
    event.preventDefault()
    uploadFiles(file)
  }

  function uploadFiles(file){
    setPath(null)
    setText(null)
    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        storage
          .ref("files").child(file.name).getDownloadURL()
          .then((url) => setPath(url))
          .then(() => recognize())
          .then(() => setFile(null))
      }
    );
  };

 function recognize() {
    return Tesseract.recognize(file, 'rus', {
        logger: data => setprogressTes(data.progress),
      })
     .then(({ data: {text }}) => setText(text))
  }

  function sound(text) {
    window.speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
              <input onChange={onChange} type='file' accept=".png, .jpg, .jpeg" id='file' />
              <label for='file'>{file ? 'Well done! Click recognize button' : 'Click here to browse image...'}</label>
            <button className='btn'>Recognize</button>
          </form>
        <Image path={path} />
        {progressTes && <div>{Math.round(progressTes) * 100}%</div>}
        {text && <div className='recognize-text'>
          {text}
          <button className='listen' onClick={() => sound(text)}>Прослушать</button>
          </div>}
    </div>
  );
}
