<template>
  <div class="page-header">
    <div class="container">
      <p class="page-label">From CADT GEN8 to the big stage!</p>
      <h1 class="page-title">About <span>US</span></h1>
    </div>
  </div>

  <div class="container section">
    <div class="about-content">
      <p>
        <span>Boyloy FT (CADT Boyloy FT)</span> is a student-led football team
        founded in 2022 at the CADT generation 8. Our mission is to connect
        students from every generation of CADT through friendly football
        matches, teamwork, and sportsmanship.
      </p>
      <p>
        We play with passion, commitment, and respect, while creating a
        welcoming environment for every team that wants to enjoy the game with
        us. Boyloy FT believes football is more than competition — it is about
        friendship, unity, and unforgettable memories on and off the field.
      </p>
      <div class="achievements">
        <h2>Our Achievements</h2>
        <ul>
          <li>
            2022 — Finished in 3rd place in the CADT CUP 2022 and won the
            <span>Bronze Medal</span>
          </li>
          <li>
            2023 — Became the Runner-up of the CADT CUP 2023 and won the
            <span>Silver Medal</span>
          </li>
        </ul>
      </div>
      <p>
        Beyond football, we are students passionate about digital technology,
        innovation, and building new ideas in both tech and sports. Boyloy FT
        represents the spirit of creativity, teamwork, and continuous
        improvement.
      </p>
      <h3>Contact Us</h3>
      <ul>
        <li>Email: boyloyft@example.com</li>
        <li>Phone: +855 12 345 678</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

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
.about-content {
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: justify;
}
.about-content span {
  font-weight: bold;
  color: var(--color-secondary);
}
.about-content h2 {
  margin-top: 2rem;
  color: var(--color-secondary);
}
.about-content ul {
  list-style-type: disc;
  margin-left: 2rem;
}
.about-content li {
  margin-bottom: 0.5rem;
}
.about-content h3 {
  margin-top: 2rem;
  color: var(--color-secondary);
}
</style>
