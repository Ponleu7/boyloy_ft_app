<template>
  <div class="page-header">
    <div class="container">
      <p class="page-label">support our local products.</p>
      <h1 class="page-title">BOYLOY <span>Store</span></h1>
    </div>
  </div>

<div class="container section">
     <div class="store-grid">
    <div v-for="item in filtered" :key="item.id" class="store-card">
      <img
        :src="item.image"
        :alt="item.productName"
        class="store-card__image"
      />

      <div class="store-card-content">
        <h3>{{ item.productName }}</h3>

        <p>{{ item.description }}</p>

        <div class="price-discount">
          <p class="price">${{ item.price }}</p>

          <p v-if="item.discountStatus === 'active'" class="discount">
            -{{ item.discountPercentage }}% OFF
          </p>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { store } from "@/data/stores.js";

const activeCategory = ref("All");
const filtered = computed(() => {
  if (activeCategory.value === "All") {
    return store;
  }
  return store.filter((item) => item.category === activeCategory.value);
});
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

.store-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.store-view h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.store-view p {
  color: #bdbdbd;
  line-height: 1.7;
}

/* GRID */
.store-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 5rem;
}

/* CARD */
.store-card {
  background: #161616;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  overflow: hidden;

  transition: all 0.3s ease;
  cursor: pointer;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
}

.store-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-primary);

  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
}

/* IMAGE */
.store-card__image {
  width: 100%;
  height: 500px;
  object-fit: cover;

  transition: transform 0.4s ease;
}

.store-card:hover .store-card__image {
  transform: scale(1.05);
}

/* CONTENT */
.store-card-content {
  padding: 1rem;
}

.store-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
}

.store-card p {
  color: #cfcfcf;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* PRICE */
.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff3b3b;
}

/* DISCOUNT */
.discount {
  display: inline-block;
  background: #ff3b3b;
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}
.price-discount {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
}
</style>
