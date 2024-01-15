import Link from "next/link";
import Image from "next/image";

type BorderCountry = {
    name: string;
    ptName: string;
    flag: string;
    flagAlt: string;
    cca3: string;
}

export default function CountryCard({ name, ptName, flag, flagAlt }: BorderCountry) {
    return (
        <Link href={`/pais/${name}`}>
            <article key={name} className="h-64 w-min-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 cursor-pointer transition-all hover:shadow-xl">
                <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
                    <Image src={flag} alt={flagAlt} fill className="object-cover" />
                </div>
                <h1 className="font-bold text-xl text-center mt-2">{ptName}</h1>
            </article>
        </Link>
    )
}