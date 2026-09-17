CREATE TABLE Projects(
    Project_ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
    Description VARCHAR(8000) NOT NULL,
    GitLink VARCHAR(255) NOT NULL,
    Languages VARCHAR(255) NOT NULL,
    ProjectLink VARCHAR(255)
)

INSERT INTO Projects(Name, Description, GitLink, Languages, ProjectLink) 
VALUES ( 'Test Title', 'test Description', 'test lanuages');