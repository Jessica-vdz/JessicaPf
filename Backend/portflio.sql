CREATE TABLE Projects(
    Project_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
    Description VARCHAR(8000) NOT NULL,
    GitLink VARCHAR(255) NOT NULL,
    Languages VARCHAR(255) NOT NULL,
    ProjectLink VARCHAR(255)
)

CREATE TABLE Me(
    Me_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Age INT(100),
    Location VARCHAR(255) NOT NULL,
    About TEXT,
    Github VARCHAR(255),
    Linkedin VARCHAR(255)
)

INSERT INTO Me( Name, Age, Location, About, Github, Linkedin)
VALUES ('Jessica van der Zwaag', '23', 'Den Helder', 'hier komt jewssica', 'https://github.com/Jessica-vdz', 'hier komt linkedin')