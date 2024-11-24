CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sid VARCHAR(16) UNIQUE,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    department ENUM('CSE', 'BBA', 'English', 'LLB') NOT NULL,
    session VARCHAR(10),
    role ENUM('teacher', 'student', 'cr', 'hod', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(12) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    department ENUM('CSE', 'BBA', 'English', 'LLB') NOT NULL,
    session VARCHAR(10) NOT NULL,
    credit INT NOT NULL,
    instructor INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS enroll (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    student_id INT,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    course_id INT,
    session VARCHAR(10),
    department ENUM('CSE', 'BBA', 'English', 'LLB'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    asked_by INT,
    course_id INT,
    department ENUM('CSE', 'BBA', 'English', 'LLB') NOT NULL,
    session VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asked_by) REFERENCES users(id) ON DELETE
    SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    question_id INT,
    answered_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (answered_by) REFERENCES users(id) ON DELETE
    SET NULL ON UPDATE CASCADE
);