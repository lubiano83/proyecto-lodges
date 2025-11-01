import Image from "next/image";

type Props = {
  src: string;
  fnc?: () => void;
  size: number
};

export default function SvgImage({ src, fnc, size }: Props) {
  return (
    <Image src={src} alt="imagen svg" width={size} height={size} onClick={fnc} className='hover:scale-110 cursor-pointer rounded-2xl' />
  )
};