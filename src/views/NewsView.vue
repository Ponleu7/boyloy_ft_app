<template>
  <div>

    <div class="page-header">
      <div class="container">
        <p class="page-label">Latest from the club</p>
        <h1 class="page-title">Club <span>News</span></h1>
      </div>
    </div>

    <div class="container section">

      <!-- Category filter -->
      <div class="filters">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Featured article (first item) -->
      <RouterLink
        v-if="filtered.length"
        :to="`/news/${filtered[0].id}`"
        class="featured-card"
      >
        <div class="featured-image">
          <img v-if="filtered[0].image" :src="filtered[0].image" :alt="filtered[0].title" />
          <div v-else class="image-placeholder">
            <span>BFC</span>
          </div>
        </div>
        <div class="featured-body">
          <span class="badge">{{ filtered[0].category }}</span>
          <h2 class="featured-title">{{ filtered[0].title }}</h2>
          <p class="featured-excerpt">{{ filtered[0].excerpt }}</p>
          <div class="featured-meta">
            <span>{{ filtered[0].date }}</span>
            <span>{{ filtered[0].author }}</span>
          </div>
        </div>
      </RouterLink>

      <!-- Rest of articles -->
      <div class="news-grid" v-if="filtered.length > 1">
        <RouterLink
          v-for="item in filtered.slice(1)"
          :key="item.id"
          :to="`/news/${item.id}`"
          class="news-card"
        >
          <div class="news-image">
            <img v-if="item.image" :src="item.image" :alt="item.title" />
            <div v-else class="image-placeholder small"><span>BFC</span></div>
          </div>
          <div class="news-body">
            <span class="badge">{{ item.category }}</span>
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-excerpt">{{ item.excerpt }}</p>
            <div class="news-meta">
              <span>{{ item.date }}</span>
              <span>{{ item.author }}</span>
            </div>
          </div>
        </RouterLink>
      </div>

      <p v-if="!filtered.length" class="empty">No articles found.</p>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { news } from '@/data/news.js'

const activeCategory = ref('All')

const categories = computed(() => {
  const cats = [...new Set(news.map(n => n.category))]
  return ['All', ...cats]
})

const filtered = computed(() =>
  activeCategory.value === 'All'
    ? news
    : news.filter(n => n.category === activeCategory.value)
)
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
  margin-bottom: 2rem;
}
.filter-btn {
  padding: .4rem 1.1rem;
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

/* Featured card */
.featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 1.5rem;
  transition: border-color .2s;
  text-decoration: none;
}
.featured-card:hover { border-color: rgba(212,148,35,.4); }

.featured-image {
  min-height: 280px;
  background: #2a1e16;
  display: flex;
  align-items: center;
  justify-content: center;
}
.featured-image img { width: 100%; height: 100%; object-fit: cover; }

.featured-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: .75rem;
}
.featured-title {
  font-size: 1.6rem;
  line-height: 1.15;
  color: var(--color-text);
}
.featured-excerpt {
  font-size: .88rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  flex: 1;
}
.featured-meta {
  display: flex;
  gap: 1rem;
  font-size: .75rem;
  color: var(--color-text-muted);
  border-top: 1px solid var(--color-border);
  padding-top: .75rem;
}

/* News grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.news-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  transition: border-color .2s, transform .2s;
  display: flex;
  flex-direction: column;
}
.news-card:hover {
  border-color: rgba(212,148,35,.4);
  transform: translateY(-3px);
}

.news-image {
  height: 160px;
  background: #2a1e16;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.news-image img { width: 100%; height: 100%; object-fit: cover; }

.news-body {
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  flex: 1;
}
.news-title {
  font-size: 1rem;
  line-height: 1.3;
  color: var(--color-text);
}
.news-excerpt {
  font-size: .82rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  flex: 1;
}
.news-meta {
  display: flex;
  gap: 1rem;
  font-size: .72rem;
  color: var(--color-text-muted);
  border-top: 1px solid var(--color-border);
  padding-top: .6rem;
  margin-top: auto;
}

/* Placeholder */
.image-placeholder {
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-placeholder span {
  font-family: var(--font-display);
  font-size: 2rem;
  color: rgba(212,148,35,.15);
  letter-spacing: .1em;
}
.image-placeholder.small span { font-size: 1.3rem; }

.empty {
  color: var(--color-text-muted);
  text-align: center;
  padding: 3rem 0;
}

@media (max-width: 640px) {
  .featured-card { grid-template-columns: 1fr; }
  .featured-image { min-height: 180px; }
}
</style>