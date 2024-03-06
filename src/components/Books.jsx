const Books = ({ books }) => {
  return (
    <>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <h3>by {book.author}</h3>
            {/* <p>{book.description}</p> */}
            {/* <p>{book.available}</p> */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Books;
