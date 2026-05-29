<template>
  <div>

    <div class="page-header">
      <div class="container">
        <p class="page-label">2024 / 25 Season</p>
        <h1 class="page-title">League <span>Table</span></h1>
      </div>
    </div>

    <div class="container section table-section">

      <div class="table-wrap">
        <table class="league-table">
          <thead>
            <tr>
              <th class="col-pos">Pos</th>
              <th class="col-name">Club</th>
              <th class="col-num">P</th>
              <th class="col-num">W</th>
              <th class="col-num">D</th>
              <th class="col-num">L</th>
              <th class="col-num hide-sm">GF</th>
              <th class="col-num hide-sm">GA</th>
              <th class="col-num">GD</th>
              <th class="col-num col-pts">Pts</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="team in table"
              :key="team.pos"
              :class="{
                'row-boyloy':   team.name === 'Boyloy FC',
                'row-promo':    team.pos <= 2,
                'row-relegation': team.pos >= table.length - 1,
              }"
            >
              <td class="col-pos">
                <span class="pos-indicator" :class="posClass(team.pos)">
                  {{ team.pos }}
                </span>
              </td>
              <td class="col-name">
                <div class="team-cell">
                  <div class="team-crest">{{ initials(team.name) }}</div>
                  <span class="team-label">{{ team.name }}</span>
                  <span v-if="team.name === 'Boyloy FC'" class="you-tag">US</span>
                </div>
              </td>
              <td class="col-num">{{ team.played }}</td>
              <td class="col-num">{{ team.won }}</td>
              <td class="col-num">{{ team.drawn }}</td>
              <td class="col-num">{{ team.lost }}</td>
              <td class="col-num hide-sm">{{ team.gf }}</td>
              <td class="col-num hide-sm">{{ team.ga }}</td>
              <td class="col-num" :class="gdClass(team)">{{ gdDisplay(team) }}</td>
              <td class="col-num col-pts">
                <strong>{{ team.points }}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Legend -->
      <div class="legend">
        <div class="legend-item">
          <span class="legend-dot promo"></span>
          Promotion zone
        </div>
        <div class="legend-item">
          <span class="legend-dot relegation"></span>
          Relegation zone
        </div>
        <div class="legend-item">
          <span class="legend-dot boyloy"></span>
          Boyloy FC
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { table } from '@/data/table.js'

const initials = (name) =>
  name.split(' ').map(w => w[0]).slice(0, 3).join('')

const gd = (team) => team.gf - team.ga

const gdDisplay = (team) => {
  const d = gd(team)
  return d > 0 ? `+${d}` : `${d}`
}

const gdClass = (team) => {
  const d = gd(team)
  return d > 0 ? 'positive' : d < 0 ? 'negative' : ''
}

const posClass = (pos) => {
  if (pos <= 2) return 'promo'
  if (pos >= table.length - 1) return 'relegation'
  return ''
}
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

/* Table wrapper */
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
}

.league-table {
  width: 100%;
  border-collapse: collapse;
  font-size: .88rem;
}

/* Header */
thead tr {
  background: var(--color-bg-surface);
  border-bottom: 1px solid var(--color-border);
}
thead th {
  padding: .85rem 1rem;
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: .72rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Rows */
tbody tr {
  border-bottom: 1px solid rgba(212,148,35,.07);
  transition: background .15s;
}
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background: rgba(212,148,35,.04); }

td { padding: .8rem 1rem; color: var(--color-text); }

/* Boyloy row */
.row-boyloy {
  background: rgba(98,47,27,.18) !important;
  border-left: 3px solid var(--color-secondary);
}
.row-boyloy:hover { background: rgba(98,47,27,.25) !important; }

/* Promo / relegation row tints */
.row-promo    { border-left: 3px solid #4caf50; }
.row-relegation { border-left: 3px solid #e53935; }

/* Column sizes */
.col-pos  { width: 52px; text-align: center; }
.col-name { text-align: left; min-width: 180px; }
.col-num  { text-align: center; width: 44px; }
.col-pts  { color: var(--color-secondary); }

/* Position indicator */
.pos-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px; height: 26px;
  border-radius: 6px;
  font-family: var(--font-display);
  font-size: .95rem;
  color: var(--color-text-muted);
}
.pos-indicator.promo     { background: rgba(76,175,80,.15); color: #81c784; }
.pos-indicator.relegation { background: rgba(229,57,53,.15); color: #e57373; }

/* Team cell */
.team-cell {
  display: flex;
  align-items: center;
  gap: .65rem;
}
.team-crest {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 1.5px solid var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 9px;
  color: var(--color-secondary);
  flex-shrink: 0;
}
.team-label { font-weight: 500; }
.you-tag {
  font-family: var(--font-display);
  font-size: .62rem;
  letter-spacing: .1em;
  background: var(--color-secondary);
  color: var(--color-primary-dark);
  padding: .1rem .4rem;
  border-radius: 4px;
}

/* GD color */
.positive { color: #81c784; }
.negative { color: #e57373; }

/* Hide on small screens */
@media (max-width: 560px) {
  .hide-sm { display: none; }
  td, th { padding: .7rem .6rem; }
}

/* Legend */
.legend {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: .78rem;
  color: var(--color-text-muted);
}
.legend-dot {
  width: 10px; height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
}
.legend-dot.promo      { background: #4caf50; }
.legend-dot.relegation { background: #e53935; }
.legend-dot.boyloy     { background: var(--color-secondary); }
.table-section {
 padding: 1rem;
}
</style>