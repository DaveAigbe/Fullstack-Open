import {useState} from 'react';
import './App.css';

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]

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

const Anecdote = ({quote}) => {
    return (
        <h3>
            {quote}
        </h3>
    )
}


function App() {
    const [feedback, setFeedback] = useState({good: 0, neutral: 0, bad: 0});
    const [quote, setQuote] = useState('')
    const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})

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

    const newQuote = () => {
        const randomIndex = Math.round(Math.random() * anecdotes.length)

        setQuote(anecdotes[randomIndex])
    }

    const increaseVote = () => {
        const quoteIndex = Number(anecdotes.indexOf(quote))

        const copy = {...votes} // Editing objects in this manner is much simpler, just make a copy of the object and alter it
        copy[quoteIndex] = copy[quoteIndex] + 1
        setVotes(copy)
    }

    const topAnecdote = () => {
        let highestValue = 0;
        let highestKey = 0;


        for (const [key, value] of Object.entries(votes)) {
            if (value > highestValue) {
                highestValue = value;
                highestKey = key;
            }
        }

        return [highestKey, highestValue]
    }

    return (
        <div className="App">
            <section className={'buttons'}>
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
                <Anecdote quote={quote} votes={votes}/>
                <p>Votes: {votes[anecdotes.indexOf(quote)]}</p>
                <Button text={'Generate'} onClick={newQuote}/>
                <Button text={'Vote!'} onClick={increaseVote}/>
            </section>
            <section className={'top-anecdote'}>
                <header>
                    <h1>Top Anecdote</h1>
                </header>
                <h3>{anecdotes[topAnecdote()[0]]}</h3>
                <p>With {topAnecdote()[1]} votes!</p>
            </section>
        </div>
    );
}

export default App;
