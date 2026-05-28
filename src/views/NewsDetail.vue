<template>
  <div>
    <div v-if="article">

      <!-- Article header -->
      <div class="article-header">
        <div class="container">
          <RouterLink to="/news" class="back-link">← Back to News</RouterLink>
          <div class="article-meta">
            <span class="badge">{{ article.category }}</span>
            <span class="meta-date">{{ article.date }}</span>
            <span class="meta-author">{{ article.author }}</span>
          </div>
          <h1 class="article-title">{{ article.title }}</h1>
          <p class="article-excerpt">{{ article.excerpt }}</p>
        </div>
      </div>

      <!-- Cover image -->
      <div class="article-cover">
        <img v-if="article.image" :src="article.image" :alt="article.title" />
        <div v-else class="cover-placeholder">
          <span>BOYLOY FC</span>
        </div>
      </div>

      <!-- Body -->
      <div class="container">
        <div class="article-body">
          <p
            v-for="(para, i) in paragraphs"
            :key="i"
            class="article-para"
          >
            {{ para }}
          </p>
        </div>

        <!-- More articles -->
        <div class="more-section">
          <h2 class="more-title">More <span>News</span></h2>
          <div class="more-grid">
            <RouterLink
              v-for="item in moreArticles"
              :key="item.id"
              :to="`/news/${item.id}`"
              class="more-card"
            >
              <span class="badge">{{ item.category }}</span>
              <p class="more-card-title">{{ item.title }}</p>
              <span class="more-date">{{ item.date }}</span>
            </RouterLink>
          </div>
        </div>
      </div>

    </div>

    <!-- 404 -->
    <div v-else class="container section not-found">
      <h2>Article not found</h2>
      <RouterLink to="/news" class="btn btn-outline" style="margin-top:1rem">
        Back to News
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { news } from '@/data/news.js'

const route   = useRoute()
const article = computed(() => news.find(n => n.id === Number(route.params.id)))

const paragraphs = computed(() =>
  article.value?.body.split('\n\n').filter(p => p.trim()) ?? []
)

const moreArticles = computed(() =>
  news.filter(n => n.id !== article.value?.id).slice(0, 3)
)
</script>

<style scoped>
/* Header */
.article-header {
  background: var(--color-bg-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 2.5rem 0;
}
.back-link {
  font-size: .8rem;
  color: var(--color-text-muted);
  transition: color .15s;
  display: inline-block;
  margin-bottom: 1.25rem;
}
.back-link:hover { color: var(--color-secondary); }

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.meta-date, .meta-author {
  font-size: .78rem;
  color: var(--color-text-muted);
}

.article-title {
  font-size: clamp(1.8rem, 5vw, 3rem);
  line-height: 1.1;
  margin-bottom: .75rem;
}
.article-excerpt {
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 640px;
}

/* Cover */
.article-cover {
  width: 100%;
  height: 340px;
  background: #1a1410;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-border);
}
.article-cover img { width: 100%; height: 100%; object-fit: cover; }
.cover-placeholder span {
  font-family: var(--font-display);
  font-size: 3rem;
  color: rgba(212,148,35,.1);
  letter-spacing: .2em;
}

/* Body */
.article-body {
  max-width: 680px;
  margin: 3rem auto;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--color-border);
}
.article-para {
  font-size: .98rem;
  line-height: 1.85;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

/* More articles */
.more-section { padding: 2.5rem 0 4rem; }
.more-title {
  font-size: 1.8rem;
  margin-bottom: 1.25rem;
}
.more-title span { color: var(--color-secondary); }

.more-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
.more-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem 1.1rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  transition: border-color .15s, transform .15s;
}
.more-card:hover {
  border-color: rgba(212,148,35,.4);
  transform: translateY(-2px);
}
.more-card-title {
  font-family: var(--font-display);
  font-size: .95rem;
  color: var(--color-text);
  line-height: 1.2;
  letter-spacing: .03em;
  flex: 1;
}
.more-date { font-size: .72rem; color: var(--color-text-muted); }

.not-found {
  text-align: center;
  padding: 5rem 0;
  color: var(--color-text-muted);
}
</style>