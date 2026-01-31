
class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .generator-title {
                    font-size: 2rem;
                    color: var(--text-color);
                    margin-bottom: 1rem;
                }
                .numbers-container {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                .number-ball {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--secondary-color);
                    color: var(--background-color);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    transform: scale(0);
                    animation: pop-in 0.5s forwards;
                }

                @keyframes pop-in {
                    to {
                        transform: scale(1);
                    }
                }

                .generate-button {
                    background-color: var(--primary-color);
                    color: var(--white);
                    border: none;
                    padding: 1rem 2rem;
                    font-size: 1.2rem;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.2s;
                    box-shadow: 0 4px 15px rgba(255, 64, 129, 0.4);
                }

                .generate-button:hover {
                    background-color: #d81b60; /* A darker shade of the primary color */
                    transform: translateY(-2px);
                }

                .generate-button:active {
                    transform: translateY(1px);
                }
            </style>

            <h2 class="generator-title">Lotto Number Generator</h2>
            <div class="numbers-container">
                <!-- Numbers will be generated here -->
            </div>
            <button class="generate-button">Generate Numbers</button>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('.generate-button').addEventListener('click', () => this.generateNumbers());
    }

    generateNumbers() {
        const numbersContainer = this.shadowRoot.querySelector('.numbers-container');
        numbersContainer.innerHTML = ''; // Clear previous numbers
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        Array.from(numbers).sort((a,b) => a-b).forEach((number, index) => {
            const ball = document.createElement('div');
            ball.classList.add('number-ball');
            ball.textContent = number;
            ball.style.animationDelay = `${index * 0.1}s`;
            numbersContainer.appendChild(ball);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
});

const contactModal = document.getElementById('contact-modal');
const contactBtn = document.getElementById('contact-btn');
const closeBtn = document.querySelector('.close-btn');

contactBtn.addEventListener('click', () => {
    contactModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    contactModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == contactModal) {
        contactModal.style.display = 'none';
    }
});
