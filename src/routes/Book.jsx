import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


async function getSeussTreasuryBook(id) {
    try {
        const bookData = await fetch(`https://seussology.info/api/books/${id}`);
        const response = await bookData.json();
        return response
    }
    catch (error) {
        console.log(error);
    }
}

export default function Book() {

    const [book, setBook] = useState({});
    const { id } = useParams();

    useEffect(() => {
        // Fetch the data when the component mounts
        const fetchBook = async () => {
            const book = await getSeussTreasuryBook(id);
            setBook(book); // Set the state with the fetched books
        };

        fetchBook();
    }, [id]);

    console.log(book)

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
                <article className="flex flex-col items-center md:items-start md:flex-row justify-center gap-5 w-full md:bg-amber-200 py-10 px-5">
                    <img src={book.image} alt={`Book cover for ${book.title}`} className="max-w-full md:max-w-[400px] h-auto grow" />
                    <div className="max-w-[70ch]">
                        <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>
                        <h2 className="text-lg md:text-xl"><span className="font-semibold">Year Published:</span> {book.year_published}</h2>
                        <p className="mt-3">{book.description}</p>
                    </div>
                </article>
            </main>
        </>
    )
}