import { Metadata } from "next";
import { Country } from "../../page";
import Link from "next/link";
import Image from "next/image";
import CountryCard from "@/components/countrycard";

type BorderCountry = {
    name: string;
    ptName: string;
    flag: string;
    flagAlt: string;
    cca3: string;
}

async function getCountryByName(name: string): Promise<Country> {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const countries = await response.json();
    return countries.find((country: Country) => country.name.common === name)!;
}

async function getCountryBorder(name: string) {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const countries = await response.json();

    const country: Country = countries.find((country: Country) => country.name.common === name)!;
    if (country.borders) {
        return country.borders?.map((border: string) => {
            const borderCountry: Country = countries.find((country: any) => country.cca3 === border)
            return {
                name: borderCountry.name.common,
                ptName: borderCountry.translations.por.common,
                flag: borderCountry.flags.svg,
                flagAlt: borderCountry.flags.alt,
                cca3: borderCountry.cca3
            }
        })
    }
}

export default async function CountryPage({ params: { name } }: { params: { name: string } }) {
    const country = await getCountryByName(decodeURI(name));
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    const borderCountries = await getCountryBorder(decodeURI(name));

    return (
        <section className="flex flex-col container">
            <h1 className="text-5xl text-center font-bold text-gray-800 my-16">{country.translations.por.common}</h1>
            <Link href="/" className="flex items-center py-2"><Image src="/arrow-back.svg" alt="Icone de seta para voltar" width={24} height={24} /> Voltar</Link>
            <article className="flex flex-col md:flex-row justify-center md:justify-between min-w-full p-10 bg-gray-100 rounded-xl">
                <section>
                    {country.capital && (<h2 className="text-xl text-gray-800 m-3"><b>Capital : </b> {country.capital}</h2>)}
                    <h2 className="text-xl text-gray-800 m-3"><b>Continente : </b> {country.region}{country.subregion && `- ${country.subregion}`}</h2>
                    <h2 className="text-xl text-gray-800 m-3"><b>População : </b>  {formatter.format(country.population)}</h2>
                    {country.languages && (
                        <h2 className="text-xl text-gray-800 m-3"><b>Línguas Faladas : </b>
                            <br />
                            {Object.values(country.languages).map((language, index) => (
                                <span key={index} className="inline-block px-2 py-1 bg-indigo-700 text-indigo-200 rounded-md mr-2 mt-2 text-sm transition-all hover:shadow-md cursor-default">{language}</span>
                            ))}
                        </h2>
                    )}
                </section>
                <div className="relative h-48 my-2 md:h-auto w-92 md:w-96 shadow-md rounded-sm md:order-last order-first">
                    <Image fill className="object-cover" src={country.flags.svg} alt={country.flags.alt} />
                </div>
            </article>
            <section>
                <h3 className="mt-12 text-2xl font-semibold text-gray-800">Países que fazem fronteira</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2 mt-5 mb-5">
                    {borderCountries?.length && (borderCountries.map((borderCountry: BorderCountry) => (
                        <CountryCard key={borderCountry.cca3} {...borderCountry} />
                    )))}
                </div>
            </section>
        </section>
    );
}

export const generateMetadata = ({ params: { name } }: { params: { name: string } }): Metadata => {
    return {
        title: `${decodeURIComponent(name)}`,
        description: `Informations about the ${name}`
    }
}