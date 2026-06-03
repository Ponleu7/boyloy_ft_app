<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <swiper
        :modules="modules"
        :loop="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :speed="700"
        :pagination="{ clickable: true }"
        :navigation="true"
        class="hero-swiper"
      >
        <swiper-slide v-for="slide in slides" :key="slide.id">
          <div
            class="slide-bg"
            :style="{ backgroundImage: `url(${slide.image})` }"
          ></div>
          <div class="slide-content">
            <p class="hero__label">2025 / 26 Season</p>
            <span
              v-if="slide.badge"
              class="slide-badge"
              :class="slide.badgeClass"
              >{{ slide.badge }}</span
            >
            <h1 class="hero__title" v-html="slide.title"></h1>
            <p class="hero__sub">{{ slide.sub }}</p>
            <div class="hero__btns">
              <RouterLink :to="slide.primaryLink" class="btn btn-primary">{{
                slide.primaryLabel
              }}</RouterLink>
              <RouterLink :to="slide.secondaryLink" class="btn btn-outline">{{
                slide.secondaryLabel
              }}</RouterLink>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <!-- Main content -->
    <div class="container home-grid section">
      <!-- Left: Result + Next match -->
      <div class="home-left">
        <h2 class="section-title">Latest <span>Result</span></h2>
        <div class="result-card">
          <div class="team">
            <div class="team__crest">{{ initials(result.homeTeam) }}</div>
            <span class="team__name">{{ result.homeTeam }}</span>
          </div>
          <div class="score-box">
            <div class="score">
              {{ result.homeScore }} – {{ result.awayScore }}
            </div>
            <div class="score-meta">Full time · {{ result.competition }}</div>
            <div class="score-date">{{ result.date }}</div>
          </div>
          <div class="team">
            <div class="team__crest">{{ initials(result.awayTeam) }}</div>
            <span class="team__name">{{ result.awayTeam }}</span>
          </div>
        </div>

        <h2 class="section-title" style="margin-top: 2rem">
          Next <span>Match</span>
        </h2>
        <div class="next-card">
          <div class="next-info">
            <div class="next-label">Upcoming</div>
            <div class="next-teams">
              {{ next.homeTeam }} vs {{ next.awayTeam }}
            </div>
            <div class="next-meta">
              {{ formatDate(next.date) }} · {{ next.venue }} ·
              {{ formatTime(next.date) }}
            </div>
          </div>
          <div class="countdown">
            <div class="cd-block">
              <div class="cd-num">{{ countdown.days }}</div>
              <div class="cd-lbl">Days</div>
            </div>
            <div class="cd-block">
              <div class="cd-num">{{ countdown.hours }}</div>
              <div class="cd-lbl">Hrs</div>
            </div>
            <div class="cd-block">
              <div class="cd-num">{{ countdown.minutes }}</div>
              <div class="cd-lbl">Min</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: News -->
      <div class="home-right">
        <div class="news-header">
          <h2 class="section-title">Latest <span>News</span></h2>
          <RouterLink to="/news" class="see-all">See all →</RouterLink>
        </div>
        <div class="news-list">
          <RouterLink
            v-for="item in news"
            :key="item.id"
            :to="`/news/${item.id}`"
            class="news-item"
          >
            <div class="news-img">
              <img v-if="item.image" :src="item.image" :alt="item.title" />
              <div v-else class="news-img__placeholder">BFC</div>
            </div>
            <div class="news-body">
              <span class="badge">{{ item.category }}</span>
              <p class="news-title">{{ item.title }}</p>
              <span class="news-date">{{ item.date }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { latestResult, nextMatch, latestNews, slides } from "@/data/home.js";

const result = latestResult;
const next = nextMatch;
const news = latestNews;

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 3)
    .join("");

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

const countdown = ref({ days: 0, hours: 0, minutes: 0 });

const updateCountdown = () => {
  const diff = new Date(next.date) - new Date();
  if (diff <= 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0 };
    return;
  }
  countdown.value = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
  };
};

let timer;
onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 30000);
});
onUnmounted(() => clearInterval(timer));

// <script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const modules = [Autoplay, Pagination, Navigation];
</script>

<style scoped>
/* Install: npm install swiper */

.hero-swiper {
  width: 100%;
  height: 720px;
}

.swiper-slide {
  position: relative;
  display: flex;
  align-items: stretch;
}

.slide-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}
.slide-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(10, 6, 2, 0.92) 0%,
    rgba(10, 6, 2, 0.65) 45%,
    rgba(10, 6, 2, 0.05) 100%
  );
}

.slide-content {
  position: relative;
  z-index: 2;
  width: 52%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 2rem 3rem 4rem;
}

.slide-badge {
  display: inline-block;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 2px;
  margin-bottom: 0.5rem;
  font-weight: 600;
  width: fit-content;
}
.badge-win {
  background: rgba(30, 90, 40, 0.7);
  color: #7ecf7e;
}
.badge-next {
  background: rgba(30, 60, 120, 0.7);
  color: #88b4f0;
}
.badge-news {
  background: rgba(120, 50, 10, 0.7);
  color: #f0a87e;
}

/* Swiper overrides */
:deep(.swiper-pagination) {
  bottom: 1.2rem;
  left: 3rem;
  width: auto;
  text-align: left;
}
:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.35);
  opacity: 1;
}
:deep(.swiper-pagination-bullet-active) {
  background: var(--color-secondary);
  width: 22px;
  border-radius: 3px;
}
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  width: 32px;
  height: 32px;
  background: rgba(212, 148, 35, 0.15);
  border: 1px solid rgba(212, 148, 35, 0.4);
  border-radius: 50%;
  color: var(--color-secondary);
}
:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 13px;
  font-weight: 700;
}
:deep(.swiper-button-prev) {
  left: auto;
  right: 56px;
}
:deep(.swiper-button-next) {
  right: 14px;
}

@media (max-width: 768px) {
  .hero-swiper {
    height: 440px;
  }
  .slide-content {
    width: 85%;
    padding: 2rem 1.5rem;
  }
}
/* ── Hero ─────────────────────────────────── */
.hero {
  background: var(--color-bg-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 0rem 0rem;
  position: relative;
  overflow: hidden;
}
.hero__bg-circle {
  position: absolute;
  top: -60px;
  right: -80px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: rgba(98, 47, 27, 0.2);
  pointer-events: none;
}
.hero__label {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--color-secondary);
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.hero__title {
  font-size: clamp(3rem, 8vw, 5rem);
  line-height: 1;
  margin-bottom: 0.6rem;
}
.hero__title span {
  color: var(--color-secondary);
}
.hero__sub {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  max-width: 420px;
  line-height: 1.6;
  margin-bottom: 2rem;
}
.hero__btns {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* ── Layout ───────────────────────────────── */
.home-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}
.section-title {
  font-size: 1.8rem;
  margin-bottom: 1.25rem;
}
.section-title span {
  color: var(--color-secondary);
}

/* ── Result card ──────────────────────────── */
.result-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.team {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.team__crest {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--color-secondary);
}
.team__name {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  text-align: center;
}
.score-box {
  text-align: center;
}
.score {
  font-family: var(--font-display);
  font-size: 2.8rem;
  color: var(--color-secondary);
  letter-spacing: 0.1em;
  line-height: 1;
}
.score-meta {
  font-size: 0.68rem;
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 0.3rem;
}
.score-date {
  font-size: 0.68rem;
  color: #4a3a34;
  margin-top: 0.2rem;
}

/* ── Next match ───────────────────────────── */
.next-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-secondary);
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.next-label {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--color-secondary);
  text-transform: uppercase;
  margin-bottom: 0.3rem;
}
.next-teams {
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.04em;
}
.next-meta {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 0.2rem;
}
.countdown {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}
.cd-block {
  text-align: center;
}
.cd-num {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--color-secondary);
  line-height: 1;
}
.cd-lbl {
  font-size: 0.58rem;
  color: var(--color-text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ── News ─────────────────────────────────── */
.news-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}
.news-header .section-title {
  margin-bottom: 0;
}
.see-all {
  font-size: 0.8rem;
  color: var(--color-secondary);
  transition: opacity 0.15s;
}
.see-all:hover {
  opacity: 0.7;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.news-item {
  display: flex;
  gap: 0;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color 0.15s;
  text-decoration: none;
}
.news-item:hover {
  border-color: rgba(212, 148, 35, 0.4);
}

.news-img {
  width: 90px;
  flex-shrink: 0;
  background: #2a1e16;
  display: flex;
  align-items: center;
  justify-content: center;
}
.news-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.news-img__placeholder {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: #4a3a34;
  letter-spacing: 0.06em;
}
.news-body {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.news-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.03em;
  line-height: 1.2;
  color: var(--color-text);
}
.news-date {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  margin-top: auto;
}

/* ── Responsive ───────────────────────────── */
@media (max-width: 768px) {
  .home-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }
}
</style>
