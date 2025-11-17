import Link from "next/link";

export default function Logo({ title }: { title: string }) {
  return (
    <h1 className="italic font-bold text-2xl hover:text-(--color2) text-(--bg)">
      <Link href={"/"}>{title}</Link>
    </h1>
  );
}
