function confirmDelete(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Vas a eliminar este registro.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `/delete/${id}`; // Redirige a la ruta correcta
        }
    });
}