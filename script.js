// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    updateThemeIcon(savedTheme);
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (theme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
}

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if(navLinks.classList.contains('active')){
                icon.classList.replace('fa-bars', 'fa-xmark');
            }else{
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        }
    });
}

if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if(icon) icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    });
}

// Timeline Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const timelineItems = document.querySelectorAll('.timeline-item');

if (filterBtns.length > 0) {
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
}

// Assignment Search
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const assignmentCards = document.querySelectorAll('.assignment-card');

function filterAssignments() {
    if (!searchInput) return;
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

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', filterAssignments);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterAssignments();
    });
}

// Random Harvest
const harvestBtn = document.getElementById('harvest-btn');
const harvestText = document.getElementById('harvest-text');
const harvests = [
    "學會了繪製立體的震源機制球！",
    "理解了 P波/S波 的傳遞原理",
    "親手接線並啟用了 MPU6050 感測器！",
    "實作了 STA/LTA 地震觸發演算法",
    "成功將地震速報推播到 Discord！",
    "克服了 Raspberry Pi 掉壓與驅動程式問題",
    "體驗了將 Python 程式部署到雲端 (Hugging Face)"
];

if (harvestBtn && harvestText) {
    harvestBtn.addEventListener('click', () => {
        harvestText.style.opacity = 0;
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * harvests.length);
            harvestText.innerText = harvests[randomIndex];
            harvestText.style.opacity = 1;
        }, 300);
    });
}

// Copy iframe code
const copyIframeBtn = document.getElementById('copy-iframe');
if (copyIframeBtn) {
    copyIframeBtn.addEventListener('click', () => {
        const iframeCode = `<iframe src="https://hf.space/embed/your-username/your-space-name" width="100%" height="450" frameborder="0"></iframe>`;
        navigator.clipboard.writeText(iframeCode).then(() => {
            const originalText = copyIframeBtn.innerHTML;
            copyIframeBtn.innerHTML = '<i class="fa-solid fa-check"></i> 複製成功！';
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
        q: "P 波與 S 波的主要差異是什麼？",
        options: ["P波是橫波，S波是縱波", "P波速度較快，S波速度較慢", "P波無法在液體中傳播", "S波造成的破壞通常較小"],
        ans: 1,
        feedback: "答對了！P波（Primary wave）是縱波，速度最快；S波（Secondary wave）是橫波，速度較慢且無法在液體中傳播。"
    },
    {
        q: "震度與規模可以用來表示什麼？",
        options: ["規模代表破壞程度", "震度代表感受程度", "規模會隨觀測點而不同", "規模與波速成正比"],
        ans: 1,
        feedback: "沒錯！震度是各地感受到的搖晃程度，規模則是地震釋放能量的大小（只有一個值）。"
    },
    {
        q: "ScS 波中的 c 代表什麼意思？",
        options: ["Core (地核)", "Crust (地殼)", "CMB (地函地核邊界)", "Compression (壓力波)"],
        ans: 2,
        feedback: "沒錯，英文中的 'c' 代表該波在 CMB（Core-Mantle Boundary）反射。"
    },
    {
        q: "Raspberry Pi 自製地震觀測站中，通常使用哪一個感測器？",
        options: ["溫度感測器", "MPU6050 (加速度計與陀螺儀)", "超音波感測器", "濕度感測器"],
        ans: 1,
        feedback: "答對了！MPU6050 內含三軸加速度計，可以用來偵測晃動。"
    },
    {
        q: "走時曲線 (Travel-time curve) 可以用來推估什麼？",
        options: ["地震的震源機制", "震央的距離", "各層介質的速度結構與深度", "斷層的剪切應力"],
        ans: 2,
        feedback: "非常棒！藉由觀測不同測站所記錄到之震波抵達時間，可以反推地下介質的波速結構。"
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
        quizFeedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> 答錯了！${quizData[currentQuiz].feedback}`;
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
            quizQuestionEl.innerText = "測驗結束！";
            quizOptionsEl.innerHTML = '';
            quizFeedbackEl.style.display = 'none';
            nextQuizBtn.style.display = 'none';
            quizScoreEl.innerText = `您的總得分：${score} / ${quizData.length}`;
            quizScoreEl.style.display = 'block';
            
            // Add restart button
            const restartBtn = document.createElement('button');
            restartBtn.className = 'btn btn-outline';
            restartBtn.style.marginTop = '15px';
            restartBtn.innerText = '重新測驗';
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

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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

// --- Interactive Widgets Logic ---

// 1. Reading Progress Bar
document.addEventListener('scroll', () => {
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        
        // Calculate percentage
        const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    }
});

// 2. Accordion
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Toggle active class on parent
            this.parentElement.classList.toggle('active');
        });
    });
});

// --- Seismic Wave Interactive Feature ---
document.addEventListener('DOMContentLoaded', () => {
    const seismicArea = document.getElementById('seismic-area');
    const rippleContainer = document.getElementById('ripple-container');
    
    if (seismicArea && rippleContainer) {
        const harvests = [
            "學會了繪製立體的震源機制球！",
            "理解了 P波/S波 的傳遞原理",
            "親手接線並啟用了 MPU6050 感測器！",
            "實作了 STA/LTA 地震觸發演算法",
            "成功將地震速報推播到 Discord！",
            "克服了 Raspberry Pi 掉壓與驅動程式問題",
            "體驗了將 Python 程式部署到雲端 (Hugging Face)",
            "參訪了國家地震工程研究中心",
            "學會了如何把作業變成精美的互動網頁！",
            "發現了 nmcli 指令的強大與盲點 (差點連到同學的手機!)"
        ];

        seismicArea.addEventListener('click', (e) => {
            // Get click coordinates relative to the container
            const rect = seismicArea.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Remove previous ripples/text if any (keep it clean)
            rippleContainer.innerHTML = '';

            // 1. Create Ripple
            const ripple = document.createElement('div');
            ripple.classList.add('seismic-ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            
            // 2. Create inner ripple for double-wave effect
            const ripple2 = document.createElement('div');
            ripple2.classList.add('seismic-ripple');
            ripple2.style.left = x + 'px';
            ripple2.style.top = y + 'px';
            ripple2.style.width = '60px';
            ripple2.style.height = '60px';
            ripple2.style.animationDelay = '0.3s';

            // 3. Create Harvest Text
            const harvestText = document.createElement('div');
            harvestText.classList.add('harvest-reveal');
            harvestText.style.left = x + 'px';
            harvestText.style.top = (y - 30) + 'px'; // slightly above center
            
            const randomHarvest = harvests[Math.floor(Math.random() * harvests.length)];
            harvestText.innerHTML = `<i class="fa-solid fa-graduation-cap" style="color:var(--primary-color);"></i> ` + randomHarvest;

            // Append to container
            rippleContainer.appendChild(ripple);
            rippleContainer.appendChild(ripple2);
            rippleContainer.appendChild(harvestText);
            
            // Remove ripple elements after animation to prevent DOM bloat
            setTimeout(() => {
                if (ripple.parentElement) ripple.remove();
                if (ripple2.parentElement) ripple2.remove();
            }, 3000);
        });
    }
});
