function formatDate(date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

class Player {
    constructor(job) {
        this.job = job;
        this.balance = 0;
        this.skills = [ basicTraining ];
    }

    receiveSalary() {
        let salaryWithMultiplier = this.job.salary;
        this.balance += salaryWithMultiplier;
    }
}

class Job {
    constructor(title, salary, trainingRequired = null) {
        this.title = title;
        this.salary = salary;
    }
}

class Training {
    constructor(name, cost, duration) {
        this.name = name;
        this.cost = cost;
        this.duration = duration;
        this.progress = 0;
    }

    // Advance training by one month
    advance() {
        this.progress++;
    }

    // Check if training is completed
    isCompleted() {
        return this.progress >= this.duration;
    }
}

class GameManager {
    constructor(player) {
        this.player = player;
        this.currentDate = new Date(1970, 0, 1);
        this.secondsPerDay = 1;
        this.daysInMonth = 30;
    }

    initializeUI() {
        document.getElementById('jobTitle').innerText = this.player.job.title;
        document.getElementById('balance').innerText = this.player.balance;
        const skillsList = document.getElementById('skillsList');
        skillsList.innerHTML = ''; // Clear the list

        this.player.skills.forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.classList.add('list-group-item');
            skillItem.textContent = skill.name;
            skillsList.appendChild(skillItem);
        });
    }

    advanceDay() {
        this.currentDate.setDate(this.currentDate.getDate() + 1);

        // Check if it's the start of a new month
        if (this.currentDate.getDate() === 1) {
            this.player.receiveSalary(); // Pay salary for previous month
        }

        this.displayDate();
        this.updateUI();
    }

    // Start the game loop
    start() {
        setInterval(() => this.advanceDay(), this.secondsPerDay * 1000);
    }

    // Display the current date in the game
    displayDate() {
        const dateDisplay = document.getElementById('dateDisplay');
        dateDisplay.innerText = formatDate(this.currentDate);
    }

    // Update UI with current player stats
    updateUI() {
        document.getElementById('balance').innerText = this.player.balance;
        document.getElementById('jobTitle').innerText = this.player.job.title;
        const skillsList = document.getElementById('skillsList');
        skillsList.innerHTML = ''; // Clear the list

        this.player.skills.forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.classList.add('list-group-item');
            skillItem.textContent = skill.name;
            skillsList.appendChild(skillItem);
        });
    }
}

// Jobs
const janitorJob = new Job("Janitor", 100);

const jobs = [ janitorJob ];

// Trainings
const basicTraining = new Training("Basic Skills", 50, 1);
const bartendingTraining = new Training("Customer Service Course", 100, 2);
const waiterTraining = new Training("Hospitality Course", 150, 3);
const teachingTraining = new Training("Teaching License", 300, 6);
const carpentryTraining = new Training("Carpentry Certification", 500, 5);
const mechanicsTraining = new Training("Auto Repair Course", 600, 4);
const electricianTraining = new Training("Electrical Engineering Certification", 700, 5);
const codingTraining = new Training("Coding Bootcamp", 1000, 10);
const nursingTraining = new Training("Nursing Degree", 1200, 8);
const constructionTraining = new Training("Construction Management Degree", 1500, 7);
const marketingTraining = new Training("Business Degree", 2000, 12);
const lawTraining = new Training("Law School Degree", 3000, 24);
const medicalTraining = new Training("Medical School Degree", 5000, 36);

const trainings = [ basicTraining, bartendingTraining, waiterTraining, teachingTraining, carpentryTraining, mechanicsTraining, electricianTraining, codingTraining, nursingTraining, constructionTraining, marketingTraining, lawTraining, medicalTraining ];

// utilities



let player = new Player(jobs[0]);
let gameManager = new GameManager(player);
gameManager.start();