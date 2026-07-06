-- Authors
INSERT INTO authors (id, name, intro) VALUES
(1, 'Isaac Asimov', 'American writer and professor of biochemistry, known for hard sci-fi.'),
(2, 'Agatha Christie', 'English writer known for her 66 detective novels and short story collections.'),
(3, 'J.R.R. Tolkien', 'English writer, poet, philologist, and academic, best known for high fantasy.'),
(4, 'Walter Isaacson', 'American author, journalist, and professor famous for biographies.'),
(5, 'Arthur Conan Doyle', 'British writer and physician who created the character Sherlock Holmes.');

-- Genres
INSERT INTO genres (id, name) VALUES
(1, 'Sci-Fi'),
(2, 'Mystery'),
(3, 'Fantasy'),
(4, 'Biography');

-- Books
INSERT INTO books (id, title, author_id, genre_id) VALUES
(1, 'Foundation', 1, 1),
(2, 'I, Robot', 1, 1),
(3, 'The Caves of Steel', 1, 1),
(4, 'Childhood''s End', 5, 1),
(5, 'The Left Hand of Darkness', 3, 1),
(6, 'Neuromancer', 2, 1),
(7, 'Dune', 1, 1),
(8, 'Snow Crash', 5, 1),
(9, 'And Then There Were None', 2, 2),
(10, 'The Murder of Roger Ackroyd', 2, 2),
(11, 'Murder on the Orient Express', 2, 2),
(12, 'A Study in Scarlet', 5, 2),
(13, 'The Hound of the Baskervilles', 5, 2),
(14, 'The Girl with the Dragon Tattoo', 1, 2),
(15, 'Gone Girl', 4, 2),
(16, 'The Da Vinci Code', 3, 2),
(17, 'The Silent Patient', 2, 2),
(18, 'In the Woods', 4, 2),
(19, 'The Hobbit', 3, 3),
(20, 'The Fellowship of the Ring', 3, 3),
(21, 'The Two Towers', 3, 3),
(22, 'The Return of the King', 3, 3),
(23, 'A Game of Thrones', 1, 3),
(24, 'The Way of Kings', 5, 3),
(25, 'The Name of the Wind', 2, 3),
(26, 'Steve Jobs', 4, 4),
(27, 'Einstein: His Life and Universe', 4, 4),
(28, 'Benjamin Franklin: An American Life', 4, 4),
(29, 'Leonardo da Vinci', 4, 4),
(30, 'Elon Musk', 4, 4),
(31, 'Alexander Hamilton', 1, 4),
(32, 'John Adams', 2, 4),
(33, 'Churchill: A Life', 3, 4),
(34, 'Napoleon: A Life', 5, 4),
(35, 'Grant', 1, 4),
(36, 'Madame Curie', 3, 4);
