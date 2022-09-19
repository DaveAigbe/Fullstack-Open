import React from 'react';

const Header = ({course}) => {
    return (
        <h2>{course}</h2>
    );
};

const Part = ({part, exercises}) => {
    return (
        <h4>
            {part}: {exercises}
        </h4>
    );
};

const Total = ({course}) => {
    const exercises = course.parts
        .map(part => part.exercises)
        .reduce((prev, curr) => prev + curr);

    return (
        <div>
            <h4>Total: {exercises}</h4>
        </div>
    );
};


const Course = ({course}) => {
    return (
        <div className="container">
            <header>
                <Header course={course.name}/>
            </header>
            <ul>
                {course.parts.map(part =>
                    <li key={part.id}>
                        <Part part={part.name} exercises={part.exercises}/>
                    </li>
                )}
            </ul>
            <Total course={course}/>
        </div>
    );
};
export default Course;
