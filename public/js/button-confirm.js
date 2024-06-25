function confirmModif() {
    if (confirm("Êtes-vous sûr de vouloir modifier ce compte ?")) {
        document.querySelector('.form-user-general').submit();
    }
}

function confirmDelete() {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
        document.querySelector('.delete').submit();
    }
}