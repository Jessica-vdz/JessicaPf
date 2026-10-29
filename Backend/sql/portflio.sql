CREATE TABLE
    Projects (
        Project_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Description VARCHAR(8000) NOT NULL,
        GitLink VARCHAR(255) NOT NULL,
        ProjectLink VARCHAR(255),
        ProjectImg VARCHAR(255),
        ProjectLanguages TEXT
    );

CREATE TABLE
    Me (
        Me_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        Name VARCHAR(50) NOT NULL,
        Location VARCHAR(255) NOT NULL,
        Info TEXT,
        Github VARCHAR(255),
        Linkedin VARCHAR(255)
        Email VARCHAR(255) UNIQUE
    );

CREATE TABLE
    Category (
        Id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        Name VARCHAR(255) NOT NULL
    );

CREATE TABLE
    Books (
        Books_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        Title VARCHAR(255) NOT NULL,
        Author VARCHAR(255),
        Description TEXT,
        Category_ID INT,
        FOREIGN KEY (Category_ID) REFERENCES Category (Id)
    );

CREATE TABLE user(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    UserName VARCHAR(255),
    PasswordDb VARCHAR(255)
)
