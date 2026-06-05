<template>
  <div v-if="ticket">

    <div class="page-header">
      <div class="container">
        <RouterLink to="/tickets" class="back-link">← Back to Tickets</RouterLink>
        <div class="header-top">
          <span class="badge">{{ ticket.competition }}</span>
          <span class="status-pill" :class="ticket.status">
            {{ ribbonLabel(ticket.status) }}
          </span>
        </div>
        <h1 class="page-title">
          {{ ticket.homeTeam }} <span>vs</span> {{ ticket.awayTeam }}
        </h1>
        <div class="header-meta">
          <span>📅 {{ formatDate(ticket.date) }}</span>
          <span>🕒 {{ formatTime(ticket.date) }}</span>
          <span>📍 {{ ticket.venue }}</span>
        </div>
      </div>
    </div>

    <div class="container section">
      <div class="detail-grid">

        <!-- Left: Ticket categories -->
        <div class="detail-main">

          <h2 class="section-title" v-if="ticket.categories.length">
            Ticket <span>Categories</span>
          </h2>

          <div class="categories" v-if="ticket.categories.length">
            <div
              v-for="cat in ticket.categories"
              :key="cat.name"
              class="category-card"
              :class="{ unavailable: !cat.available }"
            >
              <div class="cat-info">
                <p class="cat-name">{{ cat.name }}</p>
                <p class="cat-status" v-if="!cat.available">Sold Out</p>
              </div>
              <div class="cat-price">
                <span class="price-amount">{{ cat.price.toLocaleString() }}</span>
                <span class="price-unit">{{ cat.unit }}</span>
              </div>
            </div>
          </div>

          <!-- Free entry message -->
          <div class="free-banner" v-else>
            <span class="free-icon">🎉</span>
            <div>
              <p class="free-title">Free Entry</p>
              <p class="free-sub">No ticket required for this match.</p>
            </div>
          </div>

          <!-- Notes -->
          <div class="notes-card" v-if="ticket.notes">
            <span class="notes-icon">ℹ️</span>
            <p>{{ ticket.notes }}</p>
          </div>

        </div>

        <!-- Right: Where to buy + venue -->
        <div class="detail-side">

          <div class="side-card">
            <h3 class="side-title">Where to Get Tickets</h3>
            <div class="buy-list">
              <div
                v-for="place in ticket.whereToBy"
                :key="place.label"
                class="buy-item"
              >
                <div class="buy-dot"></div>
                <div>
                  <p class="buy-label">{{ place.label }}</p>
                  <p class="buy-detail">{{ place.detail }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="side-card">
            <h3 class="side-title">Venue</h3>
            <p class="venue-name">{{ ticket.venue }}</p>
            <p class="venue-address">📍 {{ ticket.address }}</p>
          </div>

        </div>

      </div>
    </div>

  </div>

  <div v-else class="container section not-found">
    <h2>Ticket info not found</h2>
    <RouterLink to="/tickets" class="btn btn-outline" style="margin-top:1rem">
      Back to Tickets
    </RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { tickets } from '@/data/tickets.js'

const route  = useRoute()
const ticket = computed(() => tickets.find(t => t.id === Number(route.params.id)))

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

const ribbonLabel = (status) => {
  if (status === 'available') return 'On Sale'
  if (status === 'soldout')   return 'Sold Out'
  if (status === 'free')      return 'Free Entry'
  return status
}
</script>

<style scoped>
.page-header {
  background: var(--color-bg-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 2.5rem 0;
}
.back-link {
  font-size: .8rem;
  color: var(--color-text-muted);
  display: inline-block;
  margin-bottom: 1rem;
  transition: color .15s;
}
.back-link:hover { color: var(--color-secondary); }

.header-top {
  display: flex;
  align-items: center;
  gap: .75rem;
  margin-bottom: .75rem;
}
.status-pill {
  font-family: var(--font-display);
  font-size: .72rem;
  letter-spacing: .1em;
  padding: .2rem .7rem;
  border-radius: 20px;
}
.status-pill.available { background: rgba(212,148,35,.2); color: var(--color-secondary); }
.status-pill.soldout   { background: rgba(229,57,53,.2);  color: #e57373; }
.status-pill.free      { background: rgba(76,175,80,.2);  color: #81c784; }

.page-title { font-size: clamp(1.8rem, 5vw, 3rem); margin-bottom: .75rem; }
.page-title span { color: var(--color-secondary); }

.header-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  font-size: .82rem;
  color: var(--color-text-muted);
}

/* Layout */
.detail-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
  align-items: start;
}

.section-title { font-size: 1.6rem; margin-bottom: 1.25rem; }
.section-title span { color: var(--color-secondary); }

/* Categories */
.categories { display: flex; flex-direction: column; gap: .75rem; margin-bottom: 1.5rem; }
.category-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: border-color .15s;
}
.category-card:hover { border-color: rgba(212,148,35,.4); }
.category-card.unavailable { opacity: .5; }

.cat-name {
  font-weight: 600;
  font-size: .92rem;
  color: var(--color-text);
}
.cat-status {
  font-size: .72rem;
  color: #e57373;
  margin-top: .2rem;
}
.cat-price { display: flex; align-items: baseline; gap: .35rem; }
.price-amount {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-secondary);
  letter-spacing: .04em;
}
.price-unit { font-size: .72rem; color: var(--color-text-muted); }

/* Free banner */
.free-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(76,175,80,.1);
  border: 1px solid rgba(76,175,80,.3);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}
.free-icon { font-size: 2rem; }
.free-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: #81c784;
  letter-spacing: .04em;
}
.free-sub { font-size: .82rem; color: var(--color-text-muted); margin-top: .2rem; }

/* Notes */
.notes-card {
  display: flex;
  align-items: flex-start;
  gap: .75rem;
  background: rgba(212,148,35,.06);
  border: 1px solid rgba(212,148,35,.15);
  border-radius: var(--radius-md);
  padding: 1rem 1.1rem;
  font-size: .84rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}
.notes-icon { font-size: 1rem; flex-shrink: 0; margin-top: .1rem; }

/* Side cards */
.side-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  margin-bottom: 1rem;
}
.side-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: .06em;
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

/* Buy list */
.buy-list { display: flex; flex-direction: column; gap: .85rem; }
.buy-item { display: flex; gap: .75rem; align-items: flex-start; }
.buy-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--color-secondary);
  flex-shrink: 0;
  margin-top: .35rem;
}
.buy-label { font-size: .88rem; font-weight: 600; color: var(--color-text); }
.buy-detail { font-size: .78rem; color: var(--color-text-muted); margin-top: .15rem; }

/* Venue */
.venue-name { font-weight: 600; font-size: .92rem; margin-bottom: .35rem; }
.venue-address { font-size: .82rem; color: var(--color-text-muted); }

.not-found { text-align: center; padding: 5rem 0; color: var(--color-text-muted); }

@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; }
}
</style>