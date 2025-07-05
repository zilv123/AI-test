// 网站主要功能脚本
class WebsiteManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupImageLazyLoading();
        this.addLoadingStates();
        this.setupKeyboardNavigation();
        this.initDateTime();
        this.initQuote();
        this.initMusicPlayer();
        this.initGame();
        this.updateVisitorCount();
        this.initSocialStats();
    }

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupFeatureCards();
            this.setupImageErrorHandling();
            this.addScrollAnimations();
        });

        // 键盘事件监听
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');

        featureCards.forEach((card) => {
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');

            // 为每个卡片添加点击事件
            card.addEventListener('click', () => {
                if (card.classList.contains('music-card')) {
                    this.showVideoModal();
                } else if (card.classList.contains('personal-card')) {
                    this.showUpdateStatus();
                } else if (card.classList.contains('basketball-card')) {
                    this.showBasketballContent();
                } else if (card.classList.contains('dance-card')) {
                    this.showDanceContent();
                }
            });

            // 添加悬停音效（可选）
            card.addEventListener('mouseenter', () => {
                this.playHoverSound();
            });
        });

        // 初始化统计数字动画
        this.setupStatsAnimation();
    }

    setupImageLazyLoading() {
        const moyuImage = document.querySelector('.moyu-image');
        if (moyuImage) {
            // 添加加载状态
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'image-loading';
            loadingDiv.innerHTML = '<div class="loading-spinner"></div><p>加载中...</p>';
            moyuImage.parentNode.insertBefore(loadingDiv, moyuImage);

            moyuImage.addEventListener('load', () => {
                loadingDiv.style.display = 'none';
                moyuImage.style.opacity = '1';
            });

            moyuImage.addEventListener('error', () => {
                loadingDiv.innerHTML = '<p>图片加载失败，请刷新重试</p>';
                loadingDiv.className = 'image-error';
            });
        }
    }

    setupImageErrorHandling() {
        const moyuImage = document.querySelector('.moyu-image');
        if (moyuImage) {
            moyuImage.onerror = () => {
                moyuImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvueJh+WKoOi9veWksei0pSAtIOivt+WIt+aWsOmHjeivlTwvdGV4dD48L3N2Zz4=';
                moyuImage.alt = '图片加载失败';
            };
        }
    }

    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        const animateElements = document.querySelectorAll('.feature-card, .moyu-card, .stat-card');
        animateElements.forEach(el => {
            el.classList.add('animate-element');
            observer.observe(el);
        });
    }

    setupKeyboardNavigation() {
        const focusableElements = document.querySelectorAll('[tabindex="0"], button, [role="button"]');
        focusableElements.forEach(el => {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });
    }

    addLoadingStates() {
        // 为外部脚本添加加载状态
        const externalScript = document.querySelector('script[src*="meihua"]');
        if (externalScript) {
            externalScript.addEventListener('error', () => {
                console.warn('梅花特效加载失败');
            });
        }
    }

    showVideoModal() {
        const modal = this.createModal('video-modal', {
            title: '🎵 鸡你太美 - 经典原版',
            content: `
                <div class="video-container">
                    <div class="video-loading">
                        <div class="loading-spinner"></div>
                        <p>视频加载中...</p>
                    </div>
                    <iframe 
                        src="https://player.bilibili.com/player.html?bvid=BV1J4411v7g6&page=1&autoplay=0" 
                        scrolling="no" 
                        border="0" 
                        frameborder="no" 
                        framespacing="0" 
                        allowfullscreen="true"
                        onload="this.previousElementSibling.style.display='none'">
                    </iframe>
                </div>
                <p class="video-desc">经典永流传，iKUN必看！🏀</p>
            `
        });

        this.showModal(modal);
    }

    showUpdateStatus() {
        const updates = [
            '🎤 正在准备新的音乐作品',
            '🏀 篮球技能持续精进中',
            '💃 舞蹈动作不断创新',
            '📱 敬请关注最新动态！'
        ];

        const modal = this.createModal('status-modal', {
            title: '🌟 个人动态',
            content: `
                <div class="status-body">
                    <div class="loading-animation">
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                    </div>
                    <h4>持续更新中...</h4>
                    ${updates.map(update => `<p>${update}</p>`).join('')}
                    <div class="update-time">
                        最后更新：${new Date().toLocaleString('zh-CN')}
                    </div>
                </div>
            `,
            className: 'status-content'
        });

        this.showModal(modal);
    }

    createModal(type, options) {
        const modal = document.createElement('div');
        modal.className = type;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'modal-title');

        const contentClass = options.className || 'modal-content';
        modal.innerHTML = `
            <div class="${contentClass}">
                <div class="modal-header">
                    <h3 id="modal-title">${options.title}</h3>
                    <button class="close-btn" aria-label="关闭">&times;</button>
                </div>
                ${options.content}
            </div>
        `;

        return modal;
    }

    showModal(modal) {
        document.body.appendChild(modal);
        
        // 焦点管理
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.focus();

        // 事件绑定
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        // 添加显示动画
        requestAnimationFrame(() => {
            modal.classList.add('modal-show');
        });
    }

    closeModal(modal) {
        modal.classList.add('modal-hide');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.video-modal, .status-modal, .basketball-modal, .dance-modal');
        modals.forEach(modal => this.closeModal(modal));
    }

    // 新增内容展示方法
    showBasketballContent() {
        const modal = this.createModal('basketball-modal', {
            title: '🏀 篮球技巧展示',
            content: `
                <div class="content-gallery">
                    <div class="gallery-item">
                        <div class="skill-demo">
                            <h4>🎯 精准投篮</h4>
                            <p>展示各种投篮技巧和训练方法</p>
                            <div class="skill-stats">
                                <span>命中率: 85%</span>
                                <span>三分球: 78%</span>
                            </div>
                        </div>
                    </div>
                    <div class="gallery-item">
                        <div class="skill-demo">
                            <h4>⚡ 运球技巧</h4>
                            <p>花式运球和突破技术展示</p>
                            <div class="skill-stats">
                                <span>速度: 优秀</span>
                                <span>控球: 精准</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="content-desc">篮球不仅是运动，更是艺术！🏀</p>
            `,
            className: 'content-modal-content'
        });
        this.showModal(modal);
    }

    showDanceContent() {
        const modal = this.createModal('dance-modal', {
            title: '💃 舞蹈表演精选',
            content: `
                <div class="content-gallery">
                    <div class="gallery-item">
                        <div class="dance-style">
                            <h4>🎭 现代舞</h4>
                            <p>融合现代元素的创新编舞</p>
                            <div class="dance-tags">
                                <span class="tag">流行</span>
                                <span class="tag">创新</span>
                            </div>
                        </div>
                    </div>
                    <div class="gallery-item">
                        <div class="dance-style">
                            <h4>🕺 街舞风格</h4>
                            <p>充满活力的街头舞蹈表演</p>
                            <div class="dance-tags">
                                <span class="tag">动感</span>
                                <span class="tag">节奏</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="content-desc">用舞蹈诠释音乐的灵魂！💫</p>
            `,
            className: 'content-modal-content'
        });
        this.showModal(modal);
    }

    // 统计数字动画
    setupStatsAnimation() {
        const statCards = document.querySelectorAll('.stat-card.interactive');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statCards.forEach(card => {
            observer.observe(card);

            // 添加点击事件
            card.addEventListener('click', () => {
                this.showStatDetail(card.dataset.stat);
            });
        });
    }

    animateStatNumber(card) {
        const numberElement = card.querySelector('.stat-number');
        const target = parseInt(numberElement.dataset.target);
        const duration = 2000;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // 使用缓动函数
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);

            numberElement.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    showStatDetail(statType) {
        const statInfo = {
            fans: { title: '👥 粉丝互动', desc: '感谢每一位iKUN的支持！' },
            songs: { title: '🎵 音乐作品', desc: '每首歌都承载着真挚的情感' },
            videos: { title: '📹 视频内容', desc: '记录成长路上的每个精彩瞬间' },
            awards: { title: '🏆 荣誉成就', desc: '这些奖项属于所有支持我的人' }
        };

        const info = statInfo[statType];
        if (info) {
            this.showNotification(info.title, info.desc);
        }
    }

    showNotification(title, message) {
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.innerHTML = `
            <div class="notification-header">${title}</div>
            <div class="notification-message">${message}</div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    playHoverSound() {
        // 可以添加悬停音效，这里用简单的视觉反馈代替
        // 实际项目中可以播放音频文件
    }

    // 时间日期功能
    initDateTime() {
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 1000);
    }

    updateDateTime() {
        const now = new Date();
        const timeElement = document.getElementById('currentTime');
        const dateElement = document.getElementById('currentDate');
        const greetingElement = document.getElementById('greetingText');

        if (timeElement) {
            timeElement.textContent = now.toLocaleTimeString('zh-CN', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        }

        if (greetingElement) {
            const hour = now.getHours();
            let greeting = '';
            if (hour < 6) greeting = '深夜好，夜猫子！🌙';
            else if (hour < 12) greeting = '早上好，iKUN！☀️';
            else if (hour < 18) greeting = '下午好，iKUN！🌤️';
            else greeting = '晚上好，iKUN！🌆';

            greetingElement.textContent = greeting;
        }
    }

    // 每日一言功能
    initQuote() {
        this.loadQuote();
    }

    async loadQuote() {
        try {
            const response = await fetch('https://v1.hitokoto.cn/?c=i&c=k');
            const data = await response.json();

            const quoteElement = document.getElementById('dailyQuote');
            const authorElement = document.getElementById('quoteAuthor');

            if (quoteElement && authorElement) {
                quoteElement.textContent = data.hitokoto;
                authorElement.textContent = `— ${data.from}`;
            }
        } catch (error) {
            console.log('加载每日一言失败:', error);
            const quoteElement = document.getElementById('dailyQuote');
            const authorElement = document.getElementById('quoteAuthor');

            if (quoteElement && authorElement) {
                quoteElement.textContent = '只因你太美，baby！';
                authorElement.textContent = '— 蔡徐坤';
            }
        }
    }

    refreshQuote() {
        const quoteElement = document.getElementById('dailyQuote');
        const authorElement = document.getElementById('quoteAuthor');

        if (quoteElement && authorElement) {
            quoteElement.textContent = '加载中...';
            authorElement.textContent = '— 加载中';
        }

        setTimeout(() => this.loadQuote(), 500);
    }

    // 音乐播放器功能
    initMusicPlayer() {
        this.isPlaying = false;
        this.currentProgress = 35;
        this.updateMusicProgress();
    }

    toggleMusic() {
        this.isPlaying = !this.isPlaying;
        const playIcon = document.getElementById('playIcon');

        if (playIcon) {
            playIcon.textContent = this.isPlaying ? '⏸️' : '▶️';
        }

        if (this.isPlaying) {
            this.startMusicProgress();
        } else {
            this.stopMusicProgress();
        }
    }

    startMusicProgress() {
        this.musicInterval = setInterval(() => {
            this.currentProgress += 0.5;
            if (this.currentProgress >= 100) {
                this.currentProgress = 0;
                this.toggleMusic(); // 自动停止
            }
            this.updateMusicProgress();
        }, 200);
    }

    stopMusicProgress() {
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
        }
    }

    updateMusicProgress() {
        const progressElement = document.getElementById('musicProgress');
        if (progressElement) {
            progressElement.style.width = `${this.currentProgress}%`;
        }
    }

    // 访问统计功能
    updateVisitorCount() {
        const countElement = document.getElementById('visitorCount');
        if (countElement) {
            // 模拟访问数据，实际项目中应该从后端获取
            const baseCount = 1024;
            const randomAdd = Math.floor(Math.random() * 100);
            countElement.textContent = baseCount + randomAdd;
        }

        // 更新天气信息
        this.updateWeatherInfo();
    }

    updateWeatherInfo() {
        const weatherElement = document.getElementById('weatherInfo');
        if (weatherElement) {
            const weathers = [
                '🌤️ 天气不错',
                '☀️ 阳光明媚',
                '🌙 夜色温柔',
                '🌈 心情很好',
                '⭐ 星光璀璨'
            ];
            const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
            weatherElement.textContent = randomWeather;
        }
    }

    // 互动游戏功能
    initGame() {
        this.gameScore = 0;
        this.highScore = localStorage.getItem('highScore') || 0;
        this.gameActive = false;
        this.updateGameScore();
    }

    startGame() {
        if (this.gameActive) return;

        this.gameActive = true;
        this.gameScore = 0;
        this.updateGameScore();

        const startButton = document.querySelector('.game-start');
        const target = document.getElementById('gameTarget');

        if (startButton) {
            startButton.textContent = '游戏中...';
            startButton.disabled = true;
        }

        // 游戏持续30秒
        this.gameTimer = setTimeout(() => {
            this.endGame();
        }, 30000);

        // 开始移动目标
        this.moveTarget();

        // 添加点击事件
        if (target) {
            target.addEventListener('click', this.hitTarget.bind(this));
        }
    }

    moveTarget() {
        if (!this.gameActive) return;

        const target = document.getElementById('gameTarget');
        const gameArea = document.getElementById('gameArea');

        if (target && gameArea) {
            const areaRect = gameArea.getBoundingClientRect();
            const targetSize = 40;

            const maxX = areaRect.width - targetSize;
            const maxY = areaRect.height - targetSize;

            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;

            target.style.left = `${newX}px`;
            target.style.top = `${newY}px`;
            target.style.transform = 'none';
        }

        // 每1-3秒移动一次
        const nextMove = 1000 + Math.random() * 2000;
        setTimeout(() => this.moveTarget(), nextMove);
    }

    hitTarget(event) {
        if (!this.gameActive) return;

        event.preventDefault();
        this.gameScore += 10;
        this.updateGameScore();

        const target = event.target;
        target.classList.add('clicked');

        // 移除动画类
        setTimeout(() => {
            target.classList.remove('clicked');
        }, 300);

        // 立即移动到新位置
        this.moveTarget();
    }

    endGame() {
        this.gameActive = false;

        if (this.gameTimer) {
            clearTimeout(this.gameTimer);
        }

        // 更新最高分
        if (this.gameScore > this.highScore) {
            this.highScore = this.gameScore;
            localStorage.setItem('highScore', this.highScore);
            this.showNotification('🎉 新纪录！', `恭喜你创造了新的最高分：${this.highScore}分！`);
        }

        this.updateGameScore();

        const startButton = document.querySelector('.game-start');
        if (startButton) {
            startButton.textContent = '开始游戏';
            startButton.disabled = false;
        }

        // 重置目标位置
        const target = document.getElementById('gameTarget');
        if (target) {
            target.style.left = '50%';
            target.style.top = '50%';
            target.style.transform = 'translate(-50%, -50%)';
        }
    }

    updateGameScore() {
        const scoreElement = document.getElementById('gameScore');
        const highScoreElement = document.getElementById('highScore');

        if (scoreElement) {
            scoreElement.textContent = this.gameScore;
        }

        if (highScoreElement) {
            highScoreElement.textContent = this.highScore;
        }
    }

    // 社交平台统计动画
    initSocialStats() {
        const fanNumbers = document.querySelectorAll('.fan-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateFanNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });

        fanNumbers.forEach(number => {
            observer.observe(number);
        });

        // 为社交链接添加点击统计
        this.setupSocialTracking();
    }

    animateFanNumber(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2500;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // 使用缓动函数
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOutCubic);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    setupSocialTracking() {
        const socialLinks = document.querySelectorAll('.social-link');

        socialLinks.forEach(link => {
            link.addEventListener('click', () => {
                const platform = this.getSocialPlatform(link);
                this.trackSocialClick(platform);

                // 添加点击效果
                this.addClickEffect(link);
            });

            // 添加悬停效果
            link.addEventListener('mouseenter', () => {
                this.addHoverEffect(link);
            });
        });
    }

    getSocialPlatform(link) {
        if (link.classList.contains('weibo')) return '微博';
        if (link.classList.contains('bilibili')) return '哔哩哔哩';
        if (link.classList.contains('douyin')) return '抖音';
        if (link.classList.contains('instagram')) return 'Instagram';
        if (link.classList.contains('netease')) return '网易云音乐';
        if (link.classList.contains('qq-music')) return 'QQ音乐';
        if (link.classList.contains('xiaohongshu')) return '小红书';
        if (link.classList.contains('email')) return '邮箱';
        return '未知平台';
    }

    trackSocialClick(platform) {
        console.log(`用户点击了: ${platform}`);

        // 显示感谢通知
        const messages = [
            `感谢关注我的${platform}！💝`,
            `欢迎来到我的${platform}世界！🌟`,
            `${platform}见，iKUN！✨`,
            `在${platform}等你哦！🎵`
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showNotification('🎉 谢谢支持', randomMessage);
    }

    addClickEffect(element) {
        element.style.transform = 'translateY(-8px) scale(1.05)';

        setTimeout(() => {
            element.style.transform = '';
        }, 200);
    }

    addHoverEffect(element) {
        const icon = element.querySelector('.social-icon');
        if (icon) {
            // 为不同平台添加不同的悬停动画
            const platform = this.getSocialPlatform(element);

            switch(platform) {
                case '微博':
                    icon.style.animation = 'bounce 0.6s ease';
                    break;
                case '哔哩哔哩':
                    icon.style.animation = 'pulse 0.8s ease';
                    break;
                case '抖音':
                    icon.style.animation = 'shake 0.6s ease';
                    break;
                case 'Instagram':
                    icon.style.animation = 'spin 0.8s ease';
                    break;
                default:
                    icon.style.animation = 'float 1s ease';
            }

            // 清除动画
            setTimeout(() => {
                icon.style.animation = 'float 3s ease-in-out infinite';
            }, 1000);
        }
    }
}

// 初始化网站管理器
const websiteManager = new WebsiteManager();

// 性能监控
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`页面加载时间: ${loadTime}ms`);
    });
}

// PWA 支持和 Service Worker 注册
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);

                // 检查更新
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // 显示更新提示
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// 显示更新通知
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>🎉 网站有新版本可用！</span>
            <button onclick="updateApp()" class="update-btn">立即更新</button>
            <button onclick="dismissUpdate()" class="dismiss-btn">稍后</button>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// 更新应用
function updateApp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then((registration) => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
            }
        });
    }
}

// 忽略更新
function dismissUpdate() {
    const notification = document.querySelector('.update-notification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }
}

// 安装提示
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
});

function showInstallPrompt() {
    const installBanner = document.createElement('div');
    installBanner.className = 'install-banner';
    installBanner.innerHTML = `
        <div class="banner-content">
            <span>📱 将网站添加到主屏幕，获得更好的体验！</span>
            <button onclick="installApp()" class="install-btn">安装</button>
            <button onclick="dismissInstall()" class="dismiss-btn">不了</button>
        </div>
    `;
    document.body.appendChild(installBanner);

    setTimeout(() => {
        installBanner.classList.add('show');
    }, 2000); // 2秒后显示
}

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('用户接受了安装提示');
            }
            deferredPrompt = null;
            dismissInstall();
        });
    }
}

function dismissInstall() {
    const banner = document.querySelector('.install-banner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 300);
    }
}
