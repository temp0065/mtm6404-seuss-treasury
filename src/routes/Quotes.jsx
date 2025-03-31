import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function getTenRandomQuotes() {
    const quotesData = await fetch("https://seussology.info/api/quotes/random/10");
    const response = await quotesData.json();
    return response
}

function Quote({ text, bookOrigin }) {
    return (
        <article className="bg-amber-200 p-5 rounded-sm">
            <blockquote>
                <p className="text-xl font-semibold">"{ text }"</p>
            </blockquote>
            <h2 className="font-light mt-3">- Dr. Seuss, <cite>{ bookOrigin }</cite></h2>
        </article>
    )
}

export default function Quotes() {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        // Fetch the data when the component mounts
        const fetchQuotes = async () => {
            const quoteData = await getTenRandomQuotes();
            setQuotes(quoteData); // Set the state with the fetched books
        };

        fetchQuotes();
    }, []);

    return (
        <>
            <header>
                <nav className="flex justify-between items-center p-5 px-8 bg-black">
                    <Link to={"/"} aria-label="Go to books page." className="text-2xl md:text-3xl font-black text-white">Dr. Seuss</Link>
                    <ul className="flex flex-row gap-4 text-white">
                        <li><Link to={"/"} aria-label="Go to books page.">Book</Link></li>
                        <li><Link to={"/quotes"} aria-label="Go to quotes page.">Quotes</Link></li>
                    </ul>
                </nav>
            </header>

            <main className="max-w-[1240px] min-h-screen m-auto md:flex md:justify-center md:items-center">
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
                    {quotes.map(quote => (
                        <Quote key={quote.id} text={quote.text} bookOrigin={quote.book.title} />
                    ))}
                </section>
            </main>
        </>
    )
}