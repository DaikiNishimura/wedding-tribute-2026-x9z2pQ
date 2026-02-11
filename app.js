function startHeroSlider() {
  const slides = document.querySelectorAll('.slider-img');
  let currentSlide = 0;

  setInterval(() => {
    // 現在の画像から active クラスを消す
    slides[currentSlide].classList.remove('active');

    // 次のスライド番号へ（3枚なので 0→1→2→0... とループ）
    currentSlide = (currentSlide + 1) % slides.length;

    // 次の画像に active クラスを付与
    slides[currentSlide].classList.add('active');
  }, 4000); // 4秒ごとに実行
}

// ページ読み込み時に実行
window.addEventListener('DOMContentLoaded', startHeroSlider);

// createFloatingHeart関数の中身を少し変更
window.createFloatingHeart = function() {
  const heart = document.createElement('span');
  heart.innerText = '❤';
  heart.className = 'floating-heart';
  
  // 左右に少し散らばるように
  const x = (Math.random() - 0.5) * 150 + 'px';
  heart.style.setProperty('--x', x);
  
  // ボタンの真ん中から発生させる
  likeBtn.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 800);
}

function createPetal() {
  const container = document.getElementById('flower-container');
  const petal = document.createElement('div');
  petal.className = 'petal';
  
  // ランダムな設定
  const size = Math.random() * 10 + 10 + 'px'; // 10px~20px
  const left = Math.random() * 100 + 'vw';     // 画面のどこから
  const duration = Math.random() * 3 + 4 + 's'; // 4s~7sで落ちる
  const delay = Math.random() * 5 + 's';
  
  petal.style.width = size;
  petal.style.height = size;
  petal.style.left = left;
  petal.style.animationDuration = duration;
  petal.style.animationDelay = delay;
  
  container.appendChild(petal);
  
  // アニメーションが終わったら要素を削除（メモリ節約）
  setTimeout(() => {
    petal.remove();
  }, (parseFloat(duration) + parseFloat(delay)) * 1000);
}

// 0.3秒ごとに花びらを生成
setInterval(createPetal, 300);

// 「監視」する設定
const observerOptions = {
  root: null, // ビューポート（画面）を基準にする
  rootMargin: '0px',
  threshold: 0.2 // 要素が20%見えたら実行
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // 画面内に入ったらクラスを追加
    if (entry.isIntersecting) {
      entry.target.classList.add('is-show');
    }
  });
}, observerOptions);


// 動画終了後に表示するメッセージ
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('highlight-video');
    const thanksMessage = document.getElementById('video-thanks-message');

    if (video && thanksMessage) {
        // 動画が終了した時のイベント
        video.addEventListener('ended', () => {
            // クラスを付け替えて表示させる
            thanksMessage.classList.add('video-thanks-visible');
        });
    }
});

// BGMリストの開閉
const toggleBtn = document.getElementById('toggle-bgm');
const bgmContainer = document.getElementById('bgm-list-container');

toggleBtn.addEventListener('click', () => {
    bgmContainer.classList.toggle('show');
    toggleBtn.innerHTML = bgmContainer.classList.contains('show') ? 
        '<i class="fas fa-chevron-up"></i> 閉じる' : '<i class="fas fa-music"></i> 披露宴のBGMリストを見る';
});

// 各曲をクリックした時のポップアップ処理
const bgmItems = document.querySelectorAll('.bgm-item');
const bgmModal = document.getElementById('bgm-modal');
const closeBgm = document.querySelector('.close-bgm-modal');

bgmItems.forEach(item => {
    item.addEventListener('click', () => {
        // data属性から情報を取得
        const scene = item.getAttribute('data-scene');
        const title = item.getAttribute('data-music');
        const desc = item.getAttribute('data-desc');
        const img = item.getAttribute('data-img');

        // モーダルに反映
        document.getElementById('bgm-modal-scene').innerText = scene;
        document.getElementById('bgm-modal-title').innerText = title;
        document.getElementById('bgm-modal-desc').innerText = desc;
        document.getElementById('bgm-modal-bg').style.backgroundImage = `url(${img})`;

        bgmModal.style.display = 'block';
    });
});

closeBgm.onclick = () => bgmModal.style.display = 'none';

// すべての .timeline-content を監視対象にする
document.querySelectorAll('.timeline-content').forEach(item => {
  observer.observe(item);
});

document.querySelectorAll('.card-flip').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
});

// 1. 各ノードにデータを設定（本当はHTMLのdata属性に書いてもOK）
const messages = {
  "彼女": "今までたくさんの思い出をありがとう。これからもよろしく",
  "家族": "いつも黙って支えてくれてありがとう。もっと恩返しができるよう頑張ります。",
  "友人": "何でも話せるみんながいてくれることが、今の僕の支えです。",
  "親戚": "幼い頃から温かく見守ってくれて感謝しています。またお正月にお会いしましょう。",
  "会社の同僚": "いつも刺激をありがとうございます。次はプロジェクトを引っ張る存在になります！"
};

const modal = document.getElementById('message-modal');
const modalName = document.getElementById('modal-name');
const modalText = document.getElementById('modal-text');
const closeBtn = document.querySelector('.close-btn');

// 2. ノードクリック時のイベント
document.querySelectorAll('.node').forEach(node => {
  node.addEventListener('click', () => {
    const name = node.innerText;
    if (messages[name]) {
      modalName.innerText = name;
      modalText.innerText = messages[name];
      modal.style.display = 'block';
    }
  });
});

// 3. 閉じる処理
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = 'none';
};

// script.js の一番上に追記
const password = prompt("合言葉を入力してください（二人の記念日4桁など）");

if (password !== "1225") { // 例：1225が正解の場合
  alert("合言葉が違います。ページを表示できません。");
  document.body.innerHTML = "<h1>認証が必要です</h1>"; // 中身を消す
}

// 3. 特大演出の関数
function launchCelebration() {
  const emojis = ["🎉", "✨", "❤️", "🥂", "🌸", "🎊"];
  
  for (let i = 0; i < 40; i++) { // 40個のエフェクトを降らせる
    setTimeout(() => {
      const emojiEl = document.createElement('div');
      emojiEl.className = 'celebration-emoji';
      emojiEl.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      
      emojiEl.style.left = Math.random() * 100 + 'vw';
      emojiEl.style.fontSize = (Math.random() * 20 + 20) + 'px';
      emojiEl.style.animationDuration = (Math.random() * 2 + 2) + 's';
      
      document.body.appendChild(emojiEl);
      
      // アニメーション終了後に削除
      setTimeout(() => emojiEl.remove(), 4000);
    }, i * 50); // 少しずつずらして降らせる
  }
}