import React, { useState } from "react";
import {interval} from "rxjs";
import { map} from "rxjs/operators";

import Timer from "../Timer/timer";

// Крок інтервалу
const step = 1000;

function Proect() {

    // дефолний стан секундоміра
    const [timer, setTimer] = useState(0);
    const [diff, setDiff] = useState(0);

    // дефолтне значення підписки
    const [subscription, setSubscription] = useState("");
    const [prevent, setPrevent] = useState(true);

// ****КНОПКИ****

    // кнопка Start / Stop
    const start_stopTimer = () => {
        // Перевірка підписки
        if (!subscription) {
            const timerSubscription = interval(step)
                .pipe(map((v) => v + 1))
                .subscribe((v) => {
                    setTimer(v + diff);
            });
            setSubscription(timerSubscription);
        } else {
            subscription.unsubscribe();
            setTimer(0);
            setDiff(0);
            setSubscription("");
        }
    };
    // кнопка Wait
    const waitTimer = (event) => {
        if (prevent) {
            setPrevent(false);
            const timerInstance = setTimeout(function () {
                setPrevent(true);
                clearTimeout(timerInstance);
                            
            }, 300);
        } else {
            if (subscription) {
                subscription.unsubsribe();

            }
            setDiff(timer);
            setSubscription("");
        }
    };

    // кнопка reset 
    const resetTimer = () => {
        if (subscription) {
            subscription.unsubsribe()

        }
    const timerSubscription = interval(step).subscribe((v) => {
        setTimer(v);

    });
    setSubscription(timerSubscription);

    };

    return (
        <div className="Proect">
            <h1>Таймер</h1>
            <Timer timePassed={timer ? timer : diff} />
            <div className="btn">
                <button className="buttons" id="start_stop_btn" onClick={start_stopTimer}>Start/Stop</button>
                <button className="buttons" onClick={waitTimer}>Wait</button>
                <button className="buttons" id="reset_btn" onClick={resetTimer}>Reset</button>
            </div>
        </div>
    )
}
export default Proect;
