function confirmUpdate(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Vas a Actualizar este registro.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, Actualizar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `/update/${id}`; // Redirige a la ruta correcta
        }
    });
}