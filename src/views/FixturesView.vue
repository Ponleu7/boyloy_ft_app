<template>
  <div>

    <div class="page-header">
      <div class="container">
        <p class="page-label">2025 / 26 Season</p>
        <h1 class="page-title">Fixtures <span>&</span> Results</h1>
      </div>
    </div>

    <div class="container section fixtures-section">

      <!-- Filter tabs -->
      <div class="filters">
        <button
          v-for="f in filters"
          :key="f.value"
          class="filter-btn"
          :class="{ active: activeFilter === f.value }"
          @click="activeFilter = f.value"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Results section -->
      <div v-if="filtered.finished.length && activeFilter !== 'upcoming'">
        <h2 class="group-title">Results</h2>
        <div class="fixture-list">
          <div
            v-for="match in filtered.finished"
            :key="match.id"
            class="fixture-card finished"
          >
            <div class="fixture-date">
              <span class="date-day">{{ formatDay(match.date) }}</span>
              <span class="date-month">{{ formatMonth(match.date) }}</span>
            </div>
            <div class="fixture-teams">
              <span class="fixture-team" :class="{ bold: isBoyloy(match.homeTeam) }">
                {{ match.homeTeam }}
              </span>
              <div class="fixture-score">
                <span class="score-num">{{ match.homeScore }}</span>
                <span class="score-sep">–</span>
                <span class="score-num">{{ match.awayScore }}</span>
              </div>
              <span class="fixture-team away" :class="{ bold: isBoyloy(match.awayTeam) }">
                {{ match.awayTeam }}
              </span>
            </div>
            <div class="fixture-meta"> 
              <span class="badge">{{ match.competition }}</span>
              <span class="venue-tag" :class="match.venue.toLowerCase()">
                {{ match.venue }}
              </span>
            </div>
            <div class="fixture-result" :class="resultClass(match)">
              {{ resultLabel(match) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming section -->
      <div v-if="filtered.upcoming.length && activeFilter !== 'results'">
        <h2 class="group-title">Upcoming</h2>
        <div class="fixture-list">
          <div
            v-for="match in filtered.upcoming"
            :key="match.id"
            class="fixture-card upcoming"
          >
            <div class="fixture-date">
              <span class="date-day">{{ formatDay(match.date) }}</span>
              <span class="date-month">{{ formatMonth(match.date) }}</span>
            </div>
            <div class="fixture-teams">
              <span class="fixture-team" :class="{ bold: isBoyloy(match.homeTeam) }">
                {{ match.homeTeam }}
              </span>
              <div class="fixture-score upcoming-score">
                <span>{{ formatTime(match.date) }}</span>
              </div>
              <span class="fixture-team away" :class="{ bold: isBoyloy(match.awayTeam) }">
                {{ match.awayTeam }}
              </span>
            </div>
            <div class="fixture-meta">
              <span class="badge">{{ match.competition }}</span>
              <span class="venue-tag" :class="match.venue.toLowerCase()">
                {{ match.venue }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { fixtures } from '@/data/fixtures.js'

const activeFilter = ref('all')

const filters = [
  { label: 'All',      value: 'all' },
  { label: 'Results',  value: 'results' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'League',   value: 'League' },
  { label: 'Cup',      value: 'Cup' },
]

const filtered = computed(() => {
  let list = fixtures
  if (activeFilter.value === 'League' || activeFilter.value === 'Cup') {
    list = list.filter(m => m.competition === activeFilter.value)
  }
  return {
    finished: list.filter(m => m.status === 'finished').reverse(),
    upcoming: list.filter(m => m.status === 'upcoming'),
  }
})

const isBoyloy = (name) => name === 'Boyloy FC'

const resultClass = (match) => {
  const boyloyHome = match.homeTeam === 'Boyloy FC'
  const boyloyScore = boyloyHome ? match.homeScore : match.awayScore
  const oppScore    = boyloyHome ? match.awayScore : match.homeScore
  if (boyloyScore > oppScore) return 'win'
  if (boyloyScore < oppScore) return 'loss'
  return 'draw'
}

const resultLabel = (match) => {
  const c = resultClass(match)
  return c === 'win' ? 'W' : c === 'loss' ? 'L' : 'D'
}

const formatDay   = (iso) => new Date(iso).getDate()
const formatMonth = (iso) => new Date(iso).toLocaleDateString('en-GB', { month: 'short' })
const formatTime  = (iso) => new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
</script>

<style scoped>
.page-header {
  background: var(--color-bg-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 3rem 0 2rem;
}
.page-label {
  font-size: .72rem;
  letter-spacing: .18em;
  color: var(--color-secondary);
  text-transform: uppercase;
  margin-bottom: .5rem;
}
.page-title { font-size: clamp(2.2rem, 6vw, 3.5rem); }
.page-title span { color: var(--color-secondary); }

/* Filters */
.filters {
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}
.filter-btn {
  padding: .4rem 1rem;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: .82rem;
  font-weight: 500;
  transition: all .15s;
}
.filter-btn:hover { border-color: rgba(212,148,35,.4); color: var(--color-text); }
.filter-btn.active {
  background: var(--color-secondary);
  border-color: var(--color-secondary);
  color: var(--color-primary-dark);
  font-weight: 600;
}

/* Group title */
.group-title {
  font-size: 1rem;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  padding-bottom: .5rem;
  border-bottom: 1px solid var(--color-border);
}

/* Fixture list */
.fixture-list { display: flex; flex-direction: column; gap: .6rem; margin-bottom: 2.5rem; }

.fixture-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  display: grid;
  grid-template-columns: 60px 1fr auto auto;
  align-items: center;
  gap: 1rem;
  transition: border-color .15s;
}
.fixture-card:hover { border-color: rgba(212,148,35,.35); }

/* Date block */
.fixture-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
}
.date-day {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-secondary);
}
.date-month { font-size: .7rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: .08em; }

/* Teams row */
.fixture-teams {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.fixture-team {
  flex: 1;
  font-size: .9rem;
  color: var(--color-text-muted);
}
.fixture-team.away { text-align: right; }
.fixture-team.bold { color: var(--color-text); font-weight: 600; }

.fixture-score {
  display: flex;
  align-items: center;
  gap: .4rem;
  flex-shrink: 0;
}
.score-num {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--color-text);
  min-width: 18px;
  text-align: center;
}
.score-sep { color: var(--color-text-muted); font-size: .9rem; }

.upcoming-score {
  font-size: .82rem;
  color: var(--color-secondary);
  font-weight: 500;
  min-width: 60px;
  justify-content: center;
}

/* Meta */
.fixture-meta { display: flex; flex-direction: column; align-items: flex-end; gap: .35rem; }
.venue-tag {
  font-size: .65rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: .15rem .5rem;
  border-radius: 4px;
  font-weight: 600;
}
.venue-tag.home { background: rgba(98,47,27,.4); color: #d49423; }
.venue-tag.away { background: rgba(26,20,16,.8); color: var(--color-text-muted); border: 1px solid var(--color-border); }

/* W/D/L pill */
.fixture-result {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: .9rem;
  flex-shrink: 0;
}
.fixture-result.win  { background: rgba(39,80,10,.5);  color: #97c459; }
.fixture-result.loss { background: rgba(121,31,31,.4); color: #f09595; }
.fixture-result.draw { background: rgba(98,47,27,.3);  color: #d49423; }

@media (max-width: 640px) {
  .fixture-card {
    grid-template-columns: 48px 1fr auto;
    grid-template-rows: auto auto;
  }
  .fixture-meta { display: none; }
  .fixture-result { grid-row: 1 / 3; }
  .fixtures-section { padding: 1rem; }
  .finished {
    gap: 0;
  }
}
</style>