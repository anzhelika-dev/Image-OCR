export default function Image({path}) {

  return (
    <div>
      {path && <img src={path}></img>}
    </div>
  );
}
