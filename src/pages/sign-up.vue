<script setup lang="ts">
const breadcrumbs = ref([
  { id: 1, name: "Головна", slug: "/" },
  { id: 2, name: "Реєстрація" },
])
</script>

<template>
  <main class="main">
    <section class="main__signup">
      <div class="container">
        <BaseBreadCrumbs :links="breadcrumbs" />

        <div class="signup">
          <div class="signup__wrapper">
            <div class="signup__benefits">
              <h2 class="signup__benefits-title">
                Отримуйте доступ до ексклюзивних функцій
              </h2>

              <ul class="signup__benefits-list">
                <li class="signup__benefits-item">
                  <BaseIconSvg
                      icon-name="download"
                      class="signup__benefits-icon"
                      width="1rem"
                      height="1rem"
                  />
                  Зберігайте улюблені зображення
                </li>

                <li class="signup__benefits-item">
                  <BaseIconSvg
                      icon-name="share"
                      class="signup__benefits-icon"
                      width="1rem"
                      height="1rem"
                  />
                  Завантажуйте і діліться з будь-ким і будь-де
                </li>

                <li class="signup__benefits-item">
                  <BaseIconSvg
                      icon-name="eye"
                      class="signup__benefits-icon"
                      width="1rem"
                      height="1rem"
                  />
                  Легко відстежуйте історію завантажень і створень
                </li>
              </ul>

              <span class="signup__benefits-more">І багато іншого.</span>
            </div>

            <div class="signup__form-block">
              <h1 class="signup__title">Створіть свій акаунт</h1>

              <div class="signup__social">
                <FormSignIn />
              </div>

              <div class="signup__terms">
                Створюючи акаунт, я приймаю
                <a href="/terms" target="_blank">Правила використання</a> та
                <a href="/privacy" target="_blank">Політику конфіденційності</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.favorites {
  min-height: 50vh;
}
</style>