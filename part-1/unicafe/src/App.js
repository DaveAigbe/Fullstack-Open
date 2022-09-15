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
        <tr>
            <td>{text}:</td>
            <td>{value}</td>
        </tr>
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
                    <table>
                        <thead>
                            <th>Count</th>
                        </thead>
                        <StatisticsLine text={'Good'} value={feedback.good} />
                        <StatisticsLine text={'Neutral'} value={feedback.neutral} />
                        <StatisticsLine text={'Bad'} value={feedback.bad} />
                    </table>
                    <table>
                        <thead>
                            <th>Calculations</th>
                        </thead>
                        <StatisticsLine text={'All'} value={total}/>
                        <StatisticsLine text={'Average'} value={average} />
                        <StatisticsLine text={'Positive'} value={`${positive} %`} />
                    </table>
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
                    <h1>Give Feedback</h1>
                </header>
                <Button text={'Good'} onClick={increaseGood}/>
                <Button text={'Neutral'} onClick={increaseNeutral}/>
                <Button text={'Bad'} onClick={increaseBad}/>
            </section>
            <section>
                <header>
                    <h1>Statistics</h1>
                </header>
                <Statistics feedback={feedback}/>
            </section>
            <section>
                <header>
                    <h1>Generate Anecdote</h1>
                </header>

            </section>
        </div>
    );
}

export default App;
