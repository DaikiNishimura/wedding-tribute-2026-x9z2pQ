window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const heroText = document.querySelector('.fade-in-text');

    // 1. オープニング演出
    setTimeout(() => {
        if (loader) loader.classList.add('loaded');
        
        setTimeout(() => {
            if (heroText) heroText.classList.add('visible');
        }, 500);
    }, 2500); 
});

// スクロール時のパララックス
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroPhoto = document.querySelector('.hero-photo');
    if (heroPhoto) {
        heroPhoto.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// スライダー機能
function startHeroSlider() {
    const slides = document.querySelectorAll('.slider-img');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// 全てのメイン処理をDOMContentLoaded内に統合
document.addEventListener('DOMContentLoaded', () => {
    startHeroSlider();

    // 1. スクロール監視（フェードイン用）
    const observeAnimation = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // 一度表示されたら監視を外すことで動作を軽くする
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.animate-trigger').forEach(el => {
            observer.observe(el);
        });
    };
    observeAnimation();

    // 2. カードの裏返し（クリックイベント）
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('is-flipped');
        });
    });

    // 3. 動画終了後のメッセージ
    const video = document.getElementById('highlight-video');
    const thanksMessage = document.getElementById('video-thanks-message');
    if (video && thanksMessage) {
        video.addEventListener('ended', () => {
            thanksMessage.classList.add('video-thanks-visible');
        });
    }

    // 4. BGMリストの開閉
    const toggleBtn = document.getElementById('toggle-bgm');
    const bgmContainer = document.getElementById('bgm-list-container');
    if (toggleBtn && bgmContainer) {
        toggleBtn.addEventListener('click', () => {
            bgmContainer.classList.toggle('show');
            toggleBtn.innerHTML = bgmContainer.classList.contains('show') ? 
                '<i class="fas fa-chevron-up"></i> 閉じる' : '<i class="fas fa-music"></i> 披露宴のBGMリストを見る';
        });
    }

    // 5. BGMモーダル処理
    const bgmModal = document.getElementById('bgm-modal');
    const closeBgm = document.querySelector('.close-bgm-modal');
    if (bgmModal && closeBgm) {
        document.querySelectorAll('.bgm-item').forEach(item => {
            item.addEventListener('click', () => {
                const scene = item.getAttribute('data-scene');
                const title = item.getAttribute('data-music');
                const desc = item.getAttribute('data-desc');
                const img = item.getAttribute('data-img');

                document.getElementById('bgm-modal-scene').innerText = scene;
                document.getElementById('bgm-modal-title').innerText = title;
                document.getElementById('bgm-modal-desc').innerText = desc;
                document.getElementById('bgm-modal-bg').style.backgroundImage = `url(${img})`;
                bgmModal.style.display = 'block';
            });
        });

        closeBgm.onclick = () => bgmModal.style.display = 'none';
        window.onclick = (event) => {
            if (event.target == bgmModal) bgmModal.style.display = 'none';
        };
    }

    // 6. 以前のモーダル処理（名前リストなどがある場合）
    const commonModal = document.getElementById('message-modal');
    const closeCommon = document.querySelector('.close-btn');
    if (commonModal && closeCommon) {
        closeCommon.onclick = () => commonModal.style.display = 'none';
        // window.onclickはBGMモーダル側と統合するため修正
    }

    // --- 投稿処理の追記 ---
    const submitBtn = document.getElementById('submit-message');
    const guestNameInput = document.getElementById('guest-name');
    const guestMessageInput = document.getElementById('guest-message');

    if (submitBtn && guestNameInput && guestMessageInput) {
        submitBtn.addEventListener('click', () => {
            const name = guestNameInput.value.trim();
            const text = guestMessageInput.value.trim();

            if (name === "" || text === "") {
                alert("お名前とメッセージを入力してください。");
                return;
            }

            // Firebaseのデータベース参照（index.htmlで定義されている database を使用）
            if (typeof database !== 'undefined') {
                const messagesRef = ref(database, 'guest_messages');
                push(messagesRef, {
                    name: name,
                    text: text,
                    timestamp: Date.now()
                }).then(() => {
                    // 投稿成功時にフォームを空にする
                    guestNameInput.value = "";
                    guestMessageInput.value = "";
                    alert("メッセージを投稿しました！");
                }).catch((error) => {
                    console.error("投稿エラー:", error);
                    alert("投稿に失敗しました。時間をおいて再度お試しください。");
                });
            } else {
                console.error("Firebase database が初期化されていません。");
            }
        });
    }
});