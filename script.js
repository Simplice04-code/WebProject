document.addEventListener('DOMContentLoaded', function() {
    // Calendar functionality
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    let currentDate = new Date();
    
    function renderCalendar() {
        calendarGrid.innerHTML = '';
        
        // Set month and year header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        // Get first day of month and total days in month
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day-header');
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });
        
        // Empty cells for days before the first day
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyElement = document.createElement('div');
            emptyElement.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyElement);
        }
        
        // Days of the month
        const today = new Date();
        const quizDates = [15, 20, 25]; // Example quiz dates
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            
            // Highlight today
            if (day === today.getDate() && 
                currentDate.getMonth() === today.getMonth() && 
                currentDate.getFullYear() === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Mark quiz dates
            if (quizDates.includes(day)) {
                dayElement.classList.add('event');
                const eventElement = document.createElement('div');
                eventElement.classList.add('calendar-event');
                eventElement.textContent = 'Quiz';
                dayElement.appendChild(eventElement);
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Initial render
    renderCalendar();
    
    // Message form functionality
    const messageForm = document.getElementById('message-form');
    const messageHistory = document.getElementById('message-history');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const teacher = document.getElementById('teacher').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!teacher || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Add message to history
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        
        const now = new Date();
        const dateString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        
        messageDiv.innerHTML = `
            <h4>To: ${document.getElementById('teacher').options[document.getElementById('teacher').selectedIndex].text}</h4>
            <h5>Subject: ${subject}</h5>
            <p>${message}</p>
            <div class="message-date">${dateString}</div>
        `;
        
        messageHistory.prepend(messageDiv);
        
        // Clear form
        messageForm.reset();
        
        // Show success message
        alert('Message sent successfully!');
    });
    
    // Sample messages (would normally come from a database)
    const sampleMessages = [
        {
            teacher: "Mathematics Teacher",
            subject: "Question about homework",
            message: "I had a question about problem #5 on the homework. Could you clarify the instructions?",
            date: "October 8, 2023 14:30"
        },
        {
            teacher: "Science Teacher",
            subject: "Lab report deadline",
            message: "Is it possible to get an extension on the lab report? I've been sick this week.",
            date: "October 5, 2023 09:15"
        }
    ];
    
    // Display sample messages
    sampleMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `
            <h4>To: ${msg.teacher}</h4>
            <h5>Subject: ${msg.subject}</h5>
            <p>${msg.message}</p>
            <div class="message-date">${msg.date}</div>
        `;
        messageHistory.appendChild(messageDiv);
    });
});