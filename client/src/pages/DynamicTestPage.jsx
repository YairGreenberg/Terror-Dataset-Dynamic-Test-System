import { useEffect, useState } from 'react';
import axios from 'axios';


function DynamicTestPage() {
    const [question, setQuestion] = useState("null");
    const [listData, setListData] = useState([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [message, setMessage] = useState('');




    useEffect(() => {
        const getAllData = async () => {
            const allData = await axios.get("http://localhost:5000/api/complaints");
            setListData(allData.listData.Array);
        }
        getAllData();
    }, [])


       const generateQuestion = () => {
        if (listData.length === 0) return;
        
        const randomRow = listData[Math.floor(Math.random() * listData.length)];
        const shuffled = [...listData].sort(() => 0.5 - Math.random());
        
        setQuestion({
            xField: shuffled[0], xVal: randomRow[shuffled[0]],
            yField: shuffled[1], yVal: randomRow[shuffled[1]],
            zField: shuffled[2], zCorrect: randomRow[shuffled[2]]
        });
        setUserAnswer('');
        setMessage('');
    };



    const handleSave = async () => {
        try {
            await axios.post('http://localhost:5000/api/save-result', { score });
            alert("Score saved!");
        } catch (err) {
            alert("Failed to save score");
        }
    };



    return (
        <div>
            <header>
                <h1>Terror Data Quiz</h1>
            </header>
            <hr />
            <div></div>
            <p>Your Answer:</p>
            <input type="text" />
            <div>

                <button>Submit Answer</button>
                <button onClick={generateQuestion}>Start Test</button>
            </div>
             <div style={{border: '1px solid black', padding: '20px'}}>
                    <p>Given <strong>{question.xField}</strong> is <strong>{question.xVal}</strong></p>
                    <p>And <strong>{question.yField}</strong> is <strong>{question.yVal}</strong></p>
                    <p>What is the <strong>{question.zField}</strong>?</p>
                    
                    <input value={userAnswer} onChange={e => setUserAnswer(e.target.value)} />
                    <button>Back to Data Page</button>
                    <button onClick={generateQuestion} style={{marginLeft: '10px'}}>Next Question</button>
                </div>

     
            
            <p><strong>{message}</strong></p>
            <hr />
            <button onClick={handleSave} style={{backgroundColor: 'lightgreen'}}>Save Final Score to Server</button>

        </div>
    );
}

export default DynamicTestPage;
