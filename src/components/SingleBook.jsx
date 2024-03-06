import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SingleBook = ({ books })=> {
  const params = useParams();
  const id = +params.id;
  const book = books.find(book => book.id === id);
  if(!book){
    return null;
  }
  const navigate = useNavigate();

  return(
    <>
      <div className="single-book-container">
        <h2>{ book.title }</h2>
        <h3>{ book.author }</h3>
        <p>{ book.description }</p>
        <img className="book-cover" src={book.coverimage} alt="book cover image" />   
        <button onClick={() => navigate(`/books`)}>Back to All Books</button>
        <button onClick={() => navigate(`/account`)}>Reserve This Book</button>
      </div>
   
    </>

  );
};

export default SingleBook;