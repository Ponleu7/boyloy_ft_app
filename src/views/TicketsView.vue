<template>
  <div>
    <div class="page-header">
      <div class="container">
        <p class="page-label">Boyloy FC</p>
        <h1 class="page-title">Match <span>Tickets</span></h1>
        <p class="page-sub">Reserve your spot and support the team in person.</p>
      </div>
    </div>

    <div class="container section">
      <div class="tickets-grid">
        <RouterLink
          v-for="ticket in tickets"
          :key="ticket.id"
          :to="`/tickets/${ticket.id}`"
          class="ticket-card"
          :class="ticket.status"
        >
          <!-- Status ribbon -->
          <div class="ticket-ribbon" :class="ticket.status">
            {{ ribbonLabel(ticket.status) }}
          </div>

          <!-- Header -->
          <div class="ticket-header">
            <span class="badge">{{ ticket.competition }}</span>
            <span class="ticket-venue">{{ ticket.venue }}</span>
          </div>

          <!-- Match -->
          <div class="ticket-match">
            <div class="match-team">
              <div class="team-crest">{{ initials(ticket.homeTeam) }}</div>
              <span>{{ ticket.homeTeam }}</span>
            </div>
            <div class="match-vs">VS</div>
            <div class="match-team away">
              <div class="team-crest">{{ initials(ticket.awayTeam) }}</div>
              <span>{{ ticket.awayTeam }}</span>
            </div>
          </div>

          <!-- Date/time -->
          <div class="ticket-datetime">
            <div class="dt-block">
              <span class="dt-icon">📅</span>
              {{ formatDate(ticket.date) }}
            </div>
            <div class="dt-block">
              <span class="dt-icon">🕒</span>
              {{ formatTime(ticket.date) }}
            </div>
          </div>

          <!-- Price range -->
          <div class="ticket-price" v-if="ticket.status !== 'free'">
            <span class="price-from">From</span>
            <span class="price-amount">
              {{ minPrice(ticket) }} {{ ticket.categories[0]?.unit }}
            </span>
          </div>
          <div class="ticket-price free-label" v-else>
            🎉 Free Entry
          </div>

          <div class="ticket-cta">
            View Details →
          </div>

        </RouterLink>
      </div>
    </div>

  </div>
</template>

<script setup>
import { tickets } from '@/data/tickets.js'

const initials = (name) =>
  name.split(' ').map(w => w[0]).slice(0, 3).join('')

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

const minPrice = (ticket) =>
  Math.min(...ticket.categories.map(c => c.price)).toLocaleString()

const ribbonLabel = (status) => {
  if (status === 'available') return 'On Sale'
  if (status === 'soldout')   return 'Sold Out'
  if (status === 'free')      return 'Free'
  return status
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
.page-sub { font-size: .92rem; color: var(--color-text-muted); margin-top: .5rem; }

/* Grid */
.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

/* Card */
.ticket-card {
  position: relative;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  transition: border-color .2s, transform .2s;
}
.ticket-card:hover {
  border-color: rgba(212,148,35,.45);
  transform: translateY(-3px);
}
.ticket-card.soldout { opacity: .65; }

/* Ribbon */
.ticket-ribbon {
  position: absolute;
  top: 14px; right: -28px;
  width: 110px;
  text-align: center;
  font-family: var(--font-display);
  font-size: .72rem;
  letter-spacing: .1em;
  padding: .25rem 0;
  transform: rotate(35deg);
}
.ticket-ribbon.available { background: var(--color-secondary); color: var(--color-primary-dark); }
.ticket-ribbon.soldout   { background: #e53935; color: #fff; }
.ticket-ribbon.free      { background: #4caf50; color: #fff; }

/* Header */
.ticket-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ticket-venue { font-size: .75rem; color: var(--color-text-muted); }

/* Match */
.ticket-match {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  background: var(--color-bg-surface);
  border-radius: var(--radius-md);
  padding: 1rem;
  border: 1px solid var(--color-border);
}
.match-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .4rem;
  flex: 1;
  font-size: .78rem;
  color: var(--color-text-muted);
  text-align: center;
}
.match-team.away { align-items: center; }
.team-crest {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 1.5px solid var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 9px;
  color: var(--color-secondary);
}
.match-vs {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--color-text-muted);
  letter-spacing: .1em;
}

/* Date/time */
.ticket-datetime {
  display: flex;
  gap: 1.25rem;
}
.dt-block {
  display: flex;
  align-items: center;
  gap: .4rem;
  font-size: .8rem;
  color: var(--color-text-muted);
}
.dt-icon { font-size: .9rem; }

/* Price */
.ticket-price {
  display: flex;
  align-items: baseline;
  gap: .4rem;
}
.price-from { font-size: .72rem; color: var(--color-text-muted); }
.price-amount {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--color-secondary);
  letter-spacing: .04em;
}
.free-label {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: #81c784;
  letter-spacing: .04em;
}

/* CTA */
.ticket-cta {
  font-size: .82rem;
  color: var(--color-secondary);
  font-weight: 600;
  margin-top: auto;
}
</style>