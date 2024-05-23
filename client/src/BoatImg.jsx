import Image from "./Image.jsx";

export default function BoatImg({boat,index=0,className=null}) {
  if (!boat.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <Image className={className} src={boat.photos[index]} alt=""/>
  );
}