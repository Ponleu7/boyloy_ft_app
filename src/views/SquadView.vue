<template>
  <div>
    <div class="page-header">
      <div class="container">
        <p class="page-label">2025 / 26 Season</p>
        <h1 class="page-title">The <span>Squad</span></h1>
      </div>
    </div>

    <div class="container section squad-section">
      <!-- Position filter -->
      <div class="filters">
        <button
          v-for="pos in ['All', ...positionOrder]"
          :key="pos"
          class="filter-btn"
          :class="{ active: activePos === pos }"
          @click="activePos = pos"
        >
          {{ pos }}
        </button>
      </div>

      <!-- Groups by position -->
      <div v-for="pos in visiblePositions" :key="pos" class="position-group">
        <h2 class="group-title"><span class="group-dot"></span>{{ pos }}s</h2>
        <div class="squad-grid">
          <div
            v-for="player in byPosition(pos)"
            :key="player.id"
            class="player-card"
          >
            <div class="player-photo">
              <img v-if="player.photo" :src="player.photo" :alt="player.name" />
              <div v-else class="player-initials">
                {{ initials(player.name) }}
              </div>
              <div class="player-number">#{{ player.number }}</div>
            </div>
            <div class="player-info">
              <p class="player-name">{{ player.name }}</p>
              <span class="player-pos-badge">{{
                posShort(player.position)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { squad, positionOrder } from "@/data/squad.js";

const activePos = ref("All");

const visiblePositions = computed(() =>
  activePos.value === "All"
    ? positionOrder.filter((p) => squad.some((s) => s.position === p))
    : [activePos.value],
);

const byPosition = (pos) =>
  squad.filter((p) => p.position === pos).sort((a, b) => a.number - b.number);

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const posShort = (pos) => {
  const map = {
    Goalkeeper: "GK",
    Defender: "DEF",
    Midfielder: "MID",
    Forward: "FWD",
  };
  return map[pos] ?? pos;
};
</script>

<style scoped>
.page-header {
  background: var(--color-bg-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 3rem 0 2rem;
}
.page-label {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--color-secondary);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.page-title {
  font-size: clamp(2.2rem, 6vw, 3.5rem);
}
.page-title span {
  color: var(--color-secondary);
}

/* Filters */
.filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}
.filter-btn {
  padding: 0.4rem 1.1rem;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  transition: all 0.15s;
}
.filter-btn:hover {
  border-color: rgba(212, 148, 35, 0.4);
  color: var(--color-text);
}
.filter-btn.active {
  background: var(--color-secondary);
  border-color: var(--color-secondary);
  color: var(--color-primary-dark);
  font-weight: 600;
}

/* Position group */
.position-group {
  margin-bottom: 3rem;
}
.group-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 1.25rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--color-border);
}
.group-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-secondary);
  flex-shrink: 0;
}

/* Grid */
.squad-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

/* Player card */
.player-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    border-color 0.2s,
    transform 0.2s;
  cursor: default;
}
.player-card:hover {
  border-color: rgba(212, 148, 35, 0.45);
  transform: translateY(-3px);
}

.player-photo {
  position: relative;
  height: 160px;
  background: linear-gradient(160deg, #2a1e16 0%, #1a1410 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.player-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.player-initials {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: rgba(212, 148, 35, 0.25);
  letter-spacing: 0.06em;
}
.player-number {
  position: absolute;
  top: 0.6rem;
  right: 0.7rem;
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--color-secondary);
  letter-spacing: 0.06em;
  opacity: 0.8;
}

.player-info {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.player-name {
  font-family: khmer, var(--font-display);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.2;
}
.player-pos-badge {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  background: var(--color-primary);
  color: var(--color-secondary);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .squad-section {
   padding: 1rem;
   padding-bottom: 0;
  }
  
}
</style>
