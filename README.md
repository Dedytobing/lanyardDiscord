<div align="center">

# ✦ Dexxy

### Real-time Discord Presence Website  
A futuristic Discord status page powered by **Lanyard API**, featuring a modern animated UI, Spotify integration, and an immersive built-in music player.

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-111111?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

</div>

---

## ✦ Overview

Dexxy is a fully customizable real-time Discord presence website that displays:

- Discord activity status
- Spotify listening activity
- Rich Presence activities
- Animated space background
- Built-in aesthetic music player
- Dynamic profile switching
- Live updates through WebSocket

Designed with a modern **glassmorphism + cyber aesthetic** interface inspired by futuristic dashboards and Discord UI.

---

## ✦ Features

### ✦ Real-time Discord Presence
- Live Discord status updates
- Custom status support
- Rich Presence activities
- Device/platform detection
- Dynamic profile switching

### ✦ Spotify Integration
- Real-time song progress
- Album artwork
- Spotify activity card
- Dynamic timestamps

### ✦ Advanced Music Player
- Multi-track playlist
- Vinyl disc animation
- Progress seek bar
- Hover timestamp preview
- Volume control
- Previous / Next controls
- Auto play support
- Audio visualizer background
- Album cover integration

### ✦ Modern UI & Effects
- Animated shooting stars
- Smooth transitions
- Responsive layout
- Glassmorphism interface
- Animated hover effects
- Dynamic gradients
- Floating ambient visuals

### ✦ Profile Utilities
- Discord UID checker
- Search history
- Custom profile switching
- Help modal for finding UID

### ✦ Performance
- LocalStorage caching
- Lightweight vanilla JavaScript
- WebSocket live updates
- Optimized animations

---

## ✦ Preview

<div align="center">

<img src="https://imagur.org/i/vFOw67xc" width="100%" />

</div>

---

## ✦ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- WebSocket API
- Lanyard API
- Font Awesome Icons

---

## ✦ Setup

### 1. Clone Repository

```bash
git clone https://github.com/Dedytobing/lanyardDiscord.git
```

---

### 2. Open Project

```bash
cd lanyardDiscord
```

---

### 3. Configure Discord UID

Edit your JavaScript file:

```js
let UID = "YOUR_DISCORD_ID";
```

---

### 4. Configure Music Playlist

Edit the playlist array:

```js
{
  title: "Song Title",
  url: "YOUR_AUDIO_URL",
  cover: "YOUR_COVER_URL"
}
```

---

### 5. Enable Lanyard Tracking

Join the official Lanyard Discord server:

👉 https://discord.gg/lanyard

---

### 6. Deploy

Deploy to any static hosting platform:

- GitHub Pages
- Vercel
- Netlify

---

## ✦ Folder Structure

```bash
lanyardDiscord/
│
├── index.html
├── style.css
├── script.js
├── hyperdrive.svg
├── CNAME
├── music/
│   ├── bernadya-rabun_jauh.mp3
│   ├── dendi_nata-abadi_indo_version.mp3
│   ├── Dongker_feat._Jason_Ranti-Disarankan_Di_Bandung.mp3
│   ├── enau-sesi_potret_feat_ari_lesmana.mp3
│   ├── natasya_sabella-menerima_luka.mp3
│   └── piche_kota-bahagia_lagi.mp3
│
└── README.md
```

---

## ✦ Music Hosting

Recommended audio hosting providers:

- Cloudflare R2
- Supabase Storage
- Firebase Storage
- Bunny.net

Make sure your audio URLs support:

```txt
Access-Control-Allow-Origin: *
Content-Type: audio/mpeg
```

---

## ✦ Customization

### ✦ Change Theme Colors

Edit CSS variables:

```css
:root {
  --primary: #8fdcff;
  --background: #0b0f17;
}
```

---

### ✦ Modify Star Animations

Adjust animation settings inside JavaScript:

```js
createStars();
createShootingStars();
```

---

### ✦ Add More Songs

Extend the playlist array:

```js
playlist.push({
  title: "New Song",
  url: "audio.mp3",
  cover: "cover.jpg"
});
```

---

## ✦ Credits

- Discord Presence API by  
  https://github.com/Phineas/lanyard

- Icons by  
  https://fontawesome.com/

---

## ✦ License

This project is open-source and available under the MIT License.

---

<div align="center">

### ✦ Made with music, stars, and caffeine ☕

</div>

