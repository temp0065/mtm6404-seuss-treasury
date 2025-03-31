import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

async function getSeussTreasury() {
    try {
        const data = await fetch('https://seussology.info/api/books');
        const response = await data.json();
        return response
    }
    catch (error) {
        console.log(error);
    }
}

function BookPreview({ id, image, title }) {
    return (
        <article>
            <Link to={`/book/${id}`} aria-label={`View details on ${title}`}>
                <img src={image} alt={title} />
            </Link>
        </article>
    )
}

export default function App() {
    
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch the data when the component mounts
        const fetchBooks = async () => {
            const books = await getSeussTreasury();
            setBooks(books); // Set the state with the fetched books
        };

        fetchBooks();
    }, []);

    console.log(books);

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

            <main className="bg-white p-5 xl:my-5 max-w-[1240px] m-auto">
                <h1 className='text-center text-3xl md:text-4xl font-bold mb-4'>Seuss Tresury</h1>
                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:p-5'>
                    {/* Load every book onto the page */}
                    {books.map(book => (
                        <BookPreview key={book.id} image={book.image} title={book.title} id={book.id}/>
                    ))}
                </section>
            </main>
        </>
    )
}
