-- TechNova_Assignment.sql
-- Employee Rewards & Performance Management System

CREATE DATABASE TechNovaDB;
USE TechNovaDB;

-- TABLES ----------------------------------------------------
CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(50) NOT NULL UNIQUE,
    Location VARCHAR(50)
);

CREATE TABLE Employee (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(50) NOT NULL,
    Gender CHAR(1),
    DOB DATE,
    HireDate DATE,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Project (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100) NOT NULL,
    DeptID INT,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

CREATE TABLE Performance (
    EmpID INT,
    ProjectID INT,
    Rating DECIMAL(3,2),
    ReviewDate DATE,
    PRIMARY KEY (EmpID, ProjectID),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

CREATE TABLE Reward (
    EmpID INT,
    RewardMonth DATE,
    RewardAmount DECIMAL(10,2),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);

CREATE INDEX idx_emp_name ON Employee(EmpName);
CREATE INDEX idx_dept_id ON Employee(DeptID);

-- INSERT DATA ----------------------------------------------------
INSERT INTO Department VALUES
(101, 'IT', 'Bangalore'),
(102, 'HR', 'Delhi'),
(103, 'Finance', 'Mumbai'),
(104, 'Marketing', 'Chennai'),
(105, 'Operations', 'Hyderabad');

INSERT INTO Employee VALUES
(1, 'Asha', 'F', '1990-07-12', '2018-06-10', 101),
(2, 'Raj', 'M', '1988-04-09', '2020-03-22', 102),
(3, 'Neha', 'F', '1995-01-15', '2021-08-05', 101),
(4, 'John', 'M', '1992-10-05', '2019-09-11', 103),
(5, 'Priya', 'F', '1989-02-20', '2017-01-10', 104);

INSERT INTO Project VALUES
(1, 'Website Revamp', 101, '2020-01-10', '2020-06-10'),
(2, 'Recruitment Drive', 102, '2021-04-01', '2021-08-30'),
(3, 'Budget Planning', 103, '2019-01-01', '2019-12-31'),
(4, 'Ad Campaign', 104, '2022-02-01', '2022-07-30'),
(5, 'Cloud Migration', 101, '2021-03-01', '2021-12-31');

INSERT INTO Performance VALUES
(1, 1, 4.5, '2021-07-01'),
(2, 2, 4.2, '2021-08-15'),
(3, 5, 4.8, '2022-01-20'),
(4, 3, 3.9, '2020-02-10'),
(5, 4, 4.1, '2022-03-25');

INSERT INTO Reward VALUES
(1, '2022-01-01', 3000),
(2, '2022-02-01', 1500),
(3, '2022-03-01', 500),
(4, '2022-04-01', 4000),
(5, '2022-05-01', 2000);

UPDATE Employee SET DeptID = 105 WHERE EmpID = 5;
DELETE FROM Reward WHERE RewardAmount < 1000;

-- QUERIES ----------------------------------------------------
SELECT * FROM Employee WHERE HireDate > '2019-01-01';

SELECT d.DeptName, AVG(p.Rating) AS AvgRating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
GROUP BY d.DeptName;

SELECT EmpName, TIMESTAMPDIFF(YEAR, DOB, CURDATE()) AS Age FROM Employee;

SELECT YEAR(RewardMonth) AS Year, SUM(RewardAmount) AS TotalRewards
FROM Reward
WHERE YEAR(RewardMonth) = YEAR(CURDATE())
GROUP BY YEAR(RewardMonth);

SELECT e.EmpName, r.RewardAmount FROM Employee e
JOIN Reward r ON e.EmpID = r.EmpID
WHERE r.RewardAmount > 2000;

SELECT e.EmpName, d.DeptName, p.ProjectName, pf.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance pf ON e.EmpID = pf.EmpID
JOIN Project p ON pf.ProjectID = p.ProjectID;

SELECT e.EmpName, d.DeptName, p.Rating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
WHERE p.Rating = (
    SELECT MAX(p2.Rating)
    FROM Performance p2
    JOIN Employee e2 ON p2.EmpID = e2.EmpID
    WHERE e2.DeptID = e.DeptID
);

SELECT EmpName FROM Employee
WHERE EmpID NOT IN (SELECT EmpID FROM Reward);

-- TRANSACTION ----------------------------------------------------
START TRANSACTION;
INSERT INTO Employee VALUES (6, 'Karan', 'M', '1998-06-15', '2023-01-01', 101);
INSERT INTO Performance VALUES (6, 1, 4.6, '2023-02-01');
COMMIT;

-- OPTIMIZATION ----------------------------------------------------
EXPLAIN SELECT e.EmpName, d.DeptName, p.ProjectName, pf.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance pf ON e.EmpID = pf.EmpID
JOIN Project p ON pf.ProjectID = p.ProjectID;

CREATE INDEX idx_project_dept ON Project(DeptID);
EXPLAIN SELECT e.EmpName, d.DeptName, p.ProjectName, pf.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance pf ON e.EmpID = pf.EmpID
JOIN Project p ON pf.ProjectID = p.ProjectID;

-- BONUS ----------------------------------------------------
CREATE VIEW EmployeePerformanceView AS
SELECT e.EmpID, e.EmpName, d.DeptName, p.Rating, p.ReviewDate
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance p ON e.EmpID = p.EmpID;

DELIMITER //
CREATE PROCEDURE GetTopPerformers(IN deptName VARCHAR(50))
BEGIN
    SELECT e.EmpName, d.DeptName, p.Rating
    FROM Employee e
    JOIN Department d ON e.DeptID = d.DeptID
    JOIN Performance p ON e.EmpID = p.EmpID
    WHERE d.DeptName = deptName
    ORDER BY p.Rating DESC
    LIMIT 3;
END //
DELIMITER ;
