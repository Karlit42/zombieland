document.addEventListener('DOMContentLoaded', function () {
    // Vérifier et appliquer l'onglet actif depuis localStorage
    const activeTabId = localStorage.getItem('activeTabId');
    if (activeTabId) {
      const activeTab = document.querySelector(`a[href="${activeTabId}"]`);
      if (activeTab) {
        new bootstrap.Tab(activeTab).show(); // Utiliser Bootstrap pour montrer l'onglet
      }
    }

    // Écouter les changements d'onglet pour mettre à jour localStorage
    document.querySelectorAll('.list-group-item-action').forEach(item => {
      item.addEventListener('click', function () {
        const href = this.getAttribute('href');
        localStorage.setItem('activeTabId', href);
      });
    });
  });