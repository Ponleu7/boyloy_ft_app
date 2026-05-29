<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <img :src="logo" alt="BoyLoy Logo" class="footer__logo" />

          <p class="footer__tagline">Passion. Pride. Community.</p>
        </div>

        <div class="footer__col">
          <h4>Club</h4>
          <RouterLink to="/about">About us</RouterLink>
          <RouterLink to="/about">History</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </div>

        <div class="footer__col">
          <h4>Team</h4>
          <RouterLink to="/squad">Squad</RouterLink>
          <RouterLink to="/fixtures">Fixtures</RouterLink>
          <RouterLink to="/table">League table</RouterLink>
        </div>

        <div class="footer__col">
          <h4>Media</h4>
          <RouterLink to="/news">News</RouterLink>
          <RouterLink to="/gallery">Gallery</RouterLink>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ year }} <span>Boyloy FC</span>. All rights reserved.</p>
        <p>Built with ❤️ by <span>PL7</span></p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logo from "@/assets/boyloy_logo1.png";
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  padding: 3rem 0 1.5rem;
  margin-top: auto;
}
.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
}
.footer__logo {
  width: 74px;
  height: auto;
}
.footer__crest {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--color-secondary);
  margin-bottom: 0.75rem;
}
.footer__tagline {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}
.footer__col h4 {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--color-secondary);
  letter-spacing: 0.08em;
  margin-bottom: 0.8rem;
}
.footer__col a {
  display: block;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  margin-bottom: 0.4rem;
  transition: color 0.15s;
}
.footer__col a:hover {
  color: var(--color-text);
}
.footer__bottom {
  border-top: 1px solid rgba(212, 148, 35, 0.1);
  padding-top: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #4a3a34;
}
.footer__bottom span {
  color: var(--color-secondary);
}

@media (max-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }
  .footer__brand {
    grid-column: 1 / -1;
  }
}
@media (max-width: 480px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}
</style>
