import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Books = ({ books }) => {

  const navigate = useNavigate();

  return (
    <>
     
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h2>{book.title}</h2>
            <h3>by {book.author}</h3>
            <img className="book-cover" src={book.coverimage} alt="book cover image" />          
            <button onClick={() => navigate(`/books/${book.id}`)}>View Details</button>
          </div>

        ))}
    </>
  );
};

export default Books;
