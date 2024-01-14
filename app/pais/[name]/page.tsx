import { Metadata } from "next";
import { Country } from "../../page";
import Link from "next/link";
import Image from "next/image";

async function getCountryByName(name: string): Promise<Country> {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    return (await response.json())[0];
}

export default async function CountryPage({ params: { name } }: { params: { name: string } }) {
    const country = await getCountryByName(name);

    return (
        <section className="flex flex-col container">
            <h1 className="text-5xl text-center font-bold text-gray-800 my-16">{country.translations.por.common}</h1>
            <Link href="/" className="flex items-center py-2"><Image src="/arrow-back.svg" alt="Icone de seta para voltar" width={24} height={24} /> Voltar</Link>
            <article className="flex justify-between min-w-full p-10 bg-white rounded-xl">
                <section>
                    <h2 className="text-xl text-gray-800 m-3"><b>Capital : </b> {country.capital}</h2>
                    <h2 className="text-xl text-gray-800 m-3"><b>Continente : </b> {country.region} - {country.subregion}</h2>
                    <h2 className="text-xl text-gray-800 m-3"><b>População : </b>  {country.population}</h2>
                    <h2 className="text-xl text-gray-800 m-3"><b>Línguas Faladas : </b>
                        <br />
                        {Object.values(country.languages).map((language) => (
                            <span key={language} className="inline-block px-2 py-1 bg-indigo-700 text-indigo-200 rounded-md mr-2 mt-2 text-sm transition-all hover:shadow-md cursor-default">{language}</span>
                        ))}
                    </h2>
                </section>
            </article>
        </section>
    );
}

export const generateMetadata = ({ params: { name } }: { params: { name: string } }): Metadata => {
    return {
        title: `${decodeURIComponent(name)}`,
        description: `Informations about the ${name}`
    }
}