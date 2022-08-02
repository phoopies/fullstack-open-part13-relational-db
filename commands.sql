CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT NOT NULL,
    url TEXT,
    title TEXT,
    likes INTEGER DEFAULT 0 NOT NULL
);

INSERT INTO blogs (author, url, title) values ('Stefu', 'www.coffee.com', 'The tastiest coffee');

INSERT INTO blogs (author, url, title) values ('Kalle', 'www.osrs.com', '99str fast');  

SELECT * FROM blogs;
