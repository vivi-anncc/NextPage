import { useEffect, useState } from "react";

function Calendar() {
const [currentDate, setCurrentDate] = useState(new Date());
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    loadBooks();
}, []);

async function loadBooks() {
    try {
        const response = await fetch("/api/books");

        if (!response.ok) {
            throw new Error("Failed to load books");
        }

        const data = await response.json();

        setBooks(data);
    } catch (error) {
        console.error("Error loading books:", error);
    } finally {
        setLoading(false);
    }
}

function getDateString(date) {
    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getCalendarDays() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(
        year,
        month,
        1
    );

    const lastDay = new Date(
        year,
        month + 1,
        0
    );

    const days = [];

    const startingDay = firstDay.getDay();

    for (let i = 0; i < startingDay; i++) {
        days.push(null);
    }

    for (
        let day = 1;
        day <= lastDay.getDate();
        day++
    ) {
        days.push(
            new Date(
                year,
                month,
                day
            )
        );
    }

    return days;
}

function changeMonth(amount) {
    setCurrentDate(
        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + amount,
            1
        )
    );
}

function getBooksForDate(date) {
    if (!date) {
        return [];
    }

    const dateString = getDateString(date);

    return books.filter((book) => {
        if (!book.started_reading) {
            return false;
        }

        return (
            book.started_reading.slice(0, 10) ===
            dateString
        );
    });
}

const monthName =
    currentDate.toLocaleString(
        "default",
        {
            month: "long"
        }
    );

const year =
    currentDate.getFullYear();

const calendarDays =
    getCalendarDays();

const todayString =
    getDateString(new Date());

if (loading) {
    return (
        <main className="page">
            <div className="page-container">
                <p>
                    Loading calendar...
                </p>
            </div>
        </main>
    );
}

return (
    <main className="page">

        <div className="calendar-container">

            <div className="page-header">

                <h1>
                    Reading Calendar
                </h1>

                <p>
                    See when you started reading your books.
                </p>

            </div>

            <div className="calendar">

                <div className="calendar-header">

                    <button
                        type="button"
                        className="calendar-nav-button"
                        onClick={() =>
                            changeMonth(-1)
                        }
                    >
                        ‹
                    </button>

                    <h2>
                        {monthName} {year}
                    </h2>

                    <button
                        type="button"
                        className="calendar-nav-button"
                        onClick={() =>
                            changeMonth(1)
                        }
                    >
                        ›
                    </button>

                </div>

                <div className="calendar-weekdays">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>

                <div className="calendar-grid">

                    {calendarDays.map(
                        (date, index) => {

                            if (date === null) {
                                return (
                                    <div
                                        key={`empty-${index}`}
                                        className="calendar-day empty"
                                    />
                                );
                            }

                            const dateString =
                                getDateString(date);

                            const booksForDate =
                                getBooksForDate(date);

                            const isToday =
                                dateString ===
                                todayString;

                            return (
                                <div
                                    key={dateString}
                                    className={[
                                        "calendar-day",
                                        isToday
                                            ? "today"
                                            : ""
                                    ]
                                        .join(" ")
                                        .trim()}
                                >

                                    <span className="day-number">
                                        {date.getDate()}
                                    </span>

                                    <div className="calendar-events">

                                        {booksForDate.map(
                                            (book) => (
                                                <div
                                                    key={book.id}
                                                    className="calendar-event"
                                                >
                                                    {book.title}
                                                </div>
                                            )
                                        )}

                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>

            </div>

        </div>

    </main>
);

}

export default Calendar;