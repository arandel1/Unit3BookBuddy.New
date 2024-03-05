// import { Link } from "react-router-dom";

const Books = ({ books }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {/* <Link to={`/books/${book.id}`}></Link> */}
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
          <p>{book.description}</p>
          <p>{book.available}</p>
        </li>
      ))}
    </ul>
  );
};

export default Books;
