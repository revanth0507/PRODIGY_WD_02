class Stopwatch {
  constructor() {
    this.time = 0;
    this.isRunning = false;
    this.interval = null;
    this.laps = [];
    this.lastLapTime = 0;

    // DOM elements
    this.timeDisplay = document.getElementById('time');
    this.startStopBtn = document.getElementById('startStop');
    this.lapBtn = document.getElementById('lap');
    this.resetBtn = document.getElementById('reset');
    this.lapsContainer = document.getElementById('laps');

    // Bind event listeners
    this.startStopBtn.addEventListener('click', () => this.toggleStartStop());
    this.lapBtn.addEventListener('click', () => this.recordLap());
    this.resetBtn.addEventListener('click', () => this.reset());

    // Initialize display
    this.updateDisplay();
  }

  formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  }

  updateDisplay() {
    this.timeDisplay.textContent = this.formatTime(this.time);
  }

  toggleStartStop() {
    this.isRunning = !this.isRunning;
    
    if (this.isRunning) {
      this.start();
      this.startStopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
      `;
      this.startStopBtn.classList.add('running');
      this.lapBtn.disabled = false;
    } else {
      this.stop();
      this.startStopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      `;
      this.startStopBtn.classList.remove('running');
      this.lapBtn.disabled = true;
    }
  }

  start() {
    this.interval = setInterval(() => {
      this.time += 10;
      this.updateDisplay();
    }, 10);
  }

  stop() {
    clearInterval(this.interval);
  }

  recordLap() {
    const lapTime = this.time - this.lastLapTime;
    const lap = {
      number: this.laps.length + 1,
      duration: lapTime,
      total: this.time
    };
    
    this.laps.unshift(lap);
    this.lastLapTime = this.time;
    this.updateLapsDisplay();
  }

  updateLapsDisplay() {
    this.lapsContainer.innerHTML = this.laps
      .map(lap => `
        <div class="lap-item">
          <span class="lap-number">Lap ${lap.number}</span>
          <div class="lap-times">
            <span class="lap-duration">${this.formatTime(lap.duration)}</span>
            <span class="lap-total">${this.formatTime(lap.total)}</span>
          </div>
        </div>
      `)
      .join('');
  }

  reset() {
    this.stop();
    this.time = 0;
    this.isRunning = false;
    this.laps = [];
    this.lastLapTime = 0;
    this.updateDisplay();
    this.updateLapsDisplay();
    this.startStopBtn.classList.remove('running');
    this.startStopBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    `;
    this.lapBtn.disabled = true;
  }
}

// Initialize the stopwatch
const stopwatch = new Stopwatch();
