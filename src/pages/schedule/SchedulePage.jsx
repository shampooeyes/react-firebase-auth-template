import { doc, getDoc } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { FirebaseFirestore } from "../../firebase";


const SchedulePage = () => {
    const [schedule, setSchedule] = useState();

    useEffect(() => {
        const fetchSchedule = () => {
          getDoc(doc(FirebaseFirestore, "schedule", "calendar")).then((snapshot) => {
            const calendar = snapshot.data();
            const calendarDates = calendar.keys();
            
          });
        };
        fetchSchedule();
    }, []);

    return <>
    </>;
}

export default SchedulePage;