 function goBack() {
    // Сохраняем роль в localStorage (если она еще не сохранена)
    const userRole = 'admin'; // Здесь нужно получить роль пользователя из текущей сессии/переменной
    localStorage.setItem('userRole', userRole);

    // Возвращаемся на предыдущую страницу
    window.history.back();
  }

  // Загрузка роли из localStorage при перезагрузке страницы
  window.addEventListener('load', function() {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      console.log('Роль пользователя:', savedRole);
      // Здесь можно реализовать логику, которая зависит от роли пользователя
    }
  });
