import {useState} from 'react';
import './App.css';

const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}


const StatisticsLine = ({text, value}) => {
    return (
        <>
            <p>{text}: {value}</p>
        </>
    )
}

const Statistics = ({feedback}) => {
    const total = feedback.good + feedback.neutral + feedback.bad;
    const average = ((feedback.good - feedback.bad) / total).toFixed(2);
    const positive = ((feedback.good / total) * 100).toFixed(2);


    return (
        <>
            {feedback.good || feedback.neutral || feedback.bad ?
                (<section>
                    <header>
                        <h1>Statistics</h1>
                    </header>
                    <section>
                        <StatisticsLine text={'Good'} value={feedback.good} />
                        <StatisticsLine text={'Neutral'} value={feedback.neutral} />
                        <StatisticsLine text={'Bad'} value={feedback.bad} />
                        <p>All: {total}</p>
                        <p>Average: {average}</p>
                        <p>Positive: {positive} %</p>
                    </section>
                </section>)
                :
                (<h1>
                    Please give feedback to render statistics.
                </h1>)
            }
        </>
    );
};


function App() {
    const [feedback, setFeedback] = useState({good: 0, neutral: 0, bad: 0});

    const increaseGood = () => {
        const newValue = feedback.good + 1;
        setFeedback({...feedback, good: newValue});
    };


    const increaseNeutral = () => {
        const newValue = feedback.neutral + 1;
        setFeedback({...feedback, neutral: newValue});
    };


    const increaseBad = () => {
        const newValue = feedback.bad + 1;
        setFeedback({...feedback, bad: newValue});
    };


    return (
        <div className="App">
            <section>
                <header>
                    <h1>Give feedback</h1>
                </header>
                <Button text={'Good'} onClick={increaseGood}/>
                <Button text={'Neutral'} onClick={increaseNeutral}/>
                <Button text={'Bad'} onClick={increaseBad}/>
            </section>
            <Statistics feedback={feedback}/>
        </div>
    );
}

export default App;
