import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export default function Card() {
    const { weatherData } = useSelector(state => state.weather);
    const [day, setDay] = useState('');
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [time, setTime] = useState("");

    // Get Date 
    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'long' };
        const options2 = { month: 'long' };
        const day = today.toLocaleDateString('en-US', options);
        const getDate = today.getDate();
        const getMonth = today.toLocaleString('en-us', options2);
        setDate(getDate);
        setMonth(getMonth);
        setDay(day);
        setTime(today.getHours());
    }, []);

    return (
        <>
            <div className="border-black border-[1px] rounded-lg max-w-md mx-auto p-4">
                <div className="flex justify-between">
                    <div className="">
                        <div className="text-2xl"> {day.toUpperCase()}</div>
                        <div>
                            <span className="mr-1">
                                {month}
                            </span>
                            <span className="mx-1">
                                {date}
                            </span>
                        </div>
                        <div className="font-bold">
                            {weatherData.name}
                        </div>
                    </div>
                    <div className="my-auto">
                        {time > 18 ? <img src="./img/Moon.png" className="w-8" /> : <img src="./img/Sun.png" className="w-10" />}

                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="">
                        <div className="text-2xl"><span>{weatherData && weatherData.main && (weatherData.main.temp - 273.15).toFixed(2)}</span>c</div>
                        <div>
                            <span className="mr-1">
                                {weatherData && weatherData.weather && weatherData.weather[0].main}
                            </span>
                        </div>
                    </div>
                    {/* Show icon of Weather  */}
                    <div className="my-auto">
                        <img src={`https://openweathermap.org/img/wn/${weatherData && weatherData.weather && weatherData.weather[0].icon}.png`} className="w-20" />
                    </div>
                    <div className="my-auto">
                        <div className="flex flex-row items-center my-1">
                            <img src="./img/WindSpeed.png" className="w-5" />
                            <span className="mx-1"> {weatherData && weatherData.wind && weatherData.wind.speed}</span>
                        </div>
                        <div className="flex flex-row items-center my-1">
                            <img src="./img/Humidity.png" className="w-5" />
                            <span className="mx-1"> {weatherData && weatherData.main && weatherData.main.humidity}</span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
