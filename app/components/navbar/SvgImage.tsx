import Image from "next/image";

export default function SvgImage({ src, fnc, size }: { src: string, fnc?: () => void, size: number }) {
  return (
    <Image src={src} alt="imagen svg" width={size} height={size} onClick={fnc} className='hover:scale-110 cursor-pointer rounded-2xl' />
  )
};