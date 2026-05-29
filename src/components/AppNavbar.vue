<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar__inner container">
      <RouterLink to="/" class="navbar__brand">
        <img :src="logo" alt="BoyLoy Logo" class="navbar__logo" />
      </RouterLink>

      <nav class="navbar__links" :class="{ open: menuOpen }">
        <RouterLink to="/" @click="close">Home</RouterLink>
        <RouterLink to="/fixtures" @click="close">Fixtures</RouterLink>
        <RouterLink to="/squad" @click="close">Squad</RouterLink>
        <RouterLink to="/news" @click="close">News</RouterLink>
        <RouterLink to="/table" @click="close">Table</RouterLink>
        <RouterLink to="/store" @click="close">Store</RouterLink>
        <RouterLink to="/about" @click="close">About</RouterLink>
      </nav>

      <button
        class="navbar__burger"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import logo from "@/assets/boyloy_logo1.png";

const menuOpen = ref(false);
const isScrolled = ref(false);

const close = () => {
  menuOpen.value = false;
};

const onScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  background: rgba(14, 11, 9, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: background 0.3s;
}
.navbar.scrolled {
  background: rgba(14, 11, 9, 0.98);
}
.navbar__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand */
.navbar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}
.navbar__logo {
  width: 80px;
  height: auto;
}
.navbar__crest {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--color-secondary);
  flex-shrink: 0;
}
.navbar__name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-text);
  letter-spacing: 0.06em;
}
.navbar__name em {
  font-style: normal;
  color: var(--color-secondary);
}

/* Links */
.navbar__links {
  display: flex;
  align-items: center;
  gap: 2px;
}
.navbar__links a {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-muted);
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-sm);
  transition: all 0.15s;
  letter-spacing: 0.03em;
}
.navbar__links a:hover {
  color: var(--color-text);
  background: rgba(212, 148, 35, 0.08);
}
.navbar__links a.router-link-active {
  color: var(--color-secondary);
}

/* Burger */
.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px;
}
.navbar__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all 0.25s;
}

/* Mobile */
@media (max-width: 768px) {
  .navbar__burger {
    display: flex;
  }
  .navbar__links {
    display: none;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    background: var(--color-bg-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 0.75rem 1rem;
    gap: 2px;
  }
  .navbar__links.open {
    display: flex;
  }
  .navbar__links a {
    padding: 0.65rem 1rem;
  }
}
</style>
