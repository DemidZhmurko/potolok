<script setup lang="ts">
</script>

<template>
  <section id="contacts" class="pt-20 bg-gray-50">
    <div class="mx-auto px-4 container">
      <h2 class="text-4xl font-bold mb-12 text-center">
        Контакты
      </h2>

      <!-- Контактная информация и описание -->
      <div class="mb-20 gap-10 grid items-start md:grid-cols-2">
        <!-- Левая колонка -->
        <div class="text-xl space-y-8">
          <div>
            <p class="text-2xl font-semibold">
              📞 Телефон:
            </p>
            <a href="tel:+77074852328" class="text-2xl text-blue-600 font-medium hover:text-blue-700 hover:underline">
              +7 (707) 485-23-28
            </a>
          </div>
          <div>
            <p class="text-2xl font-semibold">
              💬 WhatsApp:
            </p>
            <a
              href="https://wa.me/77074852328"
              target="_blank"
              class="text-2xl text-gray-800 font-medium hover:text-blue-700 hover:underline"
            >
              Написать в WhatsApp
            </a>
          </div>
          <div>
            <p class="text-2xl font-semibold">
              📍 Адрес:
            </p>
            <p class="text-xl text-gray-800">
              Ул. Казыбаева 262
            </p>
          </div>
        </div>

        <!-- Правая колонка: описание компании -->
        <div class="p-6 border border-l-4 border-gray-200 border-l-blue-600 rounded-xl bg-white shadow-sm">
          <h3 class="text-2xl text-gray-900 font-bold mb-4">
            О компании TAUBETON
          </h3>
          <p class="text-lg text-gray-700 leading-relaxed">
            TAUBETON — это надёжный поставщик качественного бетона с современным подходом к строительству.
            Мы работаем как с частными клиентами, так и с крупными подрядчиками, предлагая проверенный материал,
            точные сроки и открытые условия сотрудничества.
          </p>
          <ul class="text-base text-gray-800 mt-4 pl-5 list-disc space-y-2">
            <li><span class="text-gray-800 font-medium">Точное соблюдение марки бетона</span></li>
            <li><span class="text-gray-800 font-medium">Доставка точно в срок</span></li>
            <li><span class="text-gray-800 font-medium">Честная цена без скрытых наценок</span></li>
            <li><span class="text-gray-800 font-medium">Прямой контакт с производством</span></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- ФУТЕР -->
    <footer class="py-6 border-t border-gray-200 bg-white">
      <div class="text-sm text-gray-600 mx-auto px-4 flex flex-col gap-4 items-center justify-between container sm:flex-row">
        <div class="text-center sm:text-left">
          © {{ new Date().getFullYear() }} «TAUBETON». Все права защищены.
        </div>
        <div class="text-center space-x-4 sm:text-right">
          <a href="#about" class="hover:text-blue-600">О нас</a>
          <a href="#assoritment" class="hover:text-blue-600">Ассортимент</a>
          <a href="#contacts" class="hover:text-blue-600">Контакты</a>
        </div>
      </div>
    </footer>
  </section>
</template>
