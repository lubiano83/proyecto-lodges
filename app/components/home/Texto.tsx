export default function Texto({ texto }: {texto: string}) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 text-left w-full max-w-6xl text-lg">
      <h3>
        {texto}
      </h3>
    </div>
  );
}
