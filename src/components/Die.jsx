export default function Die(props) {
  // const styles = {
  //     backgroundColor: props.isHeld ? "#59E391" : "white"
  // }

  return (
    <div onClick={props.hold} className={`die ${props.isHeld && "die--green"}`}>
      <p>{props.value}</p>
    </div>
  );
}
