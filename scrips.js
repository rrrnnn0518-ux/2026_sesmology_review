// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if(navLinks.classList.contains('active')){
        icon.classList.replace('fa-bars', 'fa-xmark');
    }else{
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if(icon) icon.classList.replace('fa-xmark', 'fa-bars');
    });
});

// Timeline Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const timelineItems = document.querySelectorAll('.timeline-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        timelineItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(()=> item.style.opacity = '1', 50);
            } else {
                if (item.getAttribute('data-category').includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(()=> item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(()=> item.style.display = 'none', 400);
                }
            }
        });
    });
});

// Assignment Search
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const assignmentCards = document.querySelectorAll('.assignment-card');

function filterAssignments() {
    const query = searchInput.value.toLowerCase();
    assignmentCards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

searchBtn.addEventListener('click', filterAssignments);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') filterAssignments();
});

// Random Harvest
const harvestBtn = document.getElementById('harvest-btn');
const harvestText = document.getElementById('harvest-text');
const harvests = [
    "我學會了用地震波理解地球內部構造。",
    "我第一次把課程作業部署成網頁，非常有成就感！",
    "我理解了震源機制球如何連結斷層運動。",
    "我發現 AI 工具可以協助我整理、反思與呈現學習成果。",
    "我認識到地震學不只是理論，也和防災、工程、觀測與社會應用有關。",
    "參訪氣象署和國震中心，讓我看到課本知識在現實中的重量。",
    "透過 Raspberry Pi 自製地震儀，我親手體驗了硬體與觀測結合的樂趣。"
];

harvestBtn.addEventListener('click', () => {
    harvestText.style.opacity = 0;
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * harvests.length);
        harvestText.innerText = harvests[randomIndex];
        harvestText.style.opacity = 1;
    }, 300);
});

// Copy iframe code
const copyIframeBtn = document.getElementById('copy-iframe');
if (copyIframeBtn) {
    copyIframeBtn.addEventListener('click', () => {
        const iframeCode = `<iframe src="https://hf.space/embed/your-username/your-space-name" width="100%" height="450" frameborder="0"></iframe>`;
        navigator.clipboard.writeText(iframeCode).then(() => {
            const originalText = copyIframeBtn.innerHTML;
            copyIframeBtn.innerHTML = '<i class="fa-solid fa-check"></i> 程式碼已複製！';
            copyIframeBtn.style.background = 'var(--primary-color)';
            copyIframeBtn.style.color = '#fff';
            
            setTimeout(() => {
                copyIframeBtn.innerHTML = originalText;
                copyIframeBtn.style.background = '';
                copyIframeBtn.style.color = '';
            }, 2000);
        });
    });
}

// Quiz Logic
const quizData = [
    {
        q: "P 波和 S 波的主要差異是什麼？",
        options: ["P波是橫波，S波是縱波", "P波速度較快，S波速度較慢", "P波只能在固體中傳播", "S波破壞力通常較小"],
        ans: 1,
        feedback: "答對了！P波（Primary wave）是縱波，速度最快；S波（Secondary wave）是橫波，速度較慢且只能在固體中傳播。"
    },
    {
        q: "震源機制球可以用來判斷什麼？",
        options: ["地震規模的大小", "斷層的錯動型態", "地震發生的確切時間", "地震波的傳遞速度"],
        ans: 1,
        feedback: "正確！震源機制球可以幫助我們判斷斷層面走向、傾角及滑動方向（正斷層、逆斷層、平移斷層）。"
    },
    {
        q: "ScS 波中的 c 代表什麼？",
        options: ["Core (地核)", "Crust (地殼)", "CMB (核幔邊界反射)", "Compression (壓縮)"],
        ans: 2,
        feedback: "沒錯！小寫的 'c' 代表地震波在核幔邊界（Core-Mantle Boundary）發生反射。"
    },
    {
        q: "Raspberry Pi 自製地震儀可能需要哪些感測器？",
        options: ["溫度感測器", "MPU6050 (加速度計與陀螺儀)", "光敏電阻", "濕度感測器"],
        ans: 1,
        feedback: "正確！MPU6050 包含三軸加速度計，可以偵測地表的微小震動。"
    },
    {
        q: "走時曲線 (Travel-time curve) 可以幫助我們了解什麼？",
        options: ["地震發生的歷史", "斷層的長度", "地球內部的速度構造", "海嘯的高度"],
        ans: 2,
        feedback: "非常好！藉由觀測不同震央距離的地震波到達時間，可以推算出地球內部的波速分佈及構造。"
    }
];

let currentQuiz = 0;
let score = 0;

const quizQuestionEl = document.getElementById('quiz-question');
const quizOptionsEl = document.getElementById('quiz-options');
const quizFeedbackEl = document.getElementById('quiz-feedback');
const nextQuizBtn = document.getElementById('next-quiz');
const quizScoreEl = document.getElementById('quiz-score');

function loadQuiz() {
    const qData = quizData[currentQuiz];
    quizQuestionEl.innerText = `Q${currentQuiz + 1}: ${qData.q}`;
    quizOptionsEl.innerHTML = '';
    quizFeedbackEl.innerText = '';
    quizFeedbackEl.style.display = 'none';
    nextQuizBtn.style.display = 'none';

    qData.options.forEach((opt, index) => {
        const btn = document.createElement('div');
        btn.classList.add('quiz-option');
        btn.innerText = opt;
        btn.addEventListener('click', () => checkAnswer(index, btn));
        quizOptionsEl.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    const options = quizOptionsEl.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.style.pointerEvents = 'none');

    const correctIndex = quizData[currentQuiz].ans;

    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        score++;
        quizFeedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${quizData[currentQuiz].feedback}`;
        quizFeedbackEl.style.color = '#28a745';
    } else {
        btnElement.classList.add('wrong');
        options[correctIndex].classList.add('correct');
        quizFeedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> 答錯囉！${quizData[currentQuiz].feedback}`;
        quizFeedbackEl.style.color = '#dc3545';
    }

    quizFeedbackEl.style.display = 'block';
    
    if (currentQuiz < quizData.length - 1) {
        nextQuizBtn.style.display = 'inline-block';
        nextQuizBtn.innerText = "下一題";
    } else {
        nextQuizBtn.style.display = 'inline-block';
        nextQuizBtn.innerText = "查看結果";
    }
}

if (nextQuizBtn) {
    nextQuizBtn.addEventListener('click', () => {
        if (currentQuiz < quizData.length - 1) {
            currentQuiz++;
            loadQuiz();
        } else {
            quizQuestionEl.innerText = "🎉 測驗結束！";
            quizOptionsEl.innerHTML = '';
            quizFeedbackEl.style.display = 'none';
            nextQuizBtn.style.display = 'none';
            quizScoreEl.innerText = `你的總分：${score} / ${quizData.length}`;
            quizScoreEl.style.display = 'block';
            
            // Add restart button
            const restartBtn = document.createElement('button');
            restartBtn.className = 'btn btn-outline';
            restartBtn.style.marginTop = '15px';
            restartBtn.innerText = '再測一次';
            restartBtn.onclick = () => {
                currentQuiz = 0;
                score = 0;
                quizScoreEl.style.display = 'none';
                restartBtn.remove();
                loadQuiz();
            };
            quizScoreEl.parentNode.appendChild(restartBtn);
        }
    });
}

if (quizQuestionEl) loadQuiz();

// Back to Top and Navbar scroll effect
const backToTopBtn = document.getElementById('back-to-top');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
