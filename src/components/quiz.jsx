import { useReducer , useEffect , useState }from "react"
import listQuestion from "./listQuestion"


export default function Section() {

    // initialcount is variable for reducer
    const initialCount = ({count:0 , next: false , correctAns: false, score:0})    

    //start function of reducer
    function buttonReducer(counter,action){
        switch (action.type) {
            case 0:
                if (listQuestion[counter.count].correct == action.type){
                    counter.score += 10
                }
                return(
                    {...counter, next: true, correctAns: true}
                )
            case 1:
                if (listQuestion[counter.count].correct == action.type){
                    counter.score += 10
                }
                return(
                    {...counter, next: true, correctAns: true}
                )
            case 2:
                if (listQuestion[counter.count].correct == action.type){
                    counter.score += 10
                }
                return(
                    {...counter, next: true, correctAns: true}
                )
            case 3:
                if (listQuestion[counter.count].correct == action.type){
                    counter.score += 10
                }
                return(
                    {...counter, next: true, correctAns: true}
                )
            case 4:
                return (
                    {count: counter.count +1,
                        next: false, score: counter.score}
                )
            default:
                break
        }
    }
    //finish function of reducer
    //counter is useReducer
    const[counter,dispatch] = useReducer(buttonReducer,initialCount)

    //filterList is filter of listQuestion that show one by one Items
    const filterList = listQuestion.filter(e => e.id == counter.count)

    //useState of timer
    const [minutes,SetMinutes] = useState(5)
    const [seconds,SetSeconds] = useState(59)
    
    //start timer
    useEffect(()=>{
        let interval = null
        if (seconds > 0 || minutes > 0){
            interval = setInterval(()=>{
                if (seconds === 0){
                    if (minutes === 0){
                        clearInterval(interval)
                    }else{
                        SetMinutes((prev)=>prev-1)
                        SetSeconds(59)
                    }
                }else{
                    SetSeconds((prev)=>prev-1)
                }
            },1000)
        }else if(seconds === 0 && minutes === 0){
            clearInterval(interval)
        }

        return ()=> clearInterval(interval)
    },[seconds,minutes])
    //finish timer


    return(
        <>
        <section>
            {minutes === 0 && seconds === 0 ?
                <div>
                    <h3>Your Times is finished!</h3>
                    <h3>your score is {counter.score}/100</h3>
                </div>:
                <div>
                    {filterList.map((item)=>
                    (<div key={item.id}>
                        <h3>{item.question}</h3>
                        {counter.correctAns? <ul>
                            <li><button className={listQuestion[counter.count].correct==0?'correct':'notcorrect'}>{item.answers[0]}</button></li>
                            <li><button className={listQuestion[counter.count].correct==1?'correct':'notcorrect'}>{item.answers[1]}</button></li>
                            <li><button className={listQuestion[counter.count].correct==2?'correct':'notcorrect'}>{item.answers[2]}</button></li>
                            <li><button className={listQuestion[counter.count].correct==3?'correct':'notcorrect'}>{item.answers[3]}</button></li>
                        </ul>
                        :
                        <ul>
                            <li><button onClick={()=>dispatch({type:0})}>{item.answers[0]}</button></li>
                            <li><button onClick={()=>dispatch({type:1})}>{item.answers[1]}</button></li>
                            <li><button onClick={()=>dispatch({type:2})}>{item.answers[2]}</button></li>
                            <li><button onClick={()=>dispatch({type:3})}>{item.answers[3]}</button></li>
                        </ul>}
                    </div>))}
                    <div>
                        {counter.count != 5?<div className="time-score"><span>{minutes}:{seconds}</span><span>{counter.score}/100</span> </div>: ''}
                        {counter.next && <button className="next-button" onClick={()=>dispatch({type:4})}>next</button>}
                    </div>
                    {counter.count == 5? <h2>your score is {counter.score}/100</h2>: ''}
                </div>
            }
        </section>
        </>
    )
}