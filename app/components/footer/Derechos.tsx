export default function Derechos({ derechos }: { derechos: string }) {
  return (
    <div className="flex justify-center items-center gap-1 text-center flex-wrap">
      {derechos}
    </div>
  );
}
