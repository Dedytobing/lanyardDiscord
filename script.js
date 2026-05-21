/* =========================================================
   CONFIG
========================================================= */
let UID = "740796115452166154";
/* =========================================================
   BACKGROUND: SHOOTING STARS
========================================================= */

(function () {
  const wrap = document.getElementById("stars-wrap");
  for (let i = 0; i < 50; i++) {
    const s = document.createElement("div");
    s.classList.add("star");
    s.style.setProperty("--top-offset", `${Math.random() * 150 - 25}vh`);
    s.style.setProperty("--fall-duration", `${Math.random() * 10 + 5}s`);
    s.style.setProperty("--fall-delay", `${Math.random() * 10}s`);
    wrap.appendChild(s);
  }
})();

/* =========================================================
   BACKGROUND: CANVAS STARS
========================================================= */

(function () {
  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");
  let W,
    H,
    stars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 140; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        s: Math.random() * 0.003 + 0.001,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach((s) => {
      s.a += s.s;
      if (s.a > 1) s.s = -s.s;
      if (s.a < 0) s.s = Math.abs(s.s);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,175,255,${s.a * 0.7})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    initStars();
  });
  resize();
  initStars();
  draw();
})();

/* =========================================================
   DISCORD BADGES & GUILD TAG
========================================================= */

async function loadBadges() {
  const badgesContainer = document.getElementById("badges");

  if (!badgesContainer) return;

  try {
    const res = await fetch(`https://dcdn.dstn.to/profile/${UID}`);

    const data = await res.json();

    console.log(data);

    badgesContainer.innerHTML = "";

    // FIX STRUCTURE
    const badges = data.badges || data.data?.badges || [];

    for (const badge of badges) {
      const div = document.createElement("a");

      div.className = "badge";

      div.style.backgroundImage = `url(https://cdn.discordapp.com/badge-icons/${badge.icon}.png)`;

      div.title = badge.description || badge.name || "Badge";

      if (badge.link) {
        div.href = badge.link;
        div.target = "_blank";
      }

      badgesContainer.appendChild(div);
    }
  } catch (err) {
    console.error("Badge error:", err);
  }
}

function updatePrimaryGuild(user) {
  const guild = user.primary_guild;

  const wrap = document.getElementById("guild-tag");

  const badge = document.getElementById("guild-badge");

  const text = document.getElementById("guild-tag-text");

  if (!guild || !guild.tag) {
    wrap.style.display = "none";
    return;
  }

  text.textContent = guild.tag;

  // FIX BADGE URL
  if (guild.badge) {
    badge.src = `https://cdn.discordapp.com/clan-badges/${guild.identity_guild_id}/${guild.badge}.png`;

    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  }

  wrap.style.display = "inline-flex";
}

/* =========================================================
   CUSTOM MUSIC PLAYER
========================================================= */

(function MusicPlayer() {
  const playlist = [
    {
      title: "ABADI - Dendi Nata",
      url: "https://github.com/Dedytobing/lanyardDiscord/raw/refs/heads/main/music/dendi_nata-abadi_indo_version.mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b2736ad512e3c83e1f6e7bf9a7a9",
    },
    {
      title: "Bahagia Lagi - Piche Kota",
      url: "https://github.com/Dedytobing/lanyardDiscord/raw/refs/heads/main/music/piche_kota-bahagia_lagi.mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b2735bd00b369e89c5cbc74d827b",
    },
    {
      title: "Rabun Jauh - Bernadya",
      url: "https://github.com/Dedytobing/lanyardDiscord/raw/refs/heads/main/music/bernadya-rabun_jauh.mp3",
      cover: "https://yt3.googleusercontent.com/KKoXlJneZYhEmJGFM7_9hq3BQfYEKWMJkA-U_MPWRHG3vJ-ujvKKhgz8esbE_C-tEw3Cw32j1y9uUlY=w544-h544-l90-rj",
    },
    {
      title: "Disarankan Di Bandung - Dongker feat. Jason Ranti",
      url: "https://github.com/Dedytobing/lanyardDiscord/raw/refs/heads/main/music/Dongker_feat._Jason_Ranti-Disarankan_Di_Bandung.mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b27335e8c95e427167c4d26899e1",
    },
    {
      title: "Sesi Potret - eńau feat. Ari Lesmana",
      url: "https://github.com/Dedytobing/lanyardDiscord/raw/refs/heads/main/music/enau-sesi_potret_feat_ari_lesmana.mp3",
      cover: "https://i.scdn.co/image/ab67616d0000b273172768978c7f929803ad7e8b",
    },
    {
      title: "Menerima Luka - Natasya Sabella",
      url: "https://github.com/Dedytobing/lanyardDiscord/raw/refs/heads/main/music/natasya_sabella-menerima_luka.mp3",
      cover: "https://yt3.googleusercontent.com/JQdY978-kJFhfITLrfraFGhYQxikHiaYBDs-Ly5Zjj9EufcJ8pZkOk-v1xwKNN8NCQ0BTXGj63_5F6-C=w544-h544-l90-rj",
    },
  ];

  for (let i = playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
  }

  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const volSlider = document.getElementById("vol-slider");
  const trackLabel = document.getElementById("music-track");

  const coverImg = document.getElementById("music-cover-img");
  const musicDisc = document.querySelector(".music-disc");

  const progressBar = document.getElementById("music-progress");
  const progressFill = document.getElementById("music-progress-fill");
  const progressThumb = document.getElementById("music-progress-thumb");
  const timeTooltip = document.getElementById("music-time-tooltip");

  const musicWave = document.querySelector(".music-visualizer");

  let idx = 0;
  let playing = false;
  let isSeeking = false;

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return "0:00";

    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);

    return `${m}:${String(s).padStart(2, "0")}`;
  }

  let audioCtx;
  let analyser;
  let source;
  let dataArray;
  let visualizerBars;

  function setupAudioVisualizer() {
    if (audioCtx) return;

    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();

    analyser.fftSize = 64;

    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    dataArray = new Uint8Array(analyser.frequencyBinCount);
    visualizerBars = document.querySelectorAll(".music-visualizer span");

    animateVisualizer();
  }

  function animateVisualizer() {
    if (!analyser || !visualizerBars) return;

    analyser.getByteFrequencyData(dataArray);

    visualizerBars.forEach((bar, index) => {
      const value = dataArray[index] || 0;
      const height = 8 + (value / 255) * 52;

      bar.style.height = `${height}px`;
      bar.style.opacity = 0.25 + (value / 255) * 0.65;
    });

    requestAnimationFrame(animateVisualizer);
  }

  function resetProgress() {
    if (progressFill) progressFill.style.width = "0%";
    if (progressThumb) progressThumb.style.left = "0%";
    if (timeTooltip) timeTooltip.textContent = "0:00";
  }

  function updateProgress() {
    if (!audio.duration) return;

    const progress = (audio.currentTime / audio.duration) * 100;

    if (progressFill) {
      progressFill.style.width = progress + "%";
    }

    if (progressThumb) {
      progressThumb.style.left = progress + "%";
    }
  }

  function seekAudio(e) {
    if (!audio.duration || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();

    const percent = Math.min(
      Math.max((e.clientX - rect.left) / rect.width, 0),
      1,
    );

    audio.currentTime = percent * audio.duration;

    updateProgress();
  }

  function updateCover(current) {
    if (!coverImg) return;

    if (current.cover) {
      coverImg.src = current.cover;
    } else {
      coverImg.src = "https://cdn-icons-png.flaticon.com/512/3659/3659784.png";
    }
  }

  function load(i, autoPlay = false) {
    idx = (i + playlist.length) % playlist.length;

    const current = playlist[idx];

    audio.src = current.url;
    trackLabel.textContent = current.title;

    updateCover(current);
    resetProgress();

    if (autoPlay || playing) {
      playAudio();
    }
  }

  function playAudio() {
    if (!audio.src) return;

    audio
      .play()
      .then(() => {
        playing = true;

        playBtn.innerHTML = '<i class="fas fa-pause"></i>';

        playBtn.classList.add("active");

        if (musicDisc) {
          musicDisc.classList.add("playing");
        }

        if (musicWave) {
          musicWave.classList.add("playing");
        }
      })
      .catch(() => {
        playing = false;

        playBtn.innerHTML = '<i class="fas fa-play"></i>';

        playBtn.classList.remove("active");

        if (musicDisc) {
          musicDisc.classList.remove("playing");
        }

        if (musicWave) {
          musicWave.classList.remove("playing");
        }
      });
  }

  function pauseAudio() {
    audio.pause();

    playing = false;

    playBtn.innerHTML = '<i class="fas fa-play"></i>';

    playBtn.classList.remove("active");

    if (musicDisc) {
      musicDisc.classList.remove("playing");
    }

    if (musicWave) {
      musicWave.classList.remove("playing");
    }
  }

  function toggle() {
    if (!playing) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  audio.addEventListener("timeupdate", updateProgress);

  audio.addEventListener("ended", () => {
    resetProgress();
    load(idx + 1, true);
  });

  playBtn.addEventListener("click", toggle);

  prevBtn.addEventListener("click", () => {
    load(idx - 1, playing);
  });

  nextBtn.addEventListener("click", () => {
    load(idx + 1, playing);
  });

  volSlider.addEventListener("input", (e) => {
    audio.volume = Number(e.target.value);
  });

  if (progressBar) {
    progressBar.addEventListener("mousemove", (e) => {
      if (!audio.duration || !timeTooltip) return;

      const rect = progressBar.getBoundingClientRect();

      const percent = Math.min(
        Math.max((e.clientX - rect.left) / rect.width, 0),
        1,
      );

      const previewTime = percent * audio.duration;

      timeTooltip.textContent = formatTime(previewTime);

      timeTooltip.style.left = percent * 100 + "%";
    });

    progressBar.addEventListener("mousedown", (e) => {
      isSeeking = true;
      seekAudio(e);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isSeeking) return;
      seekAudio(e);
    });

    window.addEventListener("mouseup", () => {
      isSeeking = false;
    });
  }

  audio.volume = 0.3;
  volSlider.value = 0.3;

  load(0, false);
})();

/* =========================================================
   DISCORD STATUS / LANYARD SOCKET
========================================================= */

(function DiscordStatus() {
  let socket = null;
  let raf = null;
  let reconnectTimer = null;
  let isVisible = true;

  const $ = (id) => document.getElementById(id);

  function setConn(state) {
    const badge = $("conn-badge");
    const text = $("conn-text");
    badge.className = "conn-badge " + state;
    text.textContent = state === "connected" ? "live" : state;
  }

  function formatMs(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0)
      return `${h}:${String(m % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    return `${m}:${String(s % 60).padStart(2, "0")}`;
  }

  function getActivityImageURL(activity, type) {
    const assets = activity.assets;

    if (assets) {
      const key = type === "large" ? assets.large_image : assets.small_image;

      if (key) {
        if (key.startsWith("mp:external/")) {
          return (
            "https://media.discordapp.net/external/" +
            key.slice("mp:external/".length)
          );
        }

        if (activity.application_id) {
          return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${key}.png`;
        }
      }
    }

    // fallback app icon
    if (type === "large" && activity.application_id) {
      return `https://dcdn.dstn.to/app-icons/${activity.application_id}`;
    }

    return null;
  }
  function updatePresence(p) {
    if (!isVisible) return;

    const u = p.discord_user;
    const avatarURL = `https://cdn.discordapp.com/avatars/${UID}/${u.avatar}.png?size=128`;
    /* Avatar */
    const avatarEl = document.getElementById('avatar');

    if (avatarEl.src !== avatarURL) {
      avatarEl.src = avatarURL;
    }

    /* Favicon */
    const favicon =
    document.getElementById('dynamic-favicon');
    favicon.href = avatarURL;
    const decoEl = $("avatar-decoration");

    if (u.avatar_decoration_data?.asset) {
      decoEl.src = `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png?size=240&passthrough=true`;
      decoEl.style.display = "block";
    } else {
      decoEl.style.display = "none";
    }

    document.querySelectorAll(".display-name").forEach((el) => {
      el.textContent = u.global_name || u.username;
    });

    $("wordmark-name").textContent = (
      u.global_name || u.username
    ).toLowerCase();

    $("username").textContent = "@" + u.username;
    updatePrimaryGuild(u);

    const dot = $("status-dot");
    dot.className = "status-dot " + (p.discord_status || "offline");

    const customAct = p.activities.find((a) => a.type === 4);
    const csEl = $("custom-status");
    if (customAct && (customAct.state || customAct.emoji)) {
      let html = "";
      if (customAct.emoji) {
        if (customAct.emoji.id) {
          const ext = customAct.emoji.animated ? "gif" : "png";
          html += `<img src="https://cdn.discordapp.com/emojis/${customAct.emoji.id}.${ext}" alt="" />`;
        } else {
          html += customAct.emoji.name + " ";
        }
      }
      if (customAct.state) html += `<span>${customAct.state}</span>`;
      csEl.innerHTML = html;
    } else {
      csEl.innerHTML = "<span>no status</span>";
    }

    ["desktop", "mobile", "web"].forEach((pl) => {
      const el = $("platform-" + pl);
      el.classList.toggle("active", !!p["active_on_discord_" + pl]);
    });

    const kv = p.kv;
    const kvBlock = $("kv-block");
    const kvPairs = $("kv-pairs");
    if (kv && Object.keys(kv).length > 0) {
      kvPairs.innerHTML = "";
      Object.entries(kv).forEach(([k, v]) => {
        const row = document.createElement("div");
        row.className = "kv-pair";
        row.innerHTML = `<span class="kv-key">${k}</span><span class="kv-val">${v}</span>`;
        kvPairs.appendChild(row);
      });
      kvBlock.style.display = "";
    } else {
      kvBlock.style.display = "none";
    }
    updateSpotify(p);
    updateActivities(p);
  }

  function updateSpotify(p) {
    const content = $("spotify-content");
    const label = $("spotify-label");
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }

    if (p.listening_to_spotify && p.spotify) {
      const sp = p.spotify;
      label.innerHTML =
        '<i class="fab fa-spotify" style="color:var(--spotify);margin-right:5px"></i>spotify';
      content.innerHTML = `
        <div class="spotify-top">
          <img class="album-art" src="${sp.album_art_url}" alt="" />
          <div class="spotify-meta">
            <div class="spotify-tag"><i class="fas fa-music"></i> now playing</div>
            <a class="song-title" href="https://open.spotify.com/track/${sp.track_id}" target="_blank" rel="noopener">${sp.song}</a>
            <div class="artist-name">${sp.artist}</div>
            <div class="album-name">${sp.album}</div>
          </div>
        </div>
        <div class="progress-wrap">
          <div class="progress-times">
            <span id="sp-cur">0:00</span>
            <span id="sp-end">${formatMs(sp.timestamps.end - sp.timestamps.start)}</span>
          </div>
          <div class="progress-track"><div class="progress-fill" id="sp-fill"></div></div>
        </div>
      `;
      tickProgress(sp.timestamps.start, sp.timestamps.end);
    } else {
      label.textContent = "spotify";
      content.innerHTML = `<div class="no-spotify"><i class="fab fa-spotify"></i><span>not listening to anything</span></div>`;
    }
  }

  function tickProgress(start, end) {
    const now = Date.now();
    const elapsed = now - start;
    const total = end - start;
    const pct = Math.min((elapsed / total) * 100, 100);

    const fill = $("sp-fill");
    const cur = $("sp-cur");
    if (fill) fill.style.width = pct + "%";
    if (cur) cur.textContent = formatMs(Math.min(elapsed, total));

    if (pct < 100 && isVisible)
      raf = requestAnimationFrame(() => tickProgress(start, end));
  }

  function updateActivities(p) {
    const acts = p.activities.filter((a) => a.type === 0);
    const container = $("activities-content");
    if (acts.length === 0) {
      container.innerHTML = '<div class="no-activity">no active games</div>';
      return;
    }

    container.innerHTML = "";
    acts.forEach((act) => {
      const largeImg = getActivityImageURL(act, "large");
      const smallImg = getActivityImageURL(act, "small");
      const elapsedId = `elapsed-${act.id || act.name.replace(/\s+/g, "-")}`;

      const elapsed = act.timestamps?.start
        ? `<div class="activity-elapsed" id="${elapsedId}">
          ${formatMs(Date.now() - act.timestamps.start)} elapsed
        </div>`
        : "";

      const imgHTML = largeImg
        ? `<div class="activity-art-wrap">
             <img class="activity-large-img" src="${largeImg}" alt="" title="${act.assets?.large_text || ""}" />
             ${smallImg ? `<img class="activity-small-img" src="${smallImg}" alt="" title="${act.assets?.small_text || ""}" />` : ""}
           </div>`
        : "";

      const el = document.createElement("div");
      el.className = "activity-item";
      el.innerHTML = `
        ${imgHTML}
        <div class="activity-info">
          <div class="activity-name">${act.name}</div>
          ${act.details ? `<div class="activity-details">${act.details}</div>` : ""}
          ${act.state ? `<div class="activity-state">${act.state}</div>` : ""}
          ${elapsed}
        </div>
      `;
      container.appendChild(el);

      if (act.timestamps?.start) {
        const elapsedEl = el.querySelector(".activity-elapsed");

        if (elapsedEl) {
          const updateElapsed = () => {
            elapsedEl.textContent = `${formatMs(Date.now() - act.timestamps.start)} elapsed`;
          };

          updateElapsed();

          const interval = setInterval(() => {
            if (!document.body.contains(el)) {
              clearInterval(interval);
              return;
            }

            updateElapsed();
          }, 1000);
        }
      }
    });
  }

  function connect() {
    if (
      socket &&
      (socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING)
    )
      return;
    setConn("reconnecting");
    socket = new WebSocket("wss://api.lanyard.rest/socket");

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: UID } }));
    });

    socket.addEventListener("message", (e) => {
      const msg = JSON.parse(e.data);
      if (msg.op === 1) {
        setConn("connected");
      }
      if (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") {
        const p = msg.d;
        updatePresence(p);
        try {
          sessionStorage.setItem("lp", JSON.stringify(p));
        } catch (_) {}
      }
    });

    socket.addEventListener("close", () => {
      setConn("reconnecting");
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(connect, 5000);
    });

    socket.addEventListener("error", () => {
      setConn("reconnecting");
      socket.close();
    });
  }

  document.addEventListener("visibilitychange", () => {
    isVisible = !document.hidden;
    if (isVisible) {
      try {
        const cached = sessionStorage.getItem("lp");
        if (cached) updatePresence(JSON.parse(cached));
      } catch (_) {}
      connect();
    } else {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }
  });

  try {
    const cached = sessionStorage.getItem("lp");
    if (cached) updatePresence(JSON.parse(cached));
  } catch (_) {}

  loadBadges();
  connect();

  window.discordReconnect = () => {
    if (socket) socket.close();

    loadBadges();

    connect();
  };
})();

/* =========================================================
   CHECK PROFILE MODAL & UID HISTORY
========================================================= */

const modal = document.getElementById("uid-modal");

const openBtn = document.getElementById("check-profile-btn");

const closeBtn = document.getElementById("close-modal");

const submitBtn = document.getElementById("uid-submit");

const input = document.getElementById("uid-input");

openBtn.onclick = () => {
  modal.classList.add("active");

  input.value = UID;

  renderHistory();

  setTimeout(() => {
    input.focus();
  }, 120);
};

closeBtn.onclick = () => {
  modal.classList.remove("active");
};

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

async function changeProfile(newUID) {
  newUID = newUID.trim();

  if (!newUID) return;

  document.querySelector(".grid").classList.add("profile-switching");

  setTimeout(() => {
    document.querySelector(".grid").classList.remove("profile-switching");
  }, 250);

  UID = newUID;

  const oldHistory = JSON.parse(localStorage.getItem("lastProfiles")) || [];

  const updatedHistory = [
    newUID,

    ...oldHistory.filter((uid) => uid !== newUID),
  ].slice(0, 6);

  localStorage.setItem("lastProfiles", JSON.stringify(updatedHistory));

  sessionStorage.removeItem("lp");

  window.discordReconnect();

  modal.classList.remove("active");
}

submitBtn.onclick = () => {
  if (!input.value.trim()) return;

  changeProfile(input.value);
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

function renderHistory() {
  const wrap = document.getElementById("uid-history");

  const items = JSON.parse(localStorage.getItem("lastProfiles")) || [];

  wrap.innerHTML = "";

  if (items.length === 0) {
    wrap.innerHTML = `<span style="color:#777;font-size:12px">
      Belum ada history
    </span>`;

    return;
  }

  items.forEach((uid) => {
    const item = document.createElement("div");

    item.className = "uid-history-item";

    const text = document.createElement("span");

    text.textContent = uid;

    text.onclick = () => {
      changeProfile(uid);
    };

    const removeBtn = document.createElement("button");

    removeBtn.className = "uid-history-remove";

    removeBtn.innerHTML = "&times;";

    removeBtn.onclick = (e) => {
      e.stopPropagation();

      const updated = items.filter((v) => v !== uid);

      localStorage.setItem("lastProfiles", JSON.stringify(updated));

      renderHistory();
    };

    item.appendChild(text);
    item.appendChild(removeBtn);

    wrap.appendChild(item);
  });
}

/* =========================================================
   UID HELP MODAL
========================================================= */

const helpBtn = document.getElementById("uid-help-btn");

const helpModal = document.getElementById("uid-help-modal");

const closeHelpModal = document.getElementById("close-help-modal");

helpBtn.onclick = () => {
  helpModal.classList.add("active");
};

closeHelpModal.onclick = () => {
  helpModal.classList.remove("active");
};

helpModal.addEventListener("click", (e) => {
  if (e.target === helpModal) {
    helpModal.classList.remove("active");
  }
});

/* =========================
   VISITOR COUNTER
========================= */

async function updateVisitorCount() {
  const counterEl = document.getElementById("visitor-count");

  try {
    const response = await fetch("/api/views");
    const data = await response.json();

    console.log("Visitor count:", data);
    console.log("Counter data:", data.data);

    counterEl.textContent =
      data.data?.count ??
      data.data?.up_count ??
      data.data?.value ??
      data.data?.amount ??
      data.count ??
      data.value ??
      "0";

  } catch (error) {
    console.error("Visitor counter error:", error);
    counterEl.textContent = "—";
  }
}

updateVisitorCount();